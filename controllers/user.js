// //const User = require('../models/user.js');
const { readUsersFromFile, saveUsersToFile } = require('../config/database.js');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, usersurname, email, password } = req.body;
        const users = readUsersFromFile();

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Geçersiz e-mail adresi." });
        }

        if (users[email]) {
            return res.status(500).json({ message: "Bu email hesabı zaten kullanılmaktadır." });
        }

        if (password.length < 6) {
            return res.status(500).json({ message: "Parolanız 6 karakterden küçük olamaz." });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        users.push({ username, usersurname, email, password: passwordHash });
        saveUsersToFile(users);

        res.status(201).json({
            status: "OK",
            user: { username, usersurname, email, password},
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const users = readUsersFromFile();

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Geçersiz e-mail adresi." });
        }

        const user = users[email];
        if (!user) {
            return res.status(500).json({ message: "Böyle bir kullanıcı bulunmamaktadır." });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(500).json({ message: "Parolanız yanlış." });
        }

        const token = jwt.sign({ email }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

        res.status(200).json({
            status: "OK",
            user: { username: user.username, usersurname: user.usersurname, email },
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = { register, login };