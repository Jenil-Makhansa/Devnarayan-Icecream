const express = require("express");
const auth= require("../middleware/auth")
const router = express.Router()
const User = require("../models/user")
const Cart = require("../models/cart")
// const Cart = require("../models/cart")
const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const ensureAuth = require("../middleware/auth");
app.use(express.json());
const port = process.env.PORT || 8080;

// Function Call for Reset password After OTP verification
const sentResetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'testtest963test@gmail.com',
                pass: 'mwceobauovhxjvzf'
            }
        });
        const mailOption = {
            from: 'testtest963test@gmail.com',
            to: email,
            subject: 'Forgot Password',
            html: '<p>Your One time Password is :' + token + '</p>'
        }
        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent");
            }
        });
    } catch (error) {
        console.log(error);
    }

}
router.post("/signup", async (req, res) => {
    try {
        console.log("Stage");
        const newUser = new User(req.body);
        const email = newUser.email;
        const us = await User.findOne({ email });
        if (us) {
            res.status(400).json({ message: "Email Already Exist" });
            return res;
        }
        const mobile_number = newUser.mobile_number;
        const u = await User.findOne({ mobile_number });
        if (u) {
            res.status(400).json({ message: "Mobile Number Already Exist" });
            return res;
        }
        const username = newUser.username;
        const userna = await User.findOne({ username });
        if (userna) {
            res.status(400).json({ message: "UserName Already Exist" });
            return res;
        }
        console.log(req.body);
        // return;
        const encryptedPassword = await bcrypt.hash(req.body.password, 10);
        console.log("Encrypted Password")
        newUser.password = encryptedPassword;
        const user = await newUser.save();
        // Create a cart for the newly registered user
        const newCart = new Cart({
            user: user._id,
            total: 0, // Initialize total as 0
        });
        const cart = await newCart.save();
        res.status(201).json({ user, cart });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: "Error in user registration" });
    }
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const isMatchedPassword = await bcrypt.compare(password, existingUser.password);
        if (!isMatchedPassword) {
            return res.status(400).json({ message: "Invalid Credential" });
        }
        const token = jwt.sign({ email: existingUser.email }, "KLklwerklLKJekrjwlkjSDA", { expiresIn: 86400*15 })
        res.status(201).json({ users: existingUser, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something Went Wrong" })
    }
})

router.post("/TESTAPI" , auth , async(req,res)=>{
    try {
        res.status(200).send({message:"Test Api"})
    } catch (error) {
        res.status(404).send({message:"Server Error"})
        
    }
})

router.post("/forgot-password", async (req, res) => {
    try {
        const email = req.body.email;
        // console.log(email);
        const isMatched = await User.findOne({ email: email });
        console.log(isMatched);
        if (isMatched) {
            var val = Math.floor(1000 + Math.random() * 9000);
            console.log(val);
            const Data = await User.updateOne({ email: email }, { $set: { token: 9876 } });
            // console.log(Data);

            sentResetPasswordMail('Data.username', email, val);
            res.status(200).send({ isMatched });
        }
        else {
            res.status(200).send({ message: "This email does not exist" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

router.post("/verifyOTP", async (req, res) => {
    try {
        const id = req.body.id;
        const otp = req.body.otp;
        const tokenData = await User.findOne({ token: otp });
        // console.log(tokenData);
        if (tokenData) {
            res.status(200).send(tokenData);
        }
        else {
            res.status(404).send("token not true");
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})
router.post("/change-password", async (req, res) => {
    try {
        const tokenData = req.body.id;
        const password = req.body.newpassword;
        console.log(tokenData);
        const newPassword = await bcrypt.hash(password, 10);
        const userData = await User.findByIdAndUpdate({ _id: tokenData }, { $set: { password: newPassword, token: '' } }, { new: true });
        res.status(200).send({ userData });
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})
router.get("/getAllUser", async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json({ message: "Users Fetched Succesfully", users: users });
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
})
module.exports = router