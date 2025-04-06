const { app, BrowserWindow } = require("electron")
const path = require("path")
const isDev = !app.isPackaged

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      contextIsolation: true,
    }
  })

  if (isDev) {
    win.loadURL("http://localhost:3000")
  } else {
    win.loadFile(path.join(__dirname, "out/index.html"))
  }
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
