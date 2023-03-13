const router = require("express").Router();
import Trainer from "../models/Trainer";
// if you call the add defining what happens 
//get input using post method 
router.route("/add").post((req,  res)=>{


    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const age = number(req.body.age);
    const gender = req.body.gender;

    //creating a new instance in the database using the given 
    const newTrainer = new Trainer({

    firstName,
    lastName,
    age,
    gender

    })
// if the update is sucessful
    newTrainer.save().then(()=>{

        res.json("Trainer Details added sucessfully")
//failed
    }).catch((err)=>{

        console.log(err);
    })
})

// retrieving data base from databse
router.route("/").get((req, res)=>{

Trainer.find().then(()=>{
        res.json(Trainer)

    }).catch(()=>{
        console.log(err)
    })

})

router.route("/")


module.exports = router;

