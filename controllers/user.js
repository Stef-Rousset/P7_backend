const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config();
const fs = require('fs');
const passwordValidator = require('password-validator');

var schema = new passwordValidator();
schema
.is().min(6)        // min 6 caractères
.is().max(30)       // max 30 caractères
.has().uppercase(1)  // au moins 1 maj
.has().lowercase(1)  // au moins 1 min
.has().digits(1)     // au moins 1 chiffre
.has().not().spaces() // pas d'espace

exports.signup = async(req, res) => {
    try {
        if (schema.validate(req.body.password) === true){
            const hash = await bcrypt.hash(req.body.password, 10) //hashage du password
            const user = await models.User.create({         //crée et save ds db
                                              firstName: req.body.firstName,
                                              lastName: req.body.lastName,
                                              email: req.body.email,
                                              password: hash,
                                              imageUrl: `${req.protocol}://${req.get('host')}/images/defaultAvatar.jpg`
                                            })
            const token = "Bearer " + jwt.sign( { userId: user.id }, process.env.TOKENSECRET, { expiresIn: '24h' } )
            return res.status(201).json({user: user, token: token, message: `${user.firstName} ${user.lastName} created` })
        } else {
            res.status(400).json({ error: 'Invalid password'});
        }
    } catch(error){
        return res.status(500).json({ error: error.message });
    }
}
exports.login = async (req, res) => {
    try {
        const user = await models.User.findOne({ where: { email : req.body.email } }) //retrouver le user par son email

        if(!user){ //si user pas trouvé
          return res.status(401).json({ error: 'User not found'});
        }
        const valid = await bcrypt.compare(req.body.password, user.password) //compare le password entré par l'user avec celui en db
        if (!valid){  //password invalide
            return res.status(401).json({ error: 'Incorrect password'});
        }
        res.status(200).json({  //password valide
              user: user,           // on renvoit user
              token: jwt.sign(      // encodage du token
                  { userId: user.id },
                  process.env.TOKENSECRET,
                  { expiresIn: '24h' },
                  )
        })
    } catch(error){
        return res.status(500).json({ error: error.message });
    }
};
exports.getProfile = async (req, res) => {
  try {
      const user = await models.User.findOne({ where: { id : req.params.id } })
      return res.status(200).json({ user: user})
  } catch(error){
      return res.status(400).json({error: error.message})
  }
}
exports.updateProfile = async (req, res) => {
  const userObject = req.body.user
  //si maj du password, il faut hacher le nouveau password
  if (userObject.password){
          const hash = await bcrypt.hash(userObject.password, 10) //hashage du password
          userObject.password = hash
  }
  const user = await models.User.findOne({ where: { id : req.params.id } })
  const oldImgFileName = user.imageUrl.split('/images/')[1]

  try {
      // si l'img du user av update est l'img par défaut
      // on met à jour le user avec le new file et on ne supprime pas l'img par défaut
      if (req.file && oldImgFileName === 'defaultAvatar.jpg'){
          await user.update({
                              ...userObject,
                              imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                            })
      // si l'img du user av update n'est pas l'img par défaut
      // on met à jour le user avec le file et on détruit l'ancienne image
      } else if (req.file && oldImgFileName !== 'defaultAvatar.jpg'){
          fs.unlink(`images/${oldImgFileName}`, async () => {
              await user.update({
                                  ...userObject,
                                  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                                })
          })
      } else {
          await user.update({
                              ...userObject
                            })
      }
      return res.status(200).json({user: user, message: `${user.firstName} ${user.lastName} updated`})
  } catch(error){
      return res.status(500).json({ error: error.message })
  }
}
exports.deleteProfile = async (req, res) => {
    const user = await models.User.findOne({ where: { id : req.params.id } })
    const { firstName, lastName } = user
    const oldImgFileName = user.imageUrl.split('/images/')[1]
    try {
        if (user.imageUrl && oldImgFileName !== 'defaultAvatar.jpg'){
            const filename = user.imageUrl.split('/images')[1]
            fs.unlink(`images/${filename}`, async () => {
                await user.destroy()
            })
        } else {
            await user.destroy()
        }
        return res.status(200).json({message: `${firstName} ${lastName} deleted`})
    } catch(error){
        return res.status(500).json({ error: error.message })
    }
}

