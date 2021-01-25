// Instantiation
const fs = require('fs')

// Output colors
const chalk = require('chalk')
let jenkinsColor = '#bd93f9'
let successColor = '#50fa7b'
let failureColor = '#ff5555'

// --- LIST NOTES ---
const listNotes = () => {
  console.log(chalk.hex(jenkinsColor)('Your notes, sir...'))
  const notesArr = loadNotes()
  notesArr.forEach(note => console.log(`+ ${note.title}`))
}

// --- ADD NOTE ---
const addNote = (title, body) => {
  // Load the list of notes from the database (notes file)
  const notesArr = loadNotes()
  const duplicateNote = notesArr.find(note => note.title === title)

  if(!duplicateNote) {
    // Push the new note object to the Notes Array
    notesArr.push( {
    title: title,
    body: body
    })

    // Use the saveNotes method to save the updated list to the DB (notes file)
    saveNotes(notesArr)

    // UI
    console.log(chalk.hex(successColor)(
    `
      ...............................
      + ${title}
      ...............................
      + + ${body}
    `))
    console.log(chalk.hex(successColor).inverse('SUCCESS'))
    console.log(chalk.hex(jenkinsColor)(`Adding your new note to your list, sir...`))
  } else {
    console.log(chalk.hex(failureColor).inverse('ERROR'))
    console.log(chalk.hex(jenkinsColor)('This note has already been added to your list, sir...'))
  }
}

// --- REMOVE NOTE ---
const removeNote = title => {
  // Get the notes from the DB (notes file)
  const notesArr = loadNotes()
  // Filter out all notes with titles that don't match the parameter
  const filteredNotes = notesArr.filter(note => note.title !== title)
  // Save the filtered array to the notes file
  saveNotes(filteredNotes)

  // UI
  if (filteredNotes.length === notesArr.length) {
    console.log(chalk.hex(failureColor).inverse('ERROR'))
    console.log(chalk.hex(jenkinsColor)('I\'m sorry, sir. I couldn\'t find a note with that title in your list...'))
  } else {
    console.log(chalk.hex(successColor).inverse('SUCCESS'))
    console.log(chalk.hex(jenkinsColor)('Removing the note from your list, sir...'))
  }
}

// --- LOAD NOTES ---
const loadNotes = () => {
  // If no errors
  try {
    // Pull the data from the DB (notes file)
    const dataBuffer = fs.readFileSync('notes.json')
    // Clean up the dirty data
    const dataJSON = dataBuffer.toString()
    // return the clean JSON data
    return JSON.parse(dataJSON)
  } catch(err) {
    // If an error is encountered (there is no notes file) return empty array
    return []
  }
}

// --- SAVE NOTES ---
const saveNotes = notesArr => {
  // create JSON data from the notes array
  const dataJSON = JSON.stringify(notesArr)
  // write the converted json data to the DB (ntoes file)
  fs.writeFileSync('notes.json', dataJSON)
}

// --- READ NOTES ---
const findNote = title => {
  const notesArr = loadNotes()
  const noteFound = notesArr.find(note => note.title === title)

  debugger
  
  if(noteFound) {
    console.log(chalk.hex(successColor).inverse('SUCCESS'))
    console.log(chalk.hex(jenkinsColor)('I found your note, sir...'))
    console.log(chalk.hex(successColor)(
      `
        ...............................
        + ${noteFound.title}
        ...............................
        + + ${noteFound.body}
      `))
  } else {
    console.log(chalk.hex(failureColor).inverse('ERROR'))
    console.log(chalk.hex(jenkinsColor)('I\'m sorry, sir. I couldn\'t find a note by that title in your list.'))
  }
}

// --- Exports ----
module.exports = {
  listNotes,
  loadNotes,
  findNote,
  addNote,
  removeNote
}