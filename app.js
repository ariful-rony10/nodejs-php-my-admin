const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySql
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'ariful',
  password: '8520',
  database: 'nodebeers'
})
// Routes
app.get('/', cors(), (req, res) => {
  // Connect with database
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    // query(sqlString, callback)
    connection.query('SELECT * FROM beers', (err, rows) => {
      connection.release() // return the connection
      if (!err) {
        res.send(rows)
      } else {
        console.log(err)
      }
    })
  })
})

// Get a beer by id
app.get('/:id', (req, res) => {
 // Connect with database
 pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);

  // query(sqlString, callback)
  connection.query('SELECT * FROM beers WHERE id = ?', [req.params.id], (err, rows) => {
    connection.release() // return the connection
    if (!err) {
      res.send(rows)
    } else {
      console.log(err)
    }
  })
})
})

// Delete a beer by id
app.delete('/:id', (req, res) => {
  // Connect with database
  pool.getConnection((err, connection) => {
   if (err) throw err;
   console.log(`connected as id ${connection.threadId}`);
 
   // query(sqlString, callback)
   connection.query('DELETE FROM beers WHERE id = ?', [req.params.id], (err, rows) => {
     connection.release() // return the connection
     if (!err) {
       res.send(`Beer id ${[req.params.id]} deleted!`)
     } else {
       console.log(err)
     }
   })
 })
 })



// Add a new beer incomplete
app.delete('/', (req, res) => {
  // Connect with database
  pool.getConnection((err, connection) => {
   if (err) throw err;
   console.log(`connected as id ${connection.threadId}`);
 
   // query(sqlString, callback)
   connection.query('DELETE FROM beers WHERE id = ?', [req.params.id], (err, rows) => {
     connection.release() // return the connection
     if (!err) {
       res.send(`Beer id ${[req.params.id]} deleted!`)
     } else {
       console.log(err)
     }
   })
 })
 })




// Listening port
app.listen(port, () => console.log(`Listening on port: ${port}`))