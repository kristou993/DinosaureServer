var express = require('express');
var router = express.Router();
var Dinosaure = require('../models/dinosaure');
var session = '';

/**
 * Api Inscription 
 * @returns(object)
 */
router.post('/inscription', (req, res) => {
    let dinosaure = req.body;
    let d = new Dinosaure(dinosaure);
    d.save().then(us => {
        res.json(us);
      }).catch(err => {
        res.json(err);
      })
  });
/**
 * Api login 
 * @returns (object)
 */
router.post('/login', (req, res) => {
    var login = req.body.login;
    var password = req.body.password;
  
    Dinosaure.find({ login: login }).then(dinosaure => {
      if (dinosaure.length == 0) {
        res.status(500);
        res.send("Error");
      }
      else if (dinosaure[0].password != password)  { 
      res.status(500);
      res.send("Mot de passe incorrecte");
      }
      else {
        session = dinosaure;
        res.status(200);
        res.json(session);
        console.log(session);
      }
    }).catch(err => {
      res.status(500);
      res.send("Error");
    })
  })

  /**
   * Api déconnexion de la session
   */
  router.get('/deconnexion', function(req, res, next) {
    session = '';
    res.send("Déconnexion effectué");
    console.log(session);
});

/**
 * Api récupérations informations du dinosaure
 * @params (id) id du dinosaure connecté
 * @returns (object)
 */
router.get('/informations/:id', function (req, res, next) {
  let id = req.params.id
  Dinosaure.findOne({_id: id}, function (err, found) {
  if (err) {
    res.status(500);
    res.send("Error");
  }
  else {
    res.status(200);
    res.json(found);
  }
  })
})

/**
 * Api modification des informations du dinosaure
 *  @params (id) id du dinosaure connecté
 *  @returns (object)
 */
router.put('/modifier/:id',(req,res) =>
{
  let dinosaure = req.body;
  let id = req.params.id;
  Dinosaure.findOneAndUpdate({'_id': id}, dinosaure, {new: true}, function (err, result) {
    if (err) {
      res.send(err)
    }
    if (!result) {
      res.status(500).send()
    } else {
      res.send(result)
    }
  })
});
/**
 * Api qui permet l'ajout dans la liste des dinosaures
 * @params (id) id du dinosaure connecté
 * @returns (object)
 */
router.post('/ajout/:id', (req, res) => {
  let dinosauretoadd = req.body;
  let id = req.body.id;
  Dinosaure.findOne({_id: id}, function (err, found) {
    if (err) {
      res.status(500);
      res.send("Error");
    }
    else {
      Dinosaure.findOne({_id: req.params.id}, function (err, found) {
        if (err) {
          res.status(500);
          res.send("Error");
        }
        else {
          let dinosaure = found;
          dinosaure.dinosaures.push(dinosauretoadd);
          Dinosaure.findOneAndUpdate({'_id': dinosaure.id}, dinosaure, {new: true}, function (err, result) {
            if (err) {
              res.send(err)
            }
            if (!result) {
              res.status(500).send()
            } else {
              res.send(result)
            }
          })
        }
        })
     
    }
    })
});

/**
 * Effacer un dinosaure de la liste des dinosaures
 * @params (id) dinosaure connecté
 * @params (idtodelete) dinosaure à effacer de la liste
 * @returns (object)
 */
router.delete('/effacer/:id/:idtodelete',(req,res) => {
var currentid = req.params.id;
var idtodelete = req.params.idtodelete;
Dinosaure.findOne({_id: currentid}, function (err, found) {
  if (err) {
    res.status(500);
    res.send("Error");
  }
  else {
    let dinosaure = found;
   for (let i = 0 ; i<dinosaure.dinosaures.length; i++)
   {
     if ( dinosaure.dinosaures[i].id === idtodelete )
     {
      dinosaure.dinosaures.splice(i,1);
     }
   }
   Dinosaure.findOneAndUpdate({'_id': currentid}, dinosaure, {new: true}, function (err, result) {
      res.send(result)
  })
  }
  })
})

module.exports = router;