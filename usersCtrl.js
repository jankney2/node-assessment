const userData= require('./userData.json')

module.exports={
getUser: (req, res)=>{

switch(req.query)

res.status(200).send(userData)
},


}