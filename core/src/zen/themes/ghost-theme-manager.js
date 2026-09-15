/**
 * Ghost Browser - Theme Manager
 * Placeholder for local theme marketplace reading from userchrome/
 */

const GhostThemeManager = {
  getAvailableThemes() {
    return [
      { id: 'ghost-monochrome-dark', name: 'Monochrome Dark', type: 'userChrome' },
      { id: 'ghost-monochrome-light', name: 'Monochrome Light', type: 'userChrome' }
    ];
  },

  applyTheme(themeId) {
    console.log(`Applying theme: ${themeId}`);
    // Future implementation: load specific userChrome modifications
    return true;
  }
};

export default GhostThemeManager;
