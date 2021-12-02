const app = require('../app') // Link to your server file
const supertest = require('supertest')
const request = supertest(app)