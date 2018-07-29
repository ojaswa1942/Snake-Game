const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const update = require('./controllers/update');
const neww = require('./controllers/new');

const db = knex({
  client: 'pg',
  connection: {
  	// connectionString: process.env.DATABASE_URL,
  	// ssl: true
    host : '127.0.0.1',
    user : 'ojaswa',
    password : 'ojaswa',
    database : 'ojaswa'
  }
});

const app=express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res)=>{ res.send('it is working')})

app.post('/new', (req, res) => {neww.newScore(req, res, db)});

app.put('/update', (req, res) => {update.updateScore(req, res, db)});


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
	console.log(`We are on on port ${port}!`);
})
