import request from 'supertest'
import app from '../src/app.js'
import { NIL } from 'uuid'
describe('Reviews API', () => {
  let reviewId = '64542074bea8448659b9aed2'
  describe('POST /api/reviews', () => {
    it('should create a new review', async () => {
      const response = await request(app)
      .post('/api/reviews')
      .field('item', '5eb3d668b31de5d588f4292c')
      .field('tour', NIL)
      .field('user', 'JEST - admin')
      .field('user_id', 'JEST - admin')
      .field('date', '2023-05-06T07:43:19.427+00:00')
      .field('text', 'JEST - This is a review text')
      .field('rating', 5)
      .field('user_details', '64555247ac5bce39b91439b7')
      // expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message', 'Review created successfully')
      expect(response.body).toHaveProperty('data')
    }, 10000)
  })
  describe('GET /api/reviews', () => {
    it('should get all reviews', async () => {
      const response = await request(app).get('/api/reviews')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Reviews retrieved successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toBeInstanceOf(Array)
    })
  })
  describe('GET /api/reviews/:id', () => {
    it('should get a review', async () => {
      const response = await request(app).get(`/api/reviews/${reviewId}`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Review retrieved successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toBeInstanceOf(Object)
    })
  })
  describe('PATCH /api/reviews/:id', () => {
    it('should update a review', async () => {
      const response = await request(app).patch(`/api/reviews/${reviewId}`).send({
        item: '5eb3d668b31de5d588f4292c',
        user: 'admin',
        user_id: 'admin',
        text: 'JEST - Updated review text',
        rating: 3,
      })
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message', 'Review updated successfully')
      expect(response.body).toHaveProperty('data')
    })
  })
})
