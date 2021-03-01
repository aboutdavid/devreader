const { app, BrowserWindow } = require("electron");

function createWindow() {
  require(__dirname + "/spawn.js");
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    autoHideMenuBar: true,
    icon: __dirname + "/public/favicon.ico",
  });
  win.loadURL("http://localhost:7871/");
  win.focus();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
