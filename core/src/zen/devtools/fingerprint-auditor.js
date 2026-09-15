const tests = [
  { name: "CreepJS", url: "https://abrahamjuliot.github.io/creepjs/" },
  { name: "BrowserScan", url: "https://browserscan.net/" },
  { name: "AmIUnique", url: "https://amiunique.org/" },
  { name: "EFF Cover Your Tracks", url: "https://coveryourtracks.eff.org/" },
  { name: "Fingerprint.com", url: "https://fingerprint.com/products/bot-detection/" }
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("button-container");

  tests.forEach(test => {
    const btn = document.createElement("button");
    btn.textContent = test.name;
    btn.title = `Run ${test.name} in a new isolated tab`;
    btn.addEventListener("click", () => {
      // In a real Gecko implementation, this could use gBrowser to open containerized/isolated tabs
      window.open(test.url, "_blank", "noopener,noreferrer");
    });
    container.appendChild(btn);
  });
});
