import request from 'supertest'
import app from '../app'
const asyncHandler = require('express-async-handler')
describe('Users API', () => {
    let uid = '6457bd30566403cb900df740'
    let username = "test"
    let firstname = "Suranga"

    // describe('POST /api/users', () => {
    //     it('should create a new user', async () => {
    //         const response = await request(app)
    //             .post('/api/users/')
    //             .field('username', 'JESTNew')
    //             .field('first_name', 'TestFirst')
    //             .field('last_name', 'TestLast')
    //             .field('mobile', '01123456789')
    //             .field('dob', '2000-01-01')
    //             .field('gender', 'Male')
    //             .field('password', 'abc123')
    //             .field('roles', 'Client')
    //         expect(response.status).toBe(201)
    //         expect(response.body).toHaveProperty('message', 'Complete all fields')
    //     }, 10000)
    // })
    describe('GET /api/users/', () => {
        it('should get all users', async () => {
            const response = await request(app).get('/api/users')
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Array)
        }, 10000)
    })
    describe('GET /api/users/:id', () => {
        it('should get a single user', async () => {
            const response = await request(app).get(`/api/users/${uid}`)
            expect(response.status).toBe(200)
            expect(response.body).toBeInstanceOf(Object)
        }, 10000)
    })
    describe('GET /api/search/username/:keyword', () => {
        it('should get a user by username', async () => {
            const response = await request(app).get(`/api/search/username/${username}`)
            expect(response.body).toBeInstanceOf(Object)
        }, 10000)
    })
    describe('GET /api/search/username/:keyword', () => {
        it('should get a user by username', async () => {
            const response = await request(app).get(`/api/search/username/${firstname}`)
            expect(response.body).toBeInstanceOf(Object)
        }, 10000)
    })
    describe('PATCH /api/users/', () => {
        it('should update a user', async () => {
            const response = await request(app).patch(`/api/users/`).send({
                id: "645560892a61376e0cc0b467",
                username: "ABCD",
                first_name: "ABC",
                last_name: "EFG",
                mobile: "0123456789",
                dob: "2000-01-01",
                gender: "Male",
                roles: "Client",
                active: true
            })
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty("message", "user updated")
        }, 10000)
    })
})