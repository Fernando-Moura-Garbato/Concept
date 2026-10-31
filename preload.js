const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('currentWindow', {
  close: () => ipcRenderer.invoke('currentWindow:close'),
  maximize: () => ipcRenderer.invoke('currentWindow:maximize'),
  minimize: () => ipcRenderer.invoke('currentWindow:minimize'),
})

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
})

contextBridge.exposeInMainWorld('list', {
  books: () => ipcRenderer.invoke('list:books'),
})