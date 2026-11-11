const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs'), path = require('path'), os = require('os');

const dir = () => app.getPath('userData');
const cfgFile = () => path.join(dir(), 'config.json');
const dataFile = () => path.join(dir(), 'data.json');
const readJSON = (f, d) => { try { return JSON.parse(fs.readFileSync(f)); } catch { return d; } };
let win;

app.whenReady().then(() => {
  const splash = new BrowserWindow({ width: 620, height: 360, frame: false, resizable: false, center: true, backgroundColor: '#12b0ff' });
  splash.loadFile('splash.html');
  win = new BrowserWindow({
    width: 1280, height: 860, show: false, title: 'Taccuino',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true }
  });
  win.loadFile('index.html');
  win.once('ready-to-show', () => setTimeout(() => { if (!splash.isDestroyed()) splash.close(); win.show(); }, 3000));
});
app.on('window-all-closed', () => app.quit());

// lingua: 0 = Italiano, 1 = English, 2 = Espanol
ipcMain.on('lang:sync', e => { e.returnValue = readJSON(cfgFile(), {}).lang || 0; });
ipcMain.handle('lang:set', (e, l) => {
  const c = readJSON(cfgFile(), {}); c.lang = l;
  fs.mkdirSync(dir(), { recursive: true });
  fs.writeFileSync(cfgFile(), JSON.stringify(c));
  win.reload();
});

// dati (quaderni e note)
ipcMain.handle('data:load', () => readJSON(dataFile(), null));
ipcMain.handle('data:save', (e, d) => {
  fs.mkdirSync(dir(), { recursive: true });
  fs.writeFileSync(dataFile() + '.tmp', JSON.stringify(d));
  fs.renameSync(dataFile() + '.tmp', dataFile());
});

// esportazione
const png = url => Buffer.from(url.split(',')[1], 'base64');
ipcMain.handle('export:png', async (e, { name, url }) => {
  const r = await dialog.showSaveDialog(win, { defaultPath: name + '.png', filters: [{ name: 'PNG', extensions: ['png'] }] });
  if (r.canceled) return false;
  fs.writeFileSync(r.filePath, png(url));
  return true;
});
ipcMain.handle('export:pdf', async (e, { name, urls }) => {
  const r = await dialog.showSaveDialog(win, { defaultPath: name + '.pdf', filters: [{ name: 'PDF', extensions: ['pdf'] }] });
  if (r.canceled) return false;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'taccuino-'));
  urls.forEach((u, i) => fs.writeFileSync(path.join(tmp, 'p' + i + '.png'), png(u)));
  fs.writeFileSync(path.join(tmp, 'p.html'),
    '<style>@page{size:A4;margin:0}body{margin:0}img{width:210mm;height:297mm;display:block;page-break-after:always}img:last-child{page-break-after:auto}</style>' +
    urls.map((u, i) => '<img src="p' + i + '.png">').join(''));
  const w = new BrowserWindow({ show: false });
  await w.loadFile(path.join(tmp, 'p.html'));
  const buf = await w.webContents.printToPDF({ pageSize: 'A4', printBackground: true, margins: { marginType: 'none' } });
  w.close();
  fs.writeFileSync(r.filePath, buf);
  fs.rmSync(tmp, { recursive: true, force: true });
  return true;
});

ipcMain.handle('export:file', async (e, { name, ext, text }) => {
  const r = await dialog.showSaveDialog(win, { defaultPath: name + '.' + ext, filters: [{ name: ext, extensions: [ext] }] });
  if (r.canceled) return false;
  fs.writeFileSync(r.filePath, text);
  return true;
});
