const express= require('express')
const app=express()
const PORT=3000
const usersCtrl=require('./usersCtrl')

app.listen(PORT,()=>{
console.log('app is running on ', PORT )
})
app.use(express.json())

//ENDPOINTS


app.get('/api/user', usersCtrl.getUser)
app.get(`/api/user/:userId`, usersCtrl.getIndividual)
app.get(`/api/admin`, usersCtrl.getAdmins)
app.get(`/api/nonadmin`, usersCtrl.getNonAdmins)
app.get(`/api/type/:userType`, usersCtrl.getByType)


app.put(`/api/user/:userId`, usersCtrl.updateUser)