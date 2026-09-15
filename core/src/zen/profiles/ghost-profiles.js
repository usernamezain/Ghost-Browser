"use strict";

class GhostProfileManager {
    constructor() {
        this.profileService = Cc["@mozilla.org/toolkit/profile-service;1"]
            .getService(Ci.nsIToolkitProfileService);
        this.init();
    }

    init() {
        this.renderProfiles();
        this.attachEventListeners();
    }

    getProfiles() {
        let profiles = [];
        let enumerator = this.profileService.profiles;
        while (enumerator.hasMoreElements()) {
            let profile = enumerator.getNext().QueryInterface(Ci.nsIToolkitProfile);
            profiles.push(profile);
        }
        return profiles;
    }

    renderProfiles() {
        const listContainer = document.getElementById("profile-list");
        listContainer.innerHTML = "";
        
        const profiles = this.getProfiles();
        
        profiles.forEach(profile => {
            const card = document.createElement("div");
            card.className = "profile-card";
            
            const icon = document.createElement("div");
            icon.className = "profile-icon";
            icon.textContent = profile.name.charAt(0).toUpperCase();
            
            const name = document.createElement("div");
            name.className = "profile-name";
            name.textContent = profile.name;
            
            card.appendChild(icon);
            card.appendChild(name);
            
            card.addEventListener("click", () => this.launchProfile(profile));
            
            listContainer.appendChild(card);
        });
    }

    createProfile(name, templateType) {
        try {
            const profileName = `${name} - ${templateType}`;
            let newProfile = this.profileService.createProfile(null, profileName);
            this.profileService.flush();
            this.renderProfiles();
            console.log(`Created new profile: ${profileName}`);
        } catch (e) {
            console.error("Error creating profile: ", e);
        }
    }

    launchProfile(profile) {
        console.log(`Launching profile: ${profile.name}`);
        // To be implemented: Window spawn hooking logic
    }

    attachEventListeners() {
        document.getElementById("btn-banking").addEventListener("click", () => {
            let name = prompt("Enter profile name for Banking:", "Banking");
            if (name) this.createProfile(name, "Banking");
        });
        
        document.getElementById("btn-research").addEventListener("click", () => {
            let name = prompt("Enter profile name for Research:", "Research");
            if (name) this.createProfile(name, "Research");
        });
        
        document.getElementById("btn-anonymous").addEventListener("click", () => {
            let name = prompt("Enter profile name for Anonymous:", "Anonymous");
            if (name) this.createProfile(name, "Anonymous");
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new GhostProfileManager();
});
