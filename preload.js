const { contextBridge, ipcRenderer: i } = require('electron');
contextBridge.exposeInMainWorld('api', {
  lang: i.sendSync('lang:sync'),
  setLang: l => i.invoke('lang:set', l),
  load: () => i.invoke('data:load'),
  save: d => i.invoke('data:save', d),
  exportPng: o => i.invoke('export:png', o),
  exportPdf: o => i.invoke('export:pdf', o),
  exportFile: o => i.invoke('export:file', o)
});
