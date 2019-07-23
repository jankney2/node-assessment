const userData = require("./userData.json");
let counter=0
userData.forEach(el=>{
el.id=++counter
})

module.exports = {
  getUser: (req, res) => {
    console.log("hit");

    let { age, email, favorites: favs } = req.query;

    let foundUsers = [];

    if (favs) {
      for (let i = 0; i < userData.length; i++) {
        if (
          userData[i].favorites.find(el => {
            return el === favs;
          })
        )
          foundUsers.push(userData[i]);
      }

      res.status(200).send(foundUsers);
    }
    if (email) {
      let users = userData.filter(el => {
        return el.email === email;
      });

      res.status(200).send(users);
    }

    if (age) {
      let users = userData.filter(el => {
        return el.age < age;
      });

      res.status(200).send(users);
    } else {
      res.status(200).send(userData);
    }
  },
  getIndividual: (req, res) => {
    let { userId } = req.params;

    let user = userData.find(el => {
      return +el.id === +userId;
    });
    if (user) {
      res.status(200).send(user);
    }
    res.sendStatus(404);
  },

  getAdmins: (req, res) => {
    let admins = userData.filter(el => {
      return el.type === "admin";
    });
    res.status(200).send(admins);
  },
  getNonAdmins: (req, res) => {
    let nonAdmins = userData.filter(el => {
      return el.type !== "admin";
    });
    res.status(200).send(nonAdmins);
  },
  getByType: (req, res) => {
    let users = userData.filter(el => {
      return el.type === req.params.userType;
    });

    res.status(200).send(users);
  },
  updateUser: (req, res) => {
    let { userId } = req.params;

    let index = userData.findIndex(el => {
      return +el.id === +userId;
    });
    console.log(index, "index put");
    let newObj = { ...req.body, id: +userId };
    console.log(newObj);
    userData.splice(index, 1, newObj);
    res.status(200).send(userData);
  },

  addUser: (req, res) => {
   console.log(req.body, 'req.body')
   
    // let counter=1
    // userData.forEach(el=>{
    //     el.id=counter++

    // })
    
    let {
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    } = req.body;

    userData.push({
      "id": ++counter,
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    });

    res.status(200).send(userData);
  },

  deleteUser: (req, res) => {
    let index = userData.findIndex(el => {
      return +el.id === +req.params.userId;
    });

    console.log(userData[index], "first");
    userData.splice(index, 1);
    console.log(userData.length, "second");
    res.status(200).send(userData);
  }
};
