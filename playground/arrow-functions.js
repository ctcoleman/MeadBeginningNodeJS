// const square = x => x * x

// const event = {
//   name: 'Birthday Party',
//   guestList: ['Andrew', 'Chris', 'Jen'],
//   printThis() {
//     console.log(typeof(this))
//     this.guestList.forEach(guest => console.log(this + '....' + guest))
//   }
// }

// event.printThis()

const tasks = {
  tasks: [{
    text: 'Grocery shopping',
    completed: true
  }, {
    text: 'Clean yard',
    completed: false
  }, {
    text: 'Film course',
    completed: false
  }],
  getTasksToDo() {
    const toDo = this.tasks.filter(task => task.completed === false)
    console.log('TASKS TO-DO')
    toDo.forEach(task => console.log(`+ ${task.text}`))
  }
}

console.log(tasks.getTasksToDo())