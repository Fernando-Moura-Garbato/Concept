const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const sqlite = require('sqlite3')

const path = require('node:path')

// Handles 
ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('list:books', () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite.Database('books.db', (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
      } else {
        db.all('SELECT * FROM books', (err, rows) => {
          if (err) {
            console.error('Error querying database:', err);
            reject(err);
          } else {
            resolve(rows);
          }
          db.close();
        });
      }
    });
  });
});

// Main function
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    } 
  })
  win.loadURL('http://localhost:4200');
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})