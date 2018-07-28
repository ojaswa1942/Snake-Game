const express=require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

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

app.post('/new', (req, res) => {
  const {email, score} = req.body;
  if(!email || !score){
    return res.status(400).json('Incorrect Submission');
  }

  db.insert({
    email: email,
    score: score
  })
    .into('score')
    .then(data => {
      res.status(200).json("Entry success");
    })
    .catch(err => res.status(400).json('Something is wrong '+err));
})

app.put('/update', (req, res) =>{
  const {email, score} = req.body;
  if(!email || !score){
    return res.status(400).json('Incorrect Submission');
  }

  db('score')
    .where({email})
    .update({score})
    .returning('score')
    .then(score => {
      if(score)
        res.json(score);
      else
        res.json('No such entry');
    })
    .catch(err => res.status(400).json('Error '+err));
})


const port = process.env.PORT || 3000;
app.listen(port, ()=>{
	console.log(`We are on on port ${port}!`);
})
