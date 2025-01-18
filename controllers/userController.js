

const User = require("../models/userModel");

const redisClient = require("../config/redis");

//create a user

const createUser = async (req, res) => {
    try {
        const user = await User.create({
            name: 'alok',
            email:  'alok1@gmail.com',
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// get user 

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        // check in redis
        const cachedData = await redisClient.get('user');
        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        } else {

            // set in redis 
            const user = await User.findById(id);

            await redisClient.set(`user`, JSON.stringify(user));
            await redisClient.expire(`user`, 500000);
            return res.status(200).json(user);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


module.exports = { createUser, getUser };