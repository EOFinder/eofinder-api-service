const Admins = require('../models/admin');
const Events = require('../models/events');
const {createToken} = require('../helpers/jwt');
const bcrypt = require('bcrypt');
const e = require('express');


module.exports = {
    
   addAdmin : async (req, res) => {
       const {email, password, username, role, image} = req.body
       const roles = req.params.roles

       try {
        if(roles === "SUPERADMIN"){
            const registeredAdmin = await Admins.findOne({username});

            if(registeredAdmin){
                return res.status(400).json({
                    message: `admin dengan username ${username} telah terdaftar`
                })
            } else {
                bcrypt.hash(password, 10, (error, hashedPassword) => {
                    if(error){
                        res.send({
                            message: 'Invalid data input'
                        })
                    } else {
                        Admins.create({
                            email,
                            password: hashedPassword,
                            username,
                            role,
                            image
                        })
                        res.status(201).send({
                            message: 'Berhasil menambahkan admin'
                        })
                    }
                })
            }
            
        } else {
            res.status(403).json({
                message: "Unauthorized"
            })
        }
       }
       catch(error){
        console.log(error)
        res.status(500).json({
            message: 'Internal server error'
        })
       }
   },
   getAllAdmin : async (req, res) => {
       try {
        const admins = await Admins.find({}).select('-password')
        if(admins){
            res.status(200).json({
                message: 'get all admins',
                admins
            })
        } else {
            res.status(400).json({
                message: 'not found'
            })
        }
       }
       catch(error){
           console.log(error);
           res.status(500).json({
               message: error
           })
       }
     
   },
   getOneAdmin : async (req, res) => {
       try {
          const admin = await Admins.findById(req.params.id)
          
          res.status(200).json({
              message: 'get one admin',
              admin
          })
       }
       catch(error){
           console.log(error)
           res.status(500).json({
               message: error
           })
       }
   },
   updateAdmin : async (req, res) => {
       try {
            const admin = await Admins.findByIdAndUpdate({_id: req.params.id}, {...req.body});
            if(admin){
                res.status(200).json({
                    message: 'success edit admin',
                    admin
                }) 
            }else {
                res.status(400).json({
                    message: 'admin is not found'
                })    
            }
       }
       catch(error){
           console.log(error);
           res.status(500).json({
               message: error
           })
       }
   },
   pendingApproval : async (req, res) => {
       try {
        const pendingEvents = await Events.findOneAndUpdate({_id: req.params.id}, {...req.body})
        if(pendingEvents){
            res.status(200).json({
                message: 'accepted',
                pendingEvents
            })
        } else {
            res.status(400).json({
                message: 'error'
            })
        }
       }
       catch(error) {
           console.log(error)
           res.status(500).json({
               message: 'internal server error',
               error
           })
       }
   }
}