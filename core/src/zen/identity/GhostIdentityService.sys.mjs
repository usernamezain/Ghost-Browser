import { GhostIdentityGenerator } from "chrome://zen/content/identity/GhostIdentityGenerator.sys.mjs";

let gCurrentProfileId = "default-profile";
let gCurrentIdentity = null;

export const GhostIdentityService = {
  init(profileId) {
    if (profileId) {
      gCurrentProfileId = profileId;
    }
    gCurrentIdentity = GhostIdentityGenerator.generateForProfile(gCurrentProfileId);
    
    // Sync with native Gecko preferences (requires no C++ patching!)
    const { Services } = ChromeUtils.importESModule("resource://gre/modules/Services.sys.mjs");
    Services.prefs.setStringPref("general.useragent.override", gCurrentIdentity.userAgent);
    Services.prefs.setStringPref("general.platform.override", gCurrentIdentity.platform);
    Services.prefs.setStringPref("general.oscpu.override", gCurrentIdentity.oscpu);
    Services.prefs.setIntPref("dom.maxHardwareConcurrency", gCurrentIdentity.hardwareConcurrency);
    
    // WebGL overrides (Mullvad/Tor natively respect these if webgl.enable-webgl2 is true)
    Services.prefs.setStringPref("webgl.override-unmasked-vendor", gCurrentIdentity.webGLVendor);
    Services.prefs.setStringPref("webgl.override-unmasked-renderer", gCurrentIdentity.webGLRenderer);
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
