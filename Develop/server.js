const express = require('express');
const path = require('path');
const db = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/assets/js', (req, res) => {
    res.sendFile(path.join(__dirname, './public/assets/js/index.js'));
});
app.get('/assets/css/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, './public/assets/css/styles.css'));
});
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

app.post('/api/notes', (req, res) => {
    const dbInfo = newNote(req.body, db);
    req.body.id = db.length.toString();
    res.json(dbInfo);
});

function newNote(body, dbArray) {
    const notes = body;
    dbArray.push(notes)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(dbArray, null, 2)
    );
    return notes;
}