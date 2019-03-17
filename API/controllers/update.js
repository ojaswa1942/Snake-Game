const updateScore = (req, res, db) => {
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
        res.json(0);
    })
    .catch(err => res.status(400).json('Error '+err));	
}

module.exports={
	updateScore
}