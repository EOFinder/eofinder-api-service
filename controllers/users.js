const bcrypt = require("bcrypt")
const Users = require('../models/users');
const { createToken } = require("../helpers/jwt");

module.exports = {
    register: async (req, res) => {
        try {
            const {email, password} = req.body
            const checkEmail = await Users.findOne({email: email})
            if(checkEmail) {
                res.status(400).send({
                    message: 'Email Sudah terdaftar gunakan Akun yang lain',
                    status: 400,
                    checkEmail
                })
            } else {
                bcrypt.hash(password, 8, (error, hashedPassword) => {
                    if(error) {
                        res.send({
                            message: "Invalid data input"
                        })
                    } else {
                        Users.create({
                            email : email, 
                            password : hashedPassword, 
                        })
                        res.status(201).send({
                            message: "Register berhasil",
                            status: 200
                        })
                    }
                })
            }
        } 
        catch(error) {
            console.log(error);
            res.send({
                message: "Internal Server Error, Please try again",
                status: 500
            })
        }
    },

    login: async (req, res) => {
        try {
            const loginUser = await Users.findOne({email: req.body.email})
            if(loginUser){
                const comparePassword = await bcrypt.compare(req.body.password, loginUser.password)
                if(!comparePassword){
                    res.status(400).json({
                        message: 'Password salah'
                    })
                } else {
                    const tokenData = {
                        id: loginUser._id,
                        email: loginUser.email,
                        username: loginUser.username
                    }
                    const token = createToken(tokenData)
                    res.status(200).json({
                        message: `Selamat datang ${loginUser.email}`,
                        token
                    })
                }
            } else {
                res.status(400).json({
                    message: 'Email / Account tidak ditemukan'
                })
            }
        }
        catch(error) {
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },

    getAllUsers: async (req, res) => {
        try {
            let get = await Users.find()
            if(get) {
                res.send({
                    message: "Get all Data",
                    status: 200,
                    data: get
                })
            } else {
                res.send({
                    message: "Data masih kosong",
                    status: 200,
                    data: get
                })
            }
        }
        catch(error) {
            console.log(error);
            res.send({
                message: "Internal Server Error",
                status: 500,
            })
        }
        
    },

    getOneUser: async(req, res) => {
        try {
            const oneUser = await Users.findById(req.params.id);
            if(oneUser){
                res.status(200).json({
                    message: "Get One User",
                    oneUser
                })
            } else {
                res.status(400).json({
                    message: "Error Fetching Profile"
                })
            }
        }
        catch(error) {
            console.log(error)
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },

    updateUser: async(req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const userUpdate = await Users.findByIdAndUpdate({_id: req.params.id}, {email: req.body.email, password:hashedPassword})
            if(userUpdate){
                res.status(200).json({
                    message: "Profile Updated",
                    userUpdate
                })
            } else {
                res.status(400).json({
                    message: "Failed Updating Profile"
                })
            }
        }
        catch(error) {
            console.log(error);
            res.status(500).json({
                message: "Invalid Server Error"
            })
        }
    },

    deleteUser: async (req, res) => {
        try {
            const user = await Users.findOneAndDelete({_id: req.params.id})
            if(user){
                res.status(200).json({
                    message: `success delete User with ${req.params.id}`,
                })
            } else {
                res.status(400).json({
                    message: `failed delete User with ${req.params.id}`,
                })
            }
        }
        catch(error){
            res.status(500).json({
                message: `Internal server error`,
            })
        }
    },
}