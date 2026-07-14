const db = require('../../DB/mysql');

const TABLA = 'usuario'

function todos(){
    return db.todos(TABLA)
}

module.exports = {
    todos,
}