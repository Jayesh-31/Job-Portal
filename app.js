import express from 'express';
import expressEjsLayouts from "express-ejs-layouts";
import session from 'express-session';
import path from 'path';
import JobController from './src/controllers/job.controller.js';
import uploadFile from './src/middlewares/uploads.middleware.js';
import validationRequest from './src/middlewares/validateRequest.middleware.js';
import auth from './src/middlewares/auth.middleware.js'

const app = express();
const port = 3001;
const jobController = new JobController();
// Serve static files from the "public" directory
app.use(express.static(path.resolve('public')));
app.use(express.urlencoded({"extended": true}));
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));
app.set('layout', 'layout');

// Handle Session
app.use(
    session({
        secret: 'Laptop@123',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    })
);

app.use(auth);

app.get('/', (req, res) => {
    res.redirect('/home');
})

app.get('/home', jobController.getHomePage);

app.get('/jobs', jobController.getJobList);

app.get('/jobs/:id', jobController.getJobLanding);

app.post('/apply/:id', uploadFile.single('resumeFile'), validationRequest, jobController.handleApply);

app.post('/register', uploadFile.none(), validationRequest, jobController.handleRegister);

app.get('/login', jobController.getLoginPage);

app.post('/login', uploadFile.none(), validationRequest, jobController.handleLogin);

app.get('/logout', jobController.handleLogout)

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})