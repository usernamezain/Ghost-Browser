export const GhostIdentityGenerator = {
  // Simple deterministic PRNG based on a seed string
  _hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  },

  _mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
  },

  generateForProfile(profileId) {
    const seed = this._hashString(profileId);
    const rand = this._mulberry32(seed);

    const userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.5; rv:130.0) Gecko/20100101 Firefox/130.0",
      "Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0"
    ];
    const platforms = ["Win32", "MacIntel", "Linux x86_64"];
    const oscpus = ["Windows NT 10.0; Win64; x64", "Intel Mac OS X 14.5", "Linux x86_64"];
    const hardwareConcurrencies = [4, 8, 12, 16];
    const resolutions = [
      { w: 1920, h: 1080 },
      { w: 2560, h: 1440 },
      { w: 1440, h: 900 },
      { w: 3840, h: 2160 }
    ];
    const webGLVendors = ["Google Inc. (NVIDIA)", "Google Inc. (AMD)", "Google Inc. (Intel)"];
    const webGLRenderers = [
      "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)",
      "ANGLE (AMD, AMD Radeon RX 6700 XT Direct3D11 vs_5_0 ps_5_0, D3D11)",
      "ANGLE (Intel, Intel(R) Iris(R) Xe Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)"
    ];

    const pick = (arr) => arr[Math.floor(rand() * arr.length)];
    
    // Pick platform index to match UA, platform, and oscpu together
    const platformIndex = Math.floor(rand() * platforms.length);
    const resolution = pick(resolutions);

    return {
      userAgent: userAgents[platformIndex],
      platform: platforms[platformIndex],
      oscpu: oscpus[platformIndex],
      hardwareConcurrency: pick(hardwareConcurrencies),
      screenResolution: resolution,
      webGLVendor: pick(webGLVendors),
      webGLRenderer: pick(webGLRenderers)
    };
  }
};
