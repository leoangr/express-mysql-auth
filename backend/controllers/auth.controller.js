import { createUser, findUserByEmail, getUserByEmail, getUserById } from "../models/user.model.js";
import { generateCookie } from "../utils/generate.cookie.js";
import { getIpAddress } from "../utils/ipAddress.js";
import { validateEmail, validatePassword, validateUsername } from "../utils/validate.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const ipAddress = getIpAddress(req);
    try {

        if (!username.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({
                status: false,
                message: "Please fill in all required fields"
            });   
        }

        if (!validateUsername(username)) {
            return res.status(400).json({
                status: false,
                message: "Username may only contain letters and numbers"
            });   
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                status: false,
                message: "Please enter a valid email address"
            });
        }

        const userExist = await findUserByEmail(email);
        if (userExist.length > 0) { 
            return res.status(400).json({
                status: false,
                message: "This email address is already registered"
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                status: false,
                message: "Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await createUser(username, email, hashedPassword, ipAddress);

        res.status(201).json({
            status: true,
            message: "Account created successfully"
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: error.message || 'An internal server error'
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const token = req.cookies.auth_token;
        if (token) {
            return res.status(303).json({
                status: true,
                message: "You already login"
            });
        } 
        
        if (!email.trim() || !password.trim()) {
            return res.status(400).json({
                status: false,
                message: "Please fill in all required fields"
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                status: false,
                message: "Please enter a valid email address"
            });
        }

        const userData = await getUserByEmail(email);
        if (userData.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Email or Password is incorrect"
            });
        }

        const passwordCheck = await bcrypt.compare(password, userData[0].password,);
        if (!passwordCheck) {
            return res.status(400).json({
                status: false,
                message: "Email or Password is incorrect"
            });
        }

        await generateCookie(res, userData[0].id_user);

        res.status(200).json({
            status: true,
            message: "Account login successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            message: error.message || 'An internal server error'
        });
    }
}

export const logout = async (req, res) => {
    
    res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE,
        sameSite: process.env.COOKIE_SAMESITE,
        path: "/"
    });

    return res.status(200).json({
        status: true,
        message: "Logout successfully"
    });
}

export const user = async (req, res) => {
    const userId = req.userId;
    try {
        
        const userData = await getUserById(userId);
        if (userData.length === 0) {
            return res.status(400).json({
                status: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            status: true,
            message: "User found",
            data: userData
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({
            status: false,
            message: error.message || 'An internal server error'
        });
    }
}