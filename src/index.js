const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { readUsersFromFile, saveUsersToFile } = require('./config/database.js');
const User = require('./routes/user.js');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', User);
app.get('/', (req, res) => {
    res.json({message:" deneme"})
});


const PORT = process.env.PORT || 5000;
//db();


const users = readUsersFromFile();
console.log(users);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});