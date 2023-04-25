const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');


const getAllUsers = asyncHandler(async (req, res) => {
    const userList = await User.find().select('-passwordHash');

    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList);
})

const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash');

    if (!user) {
        res.status(500).json({ message: 'The user with the given ID was not found.' })
    }
    res.status(200).send(user);
})

const updateUser = asyncHandler(async (req, res) => {
    const userExist = await User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true }
    )

    if (!user)
        return res.status(400).send('the user cannot be created!')

    res.send(user);
})

const registerUser = asyncHandler(async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    let user = await User.create({
        name: req.body.name,
        email: req.body.email,
        passwordHash: await bcrypt.hash(req.body.password, salt),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
    })

    if (!user)
        return res.status(400).send('the user cannot be created!')

    res.json({
        "user": user,
        "token": generateToken(user._id)
    });
})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
        res.status(200).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(404);
        throw new Error("Invalid credentials");
    }
})

const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findByIdAndRemove(req.params.id)
    if (user) {
        return res.status(200).json({ success: true, message: 'the user is deleted!' })
    } else {
        return res.status(404).json({ success: false, message: "user not found!" })
    }
})

const getTotalUsers = asyncHandler(async (req, res) => {
    const userCount = await User.countDocuments();

    if (!userCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        userCount: userCount
    });
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}





module.exports = { registerUser, loginUser, getProfile, getAllUsers, updateUser, deleteUser, getTotalUsers };