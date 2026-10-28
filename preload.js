const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
})

contextBridge.exposeInMainWorld('list', {
  books: () => ipcRenderer.invoke('list:books'),
})