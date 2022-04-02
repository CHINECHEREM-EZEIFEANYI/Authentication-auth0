require('dotenv').config()
let express = require('express')
let app = express()
const rateLimit = require('express-rate-limit')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require("helmet")
const bodyParser = require('body-parser')
const {createProfile, readProfile, updateProfile,  deleteProfile, allProfile} = require('./controller/controller')
const { appRoutes}  = require('./auth0/authentication')
const limiter = rateLimit({
   max: 5,
   windowMs: 60 * 60 * 1000,
   message: "Too many request from this IP"
});
app.use(limiter)
app.use(cors())
app.use(morgan('tiny'))
app.use(helmet())
app.use(bodyParser.json());
app.use('/', appRoutes)
//app.use('/api/tasks', Routes)
app.post('/api/tasks', createProfile)
app.get('api/tasks/:id', readProfile)
app.patch('/api/tasks/:id', updateProfile)
app.post('/api/tasks/:id', deleteProfile)
app.get('/api/tasks', (req, res) => {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 0;
    const page = req.query.page ? parseInt(req.query.page) : 0;
  Profile.allProfile(pageSize, page).then(data => res.json(data))
})
morgan.token('http://localhost:3000', function(req, res) {
    return req.host;
});
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Our app is listening on port ${PORT}`)
})