const express= require('express')
const app=express()
const PORT=3000
const usersCtrl=require('./usersCtrl')

app.listen(PORT,()=>{
console.log('app is running on ', PORT )
})


//ENDPOINTS


app.get('/api/user', usersCtrl.getUser)