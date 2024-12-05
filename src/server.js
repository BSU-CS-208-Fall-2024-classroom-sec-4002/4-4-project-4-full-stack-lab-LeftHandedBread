import express from 'express'
import sql from 'sqlite3'

const sqlite3 = sql.verbose()

// Create an in memory table to use
const db = new sqlite3.Database(':memory:')

// This is just for testing you would not want to create the table every
// time you start up the app feel free to improve this code :)
db.run(`CREATE TABLE todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL)`)

const app = express()
app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'pug')
app.use(express.urlencoded({ extended: false }))

const local = { tasks: [] }
  db.each('SELECT id, task FROM todo', function (err, row) {
    if (err) {
      console.log(err)
    } else {
      local.tasks.push({ id: row.id, task: row.task })
    }
  }, function (err, numrows) {
    if (!err) {
      res.render('index', local)
    } else {
      console.log(err)
    }
  })


app.get('/', function (req, res) {
    //TODO You will need to do a SQL select here
    const local = { tasks: [] }
    db.each('SELECT id, task FROM todo', function (err, row) {
      if (err) {
        console.log(err)
      } else {
        local.tasks.push({ id: row.id, task: row.task })
      }
    }, function (err, numrows) {
      if (!err) {
        res.render('index', local)
      } else {
        console.log(err)
      }
    })
})

app.post('/', (req, res) => {
  const { task } = req.body;

  if (task) {
      db.run('INSERT INTO todo (task) VALUES (?)', [task]);
      res.send();
  }
});

app.post('/delete', (req, res) => {
  const { id } = req.body;

  if (id) {
      db.run('Delete FROM todo where id = (?)', [id]);
      res.send();
  }
});


// Start the web server
app.listen(3000, function () {
    console.log('Listening on port 3000...')
})
