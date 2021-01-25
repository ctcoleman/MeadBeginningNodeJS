// import module libraries from node package manager
import yargs from 'yargs'
import notes from './notes.mjs'

// Yargs stored version number
yargs().version('1.0.0')

// --- ADD COMMAND ----
yargs().command({
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
yargs().command({
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

// --- READ COMMAND ----
yargs().command({
  command: 'read',
  describe: 'Have Jenkins read your notes',
  handler() {
    console.log('Reading your notes, sir...')
  }
})

// --- LIST COMMAND ----
yargs().command({
  command: 'list',
  describe: 'Have Jenkins list your notes',
  handler() {
   console.log('Removing your note, sir...')
  }
})

yargs().parse()