# Taccuino 2.0.0 - creare e aggiornare il .pkg (su Mac)

Dipende da Electron 32.3.3, electron-builder e pdfjs-dist 3.11.174 (per importare i PDF). Serve Node.js installato e `npm install` (con internet) la prima volta.

## Novità 2.0.0 (stesse funzioni dell'iPad 1.11.0)
- Primo avvio con tutorial a passi e **codice prodotto** (Personal / Business, codici monouso: lo stesso file `Taccuino-Codici-Prodotto.txt` dell'iPad; un codice già usato sull'iPad non vale sul Mac).
- Business: righello, timbri, note adesive e firme (fino a 10).
- Penna e gomma a pressione, secchiello per riempire le aree, copia di una parte di foto, animazioni.
- Ingranaggio → **Sincronizza con iPhone**: invia gli appunti all'app Taccuino Viewer.
- I tuoi appunti esistenti restano: installa il nuovo .pkg sopra al vecchio.

## Costruire il .pkg con GitHub (senza Terminale)
Carica **tutta questa cartella** (compresa `.github`) in un repository GitHub: parte "Build PKG Mac (non firmato)"; a fine build scarichi `Taccuino-Mac-pkg` da Actions → Artifacts.

## Costruzione pulita
1. Terminale nella cartella Taccuino: `rm -rf node_modules dist package-lock.json`
2. `npm install`
3. `npm start` per provare, poi `npm run build` -> `dist/Taccuino-2.0.0-arm64.pkg`
   (su Mac Intel il nome finisce con `x64`/`universal` a seconda della macchina)

## Lingua
- Alla fine dell'installazione compare la scelta Italiano / English / Español (`build/pkg-scripts/postinstall`).
- Si può cambiare anche in app: icona ingranaggio in alto a destra (lingua, modo scuro, colore del tema) (la finestra si ricarica).

## Dove sono i tuoi appunti
`~/Library/Application Support/Taccuino/data.json`

## Aggiornare
Modifica i file, aumenta "version" in package.json, ripeti `npm run build` e installa il nuovo .pkg sopra al vecchio. Gli appunti restano.

## Se macOS blocca l'installazione
Il pacchetto non è firmato (uso personale). Clic destro > Apri, oppure Impostazioni di Sistema > Privacy e sicurezza > "Apri comunque".

## Importare ed esportare (pagina principale)
- Pulsante **Importa** accanto a "Nuova": **Importa PDF** (ogni pagina del PDF diventa una pagina del taccuino, con lo sfondo del PDF, e ci puoi scrivere sopra) oppure **Importa file .fulnote**. Si può anche trascinare il file sulla finestra.
- Dentro una nota, il pulsante di esportazione ha: PDF (con le tue annotazioni sopra le pagine importate), PNG e **.fulnote**.
- `.fulnote` è il formato di Taccuino: un file di testo (JSON) con pagine, tratti e sfondi. Serve per fare copie di sicurezza o passare una nota a un altro Mac con Taccuino.
- Un PDF molto lungo (oltre ~100 pagine) rende il salvataggio più lento, perché le pagine sono salvate dentro l'app.

## Funzioni attuali
- Libreria a griglia con anteprime, cartelle, ricerca, modo scuro e colore del tema (ingranaggio).
- **Pagine infinite**: in fondo alla pagina compare un "+"; continuando a scorrere (o toccandolo) si crea una nuova pagina.
- **Penne**: sfera, stilografica, matita, pennarello, pennello. **Evidenziatori**: tondo, piatto, tratteggiato, ondulato. Tocca di nuovo lo strumento attivo per cambiare tipo.
- **Colori**: 5 colori rapidi fissi, tavolozza da 20 colori, ruota cromatica con luminosità e HEX. Ogni colore scelto compare in **"Colori recenti"** (menu del cerchio arcobaleno).
- **Seleziona** (lazo o tocco singolo): sposta, ridimensiona (quadratino in basso a destra), copia, taglia, incolla, duplica, cambia colore, elimina. Scorciatoie: ⌘C, ⌘X, ⌘V, ⌘D, Canc.
- **Tabelle**: il pulsante Tabella apre un menu (righe, colonne, stile, intestazione). Doppio clic su una cella, o strumento Testo, per scriverci.
- Forme, testo, immagini (ora spostabili e ridimensionabili con Seleziona), gomma, annulla/ripeti (⌘Z / ⇧⌘Z).
- **Gesti con le dita**: tocco con 2 dita = annulla, con 3 dita = ripeti. Di default un dito scorre la pagina e disegnano Apple Pencil e mouse; l'ingranaggio ha l'opzione "Disegna anche con le dita".
- Pagine bianche, a righe o a quadretti; esportazione in PDF (tutte le pagine) e PNG; salvataggio automatico.
- Importazione di PDF e file .fulnote dalla pagina principale; esportazione in .fulnote.
