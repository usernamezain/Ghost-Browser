const { Services } = ChromeUtils.importESModule("resource://gre/modules/Services.sys.mjs");

export const GhostNetworkObserver = {
  _listeners: new Set(),
  _initialized: false,

  init() {
    if (this._initialized) return;
    this._initialized = true;
    Services.obs.addObserver(this, "http-on-modify-request", false);
    Services.obs.addObserver(this, "http-on-examine-response", false);
  },

  uninit() {
    if (!this._initialized) return;
    Services.obs.removeObserver(this, "http-on-modify-request");
    Services.obs.removeObserver(this, "http-on-examine-response");
    this._initialized = false;
  },

  addListener(listener) {
    this._listeners.add(listener);
  },

  removeListener(listener) {
    this._listeners.delete(listener);
  },

  observe(aSubject, aTopic, aData) {
    if (aTopic === "http-on-modify-request") {
      const channel = aSubject.QueryInterface(Ci.nsIHttpChannel);
      const headers = [];
      channel.visitRequestHeaders({
        visitHeader(aHeader, aValue) {
          headers.push({ name: aHeader, value: aValue });
        }
      });
      this._notifyListeners("request", channel, headers);
    } else if (aTopic === "http-on-examine-response") {
      const channel = aSubject.QueryInterface(Ci.nsIHttpChannel);
      const headers = [];
      channel.visitResponseHeaders({
        visitHeader(aHeader, aValue) {
          headers.push({ name: aHeader, value: aValue });
        }
      });
      this._notifyListeners("response", channel, headers);
    }
  },

  _notifyListeners(type, channel, headers) {
    for (const listener of this._listeners) {
      try {
        if (typeof listener.onNetworkEvent === "function") {
          listener.onNetworkEvent(type, channel, headers);
        }
      } catch (e) {
        console.error("Error in GhostNetworkObserver listener:", e);
      }
    }
  }
};
