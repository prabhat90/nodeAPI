import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const createUser = async (req, res, next) => { 
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
    });
   try { 
        await newUser.save();
        res.status(200).json("User created successfully.");
    }
    catch (error) { 
        next(error);
    }
}

export const updateUser = async (req, res, next) => { 
try { 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) { 
       next(error);
    }
}

export const deleteUser = async (req, res, next) => { 
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted successfuly");
    }
    catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => { 
    try { 
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    } 
}

export const getUsers = async (req, res, next) => { 
      try { 
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
          next(error);
    }
}