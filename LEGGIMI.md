# Taccuino per iPad

Stessa app (stesso codice, stesse funzioni: penne, evidenziatori, tabelle, PDF, pagine infinite, Apple Pencil) adattata per iPad.
Due modi per installarla senza App Store.

## Modo 1 – Installazione immediata (consigliato, 1 minuto, niente Mac, niente store)
1. Metti la cartella `www/` su un qualsiasi hosting statico HTTPS gratuito (GitHub Pages, Netlify Drop, Cloudflare Pages).
   Esempio Netlify: vai su app.netlify.com/drop e trascina la cartella `www`.
2. Apri l'indirizzo con **Safari** sull'iPad → tasto Condividi → **Aggiungi a Home**.
3. Si apre a schermo intero come un'app, funziona offline, e gli appunti restano nel dispositivo (IndexedDB).
   Per importare i PDF la prima volta serve internet (scarica pdf.js e poi lo ricorda); in alternativa vedi `npm run prep` sotto.

Nessun certificato, nessuna scadenza, nessuna revoca.

## Modo 2 – File .ipa da installare con sideload
Serve un .ipa non firmato, costruito su macOS (non si può fare su Windows/Linux):
1. Crea un repository GitHub, carica tutto il contenuto di questa cartella.
2. Scheda **Actions → Build IPA → Run workflow**. Dopo ~5 minuti scarica l'artefatto `Taccuino-ipa` (Taccuino.ipa).
   (In alternativa, su un Mac con Xcode: `npm install && npm run prep && npx cap add ios && npx cap sync ios`, poi apri `ios/App` in Xcode.)
3. Installa il .ipa firmandolo con il tuo Apple ID tramite **AltStore**, **Sideloadly** o **TrollStore**
   (con Apple ID gratuito dura 7 giorni e va rifirmata; con TrollStore è permanente).

## Nota su AppValley
AppValley (e simili) è uno store di terze parti: non permette di caricare un proprio .ipa e funziona con certificati aziendali che Apple revoca
di continuo, quindi l'app smette di aprirsi senza preavviso (e rischi di perdere gli appunti). Per un'app personale i due modi sopra sono più sicuri e stabili.

## Backup
Dentro una nota: esporta in **.fulnote** (copia di sicurezza) e salvalo in File/iCloud. Importa con "Importa".
Se cancelli l'app dalla Home o i dati del sito da Safari, gli appunti si perdono: fai backup ogni tanto.

## Differenze rispetto alla versione Mac
- Salvataggio in IndexedDB invece di data.json; esportazioni tramite foglio di condivisione (Salva su File, AirDrop…).
- Il PDF esportato contiene le pagine come immagini (non testo selezionabile).
- Scorciatoie da tastiera ⌘ funzionano solo con tastiera collegata.

## Novità della versione 1.7.0
- **Animazioni** ovunque: libreria, taccuini, menu, finestre, barra strumenti, cestino e sblocco.
- **Foglio non più ruotabile**: con due dita resti in zoom e spostamento, il foglio rimane sempre dritto.
- **Tutorial e primo avvio a passi**: "Benvenuto in Taccuino", 3 schermate di tutorial (si possono saltare), poi nome, età, uso e blocco, **una domanda alla volta**.
- **Blocco app con Face ID / Touch ID**: lo scegli alla fine del primo avvio o dall'ingranaggio ("Blocco app"). Serve sempre anche un **codice a 4 cifre di riserva**. Se il tuo iPad o il modo in cui installi l'app non consente Face ID (succede con alcune installazioni .ipa), l'app usa solo il codice. Si riblocca dopo 30 secondi in background. Attenzione: se dimentichi il codice l'unico modo per rientrare è reinstallare l'app, e i dati si perdono.

## Novità della versione 1.6.0
- **Matita a pressione**: più premi con la Apple Pencil, più il tratto è scuro e grosso; leggero = sottile e chiaro. Con il dito o il mouse il tratto resta di spessore medio.
- **Gomma a pressione**: la gomma diventa più grande premendo di più (lo slider fissa la misura massima). Funziona a pixel o a tratto.
- **Modalità Apple Pencil** (icona scudo in alto, o ingranaggio): si disegna solo con la Pencil e il palmo viene ignorato (tocchi larghi, 4+ dita o appoggiati subito dopo la penna). Con "Disegna con le dita" attivo la modalità si disattiva.
- **Riempimento colore** (secchiello): tocca un'area chiusa da tratti o forme e viene riempita col colore scelto. Ritoccando la stessa area con un altro colore lo cambia. Se la forma ha un buco, il colore esce: chiudila o annulla. Il riempimento sta sotto i tratti, non considera lo sfondo dei PDF; la gomma a pixel non lo cancella (usa la gomma a tratto, la selezione o Annulla).
- Testato solo su browser simulato, non su iPad/Pencil reali: se il feeling della pressione non ti piace, dimmelo e lo regolo.

## Novità della versione 1.5.0
- **Gomma pixel**: cancella solo la parte toccata. La grandezza si regola con lo slider in basso nella barra a sinistra. Toccando di nuovo la gomma scegli tra pixel, a tratto e "Svuota pagina".
- **Blocco del foglio**: l'icona del lucchetto in alto blocca scorrimento, zoom e rotazione, così il foglio non si sposta mentre scrivi (e i tocchi accidentali non fanno annulla).
- **Penna più reattiva**: tratti disegnati subito e con tutti i punti anche scrivendo veloce, il palmo appoggiato viene ignorato. Rimossi i vari tipi di penna: ora c'è una penna e un evidenziatore.
- **Geometria**: 22 forme (linea, tratteggiata, frecce, misura in cm, quadrato, cerchio, triangoli, rombo, trapezio, pentagono, esagono, stella, croce, assi cartesiani, cubo, griglia...). Tocca lo strumento Forme per sceglierle.
- ~~Ruotare il foglio~~: rimosso nella 1.7.0 (restano zoom con due dita e spostamento).
- **Primo avvio**: chiede nome, età (minimo 10 anni) e per cosa usi Taccuino. In alto compare "Ciao, nome". Dall'ingranaggio puoi modificare il profilo. I dati restano solo sul tuo iPad.
- **Taccuini**: i tre pallini aprono Cestina, Rinomina, Sposta a… Puoi anche trascinare un taccuino su una cartella (tocco: tieni premuto un attimo, poi trascina).
- **Cestino** in basso a destra nella home: ripristina o elimina definitivamente i taccuini cestinati.
- Per aggiornare l'app già installata: ricarica i file sul tuo hosting (o rifai il .ipa) e riapri l'app due volte; gli appunti restano.
