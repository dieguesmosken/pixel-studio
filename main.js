const { app, BrowserWindow } = require("electron")
const path = require("path")
const isDev = !app.isPackaged

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: path.join(__dirname, 'public/icons/icon.png'),
    webPreferences: {
      contextIsolation: true,
    }
  })

  if (isDev) {
    win.loadURL("http://localhost:3000")
  } else {
    win.loadFile(path.join(__dirname, "out/index.html"))
    mainWindow.loadFile('out/index.html') // ou o caminho correto para o build exportado

    

  }
}

app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})
