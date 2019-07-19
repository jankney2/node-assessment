const userData= require('./userData.json')

module.exports={
getUser: (req, res)=>{

if(!req.query){
    res.status(200).send(userData)
}

    let {age, email, favorites:favs}=req.query

let foundUsers= []

if(favs){

    for(let i=0;i<userData.length; i++){
        if(userData[i].favorites.find(el=>{
            return el===favs
        }))
        foundUsers.push(userData[i])
    }
    
    
    
    res.status(200).send(foundUsers)
}
if(email){

let users=userData.filter(el=>{
    return el.email===email
})
    
    
    res.status(200).send(users)
}

if(age){
let users= userData.filter(el=>{
    return el.age<age
})

res.status(200).send(users)
}




},
getIndividual: (req, res)=>{
    let {userId}=req.params

    let user=userData.find(el=>{
        return +el.id===+userId
    })
    if(user){

        res.status(200).send(user)
    }
    res.sendStatus(404)
}, 

getAdmins: (req, res)=> {
    let admins=userData.filter(el=>{
        return el.type==='admin'
    })
    res.status(200).send(admins)

}, 
getNonAdmins: (req, res)=> {
    let nonAdmins=userData.filter(el=>{
        return el.type!=='admin'
    })
    res.status(200).send(nonAdmins)
}, 
getByType: (req, res)=> {
    
    let users= userData.filter(el=>{
        return el.type===req.params.userType
    })

    res.status(200).send(users)
}, 
updateUser: (req, res)=> {
    let {userId}=req.params
    let index= userData.findIndex(el=>{
        return +el.id===+userId
    })

    let newObj={...req.body, id}

    userData.splice(index, 1, req.body)
res.status(200).send(userData)
}


}