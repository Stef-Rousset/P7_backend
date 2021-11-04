const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');
require('dotenv').config();
const fs = require('fs');

exports.signup = async(req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10) //hashage du password
        const user = await models.User.create({         //crée et save ds db
                                          firstName: req.body.firstName,
                                          lastName: req.body.lastName,
                                          email: req.body.email,
                                          password: hash,
                                          role: 'standard'
                                        })
        const token = "Bearer " + jwt.sign( { id: user.id }, process.env.TOKENSECRET, { expiresIn: '24h' } )
        return res.status(201).json({user: user, token: token, message: `${user.firstName} ${user.lastName} created` })
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
                  { id: user.id },
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
  const user = await models.User.findOne({ where: { id : req.params.id } })
  try {
      // si file ds la requete et user avec image
      // on met à jour le user avec le new file et on delete l'ancien file
      if (req.file && user.imageUrl){
          const filename = user.imageUrl.split('/images')[1]
          fs.unlink(`images/${filename}`, async () => {
              await user.update({
                                  ...userObject,
                                  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                                })
          })
      // si file ds la requete mais pas de file ds user
      // on met à jour le user avec le file
      } else if (req.file && !user.imageUrl) {
          await user.update({
                        ...userObject,
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                      })
      //si pas de file ds la requete, maj du user sans file
      } else {
          await user.update({ ...userObject})
      }
      return res.status(200).json({user: user, message: `${user.firstName} ${user.lastName} updated`})
  } catch(error){
      return res.status(500).json({ error: error.message })
  }
}
exports.deleteProfile = async (req, res) => {
    const user = await models.User.findOne({ where: { id : req.params.id } })
    const { firstName, lastName } = user
    try {
        if (user.imageUrl){
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
