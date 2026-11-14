const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const sqlite = require('sqlite3')
const path = require('node:path')


function dbGet(sql, params) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

function dbAll(sql, params) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

const db = new sqlite.Database('books.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
    reject(err);
  }
})



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
    //frame: false,
    webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    } 
    
  })
  //win.removeMenu()
  win.maximize()
  win.loadURL('http://localhost:4200');
  //win.setMenuBarVisibility(false)

  ipcMain.handle('currentWindow:close', () => {
    win.close();
    return new Promise((resolve, reject) =>{
      resolve(true)
    })
  })
    ipcMain.handle('currentWindow:maximize', () => {
    win.maximize();
    return new Promise((resolve, reject) =>{
      resolve(true)
    })
  })
    ipcMain.handle('currentWindow:minimize', () => {
    win.minimize();
    return new Promise((resolve, reject) =>{
      resolve(true)
    })
  })
}

  ipcMain.handle('list:root', async (event, bookId) => {
    const root = await dbGet(
    'SELECT root_category_id FROM books WHERE id = ?',
    [bookId]);

    const [categories, concepts] = await Promise.all([
        dbAll(
            'SELECT * FROM categories WHERE category_id = ?',
            [root.root_category_id]
        ),
        dbAll(
            'SELECT * FROM concepts WHERE category_id = ?',
            [root.root_category_id]
        )
    ]);
    return { categories, concepts };
  }
)
 


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