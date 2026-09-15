import { GhostIdentityGenerator } from "chrome://zen/content/identity/GhostIdentityGenerator.sys.mjs";

let gCurrentProfileId = "default-profile";
let gCurrentIdentity = null;

export const GhostIdentityService = {
  init(profileId) {
    if (profileId) {
      gCurrentProfileId = profileId;
    }
    gCurrentIdentity = GhostIdentityGenerator.generateForProfile(gCurrentProfileId);
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
