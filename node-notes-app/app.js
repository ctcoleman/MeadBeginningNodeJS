// ipmort module libraries from node package manager
const yargs = require('yargs')
const notes = require('./notes.js')

// Output colors
const chalk = require('chalk')
let jenkinsColor = '#bd93f9'
let successColor = '#50fa7b'
let failureColor = '#ff5555'

// Yargs stored version number
yargs.version('1.0.0')

// --- ADD COMMAND ----
yargs.command({
  command: 'add',
  describe: 'Have Jenkins add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note content',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body)
  }
})

// --- REMOVE COMMAND ----
yargs.command({
  command: 'remove',
  describe: 'Have Jenkins remove an existing note',
  builder: {
    title: {
      describe: 'Note to be deleted',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.removeNote(argv.title)
  } 
})

// --- FIND COMMAND ----
yargs.command({
  command: 'find',
  describe: 'Have Jenkins find your note',
  builder: {
    title: {
      describe: 'Note to be found',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    notes.findNote(argv.title)
  }
})

// --- LIST COMMAND ----
yargs.command({
  command: 'list',
  describe: 'Have Jenkins list your notes',
  handler() {
    notes.listNotes()
  }
})

yargs.parse()
