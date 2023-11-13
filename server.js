const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.HOST_NAME,
      port : 5432,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => { res.send('success') });

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageURL', (req, res) => {image.handleAPI(req, res)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}!`);
});