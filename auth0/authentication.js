const appRoutes  = require('express').Router()
const { auth, requiresAuth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: 'https://zefingee.us.auth0.com'
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
appRoutes.use(auth(config));
appRoutes.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
// req.isAuthenticated is provided from the auth router
appRoutes.get('/login', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
 //chydigigirls login password EjPBNj36uEjQixB!
appRoutes.get('/profile', requiresAuth(), (req, res) => {
    res.json(req.oidc.user);
});
module.exports = { appRoutes}
const rand = require('randomstring')
console.log(rand.generate(30))