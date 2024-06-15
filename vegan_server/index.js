const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fileupload = require('express-fileupload');
const session = require('express-session');

const app = express();

app.use(fileupload())
app.use('/uploads', express.static('uploads'));
app.use(cors());

app.use(session({
  secret: 'cat',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 5000;

const adminRouter = require('./Admin/admin.router');
const UtilRouter = require('./Util/util.router')

db();

app.get('/', (req, res) => { res.send('Loaded'); });
app.use('/Admin', adminRouter);
app.use("/util",UtilRouter)

app.listen(port, () => { console.log('Server Is Running'); });
