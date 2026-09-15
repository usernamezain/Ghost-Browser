const { Services } = ChromeUtils.importESModule("resource://gre/modules/Services.sys.mjs");
import { GhostNetworkObserver } from "resource://zen/devtools/GhostNetworkObserver.sys.mjs";

export const GhostHARExporter = {
  _entries: new Map(), // channelId -> entry map to link requests and responses
  _recording: false,
  _pageStartTime: null,

  start() {
    if (this._recording) return;
    this._entries.clear();
    this._recording = true;
    this._pageStartTime = new Date().toISOString();
    GhostNetworkObserver.init(); // Ensure observer is initialized
    GhostNetworkObserver.addListener(this);
  },

  stop() {
    if (!this._recording) return;
    this._recording = false;
    GhostNetworkObserver.removeListener(this);
  },

  onNetworkEvent(type, channel, headers) {
    try {
      const channelId = channel.channelId;
      if (!channelId) return;

      if (type === "request") {
        const url = channel.URI.spec;
        const method = channel.requestMethod;
        const time = new Date().toISOString();

        this._entries.set(channelId, {
          startedDateTime: time,
          time: -1,
          request: {
            method: method,
            url: url,
            httpVersion: "HTTP/1.1", // Simplified
            cookies: [],
            headers: headers.map(h => ({ name: h.name, value: h.value })),
            queryString: [],
            headersSize: -1,
            bodySize: -1
          },
          response: null,
          cache: {},
          timings: {
            send: 0,
            wait: 0,
            receive: 0
          }
        });
      } else if (type === "response") {
        const entry = this._entries.get(channelId);
        if (entry) {
          entry.response = {
            status: channel.responseStatus,
            statusText: channel.responseStatusText,
            httpVersion: "HTTP/1.1",
            cookies: [],
            headers: headers.map(h => ({ name: h.name, value: h.value })),
            content: {
              size: -1,
              mimeType: channel.contentType || ""
            },
            redirectURL: "",
            headersSize: -1,
            bodySize: -1
          };
          // Approximate time elapsed
          entry.time = new Date().getTime() - new Date(entry.startedDateTime).getTime();
        }
      }
    } catch (e) {
      console.error("GhostHARExporter error processing network event:", e);
    }
  },

  exportHAR() {
    const har = {
      log: {
        version: "1.2",
        creator: {
          name: "Ghost Browser",
          version: "1.0"
        },
        pages: [
          {
            startedDateTime: this._pageStartTime || new Date().toISOString(),
            id: "page_1",
            title: "Ghost Browser Recording",
            pageTimings: {}
          }
        ],
        entries: Array.from(this._entries.values()).map(entry => {
          // If response never came or was blocked, fill with mock data to keep HAR valid
          if (!entry.response) {
            entry.response = {
              status: 0,
              statusText: "",
              httpVersion: "HTTP/1.1",
              cookies: [],
              headers: [],
              content: { size: 0, mimeType: "" },
              redirectURL: "",
              headersSize: -1,
              bodySize: -1
            };
          }
          entry.pageref = "page_1";
          return entry;
        })
      }
    };
    return JSON.stringify(har, null, 2);
  }
};
