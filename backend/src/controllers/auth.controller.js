import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(400).json(['Ya existe un usuario con ese Email']);
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            username,
            email,
            password: passwordHash
        });

        await newUser.save();

        const token = await createAccessToken({ id: newUser._id });
        res.cookie('token', token);


        res.status(200).json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existUser = await userModel.findOne({ email })

        if (!existUser) {
            return res.status(400).json(['No existe un usuario con ese email']);
        }
        const isMatch = await bcrypt.compare(password, existUser.password);

        if (!isMatch) {
            return res.status(400).json(['Contraseña invalida'])
        }

        const token = await createAccessToken({ id: existUser._id });
        res.cookie('token', token);


        res.status(200).json({
            id: existUser._id,
            username: existUser.username,
            email: existUser.email
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    const user = await userModel.findById(req.user.id);

    if (!user) {
        return res.status(400).json(['Usuario no encontrado']);
    }

    return res.json({
        id: user._id,
        username: user.username,
        email: user.email
    })
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: 'No autorizado' })

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'No autorizado' })
        const userFound = await userModel.findById(user.id)

        if (!userFound) return res.status(401).json({ message: 'No autorizado' })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    })
}
