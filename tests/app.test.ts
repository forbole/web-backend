import app from "../index" // Link to your server file
const supertest = require('supertest')
const request = supertest(app)