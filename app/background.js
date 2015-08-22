chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create('index.html', {
    id: "move",
    bounds: {
      width: 700,
      height: 307
    },
    minWidth: 700,
    minHeight: 307,
  });
});