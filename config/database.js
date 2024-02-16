// const mongoose = require("mongoose");
// const db = () => {
//     mongoose.connect(process.env.MONGO_URL)
//     .then(() => { 
//         console.log("mongodb connected")
//     })
//     .catch(() => {
//         console.log("failed")
//     })
// }
// module.exports = db;

const fs = require('fs');
const path = require('path');

const userDataFile = path.join(__dirname, '..', 'data', 'users.json');

function readUsersFromFile() {
    try {
        const data = fs.readFileSync(userDataFile);
        return JSON.parse(data);
    } catch (error) {
        console.error('Kullanıcı verilerini dosyadan okuma hatası:', error);
        return [];
    }
}

function saveUsersToFile(users) {
    try {
        fs.writeFileSync(userDataFile, JSON.stringify(users, null, 2));
        console.log('Kullanıcı verileri başarıyla dosyaya yazıldı.');
    } catch (error) {
        console.error('Kullanıcı verilerini dosyaya yazma hatası:', error);
    }

}

module.exports = { readUsersFromFile, saveUsersToFile };