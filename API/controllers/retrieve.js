const retrieveScore = (req, res, db) => {
  db.select('*').from('score')
  .then(list => {
    if(list.length)
        res.json(list);
      else
        res.json('No entries');
    })
    .catch(err => res.status(400).json('Error '+err));
}

module.exports={
	retrieveScore
}