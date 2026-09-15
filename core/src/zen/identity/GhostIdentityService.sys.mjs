import { GhostIdentityGenerator } from "chrome://zen/content/identity/GhostIdentityGenerator.sys.mjs";

let gCurrentProfileId = "default-profile";
let gCurrentIdentity = null;

export const GhostIdentityService = {
  init(profileId) {
    if (profileId) {
      gCurrentProfileId = profileId;
    }
    gCurrentIdentity = GhostIdentityGenerator.generateForProfile(gCurrentProfileId);
    
    // Sync with prefs for C++ Engine Hooks
    const { Services } = ChromeUtils.importESModule("resource://gre/modules/Services.sys.mjs");
    Services.prefs.setStringPref("ghost.identity.userAgent", gCurrentIdentity.userAgent);
    Services.prefs.setStringPref("ghost.identity.platform", gCurrentIdentity.platform);
    Services.prefs.setStringPref("ghost.identity.oscpu", gCurrentIdentity.oscpu);
    Services.prefs.setIntPref("ghost.identity.hardwareConcurrency", gCurrentIdentity.hardwareConcurrency);
    Services.prefs.setStringPref("ghost.identity.webGLVendor", gCurrentIdentity.webGLVendor);
    Services.prefs.setStringPref("ghost.identity.webGLRenderer", gCurrentIdentity.webGLRenderer);
  },

  getIdentity() {
    if (!gCurrentIdentity) {
      this.init(gCurrentProfileId);
    }
    return gCurrentIdentity;
  },

  setProfile(profileId) {
    this.init(profileId);
  }
};
