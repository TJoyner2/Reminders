const app = require('express').Router();
const db = require('../db/db.json')

function makeId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


app.get('/notes', (req, res) => {
    res.json(db)
});


app.post('/notes', (req, res) => {
    const newNote = {...req.body, id: makeId()}
    db.push(newNote)
    res.json(newNote)
});

app.delete('/notes/:id', (req, res) => {
    const deleteIndex = db.findIndex(elem => elem.id === req.params.id)
    db.splice(deleteIndex, 1)
    res.json(deleteIndex)
});

module.exports = app
