/**
 * Ghost Browser - Theme Manager
 * Offline-First Local Theme Marketplace
 */

const GhostThemeManager = {
  /**
   * Mock API for scanning a local directory for offline theme manifests
   * e.g., chrome://zen/content/themes/
   */
  async scanLocalThemes() {
    console.log("Scanning local directory for offline themes...");
    // Mocking finding manifest.json and style.css in local directories
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'ghost-monochrome-dark', name: 'Monochrome Dark', type: 'userChrome', path: 'chrome://zen/content/themes/monochrome-dark/' },
          { id: 'ghost-monochrome-light', name: 'Monochrome Light', type: 'userChrome', path: 'chrome://zen/content/themes/monochrome-light/' },
          { id: 'ghost-matrix-green', name: 'Matrix Green', type: 'userChrome', path: 'chrome://zen/content/themes/matrix-green/' }
        ]);
      }, 500);
    });
  },

  getAvailableThemes() {
    return [
      { id: 'ghost-monochrome-dark', name: 'Monochrome Dark', type: 'userChrome' },
      { id: 'ghost-monochrome-light', name: 'Monochrome Light', type: 'userChrome' }
    ];
  },

  /**
   * Trigger a warning dialog if privacy.resistFingerprinting is true
   */
  checkRFPWarning() {
    try {
      // Mock Services.prefs for the purpose of the prototype
      const isRFPEnabled = typeof Services !== 'undefined' 
        ? Services.prefs.getBoolPref("privacy.resistFingerprinting", false)
        : true; // default to true in mock to demonstrate the warning

      if (isRFPEnabled) {
        // Trigger a warning dialog/prompt
        const proceed = confirm(
          "WARNING: You have 'privacy.resistFingerprinting' (RFP) enabled.\n" +
          "Applying a custom theme may introduce fingerprinting vectors by changing window dimensions and UI elements.\n" +
          "Do you want to proceed and apply the theme?"
        );
        return proceed;
      }
    } catch (e) {
      console.error("Failed to check RFP preference", e);
    }
    return true; // proceed if no RFP or error
  },

  async applyTheme(themeId) {
    console.log(`Attempting to apply theme: ${themeId}`);
    
    if (!this.checkRFPWarning()) {
      console.log(`Theme application aborted by user due to RFP warning: ${themeId}`);
      return false;
    }

    console.log(`Applying theme: ${themeId}`);
    // Future implementation: load specific userChrome modifications based on theme manifest
    
    // Dispatch an event so the UI can update via GSAP or other logic (rule: 1. DURABLE EXECUTION)
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('agent.action.started', { detail: { action: 'apply_theme', theme: themeId } }));
    }
    
    return true;
  }
};

export default GhostThemeManager;
