import request from 'supertest'
const path = require('path')
const fs = require('mz/fs')
import app from './setup'

describe('Tours API', () => {
  let tourId

  describe('POST /api/tours', () => {
    const testImagePath = path.join(__dirname, 'testFiles/testImage.jpg')

    it('should create a new tour with an image', async () => {
      // Check if the test image file exists
      const imageExists = await fs.promises
        .access(testImagePath)
        .then(() => true)
        .catch(() => false)

      if (!imageExists) {
        throw new Error('Test image file does not exist')
      }

      const response = await request(app)
        .post('/api/tours')
        .set('Content-Type', 'application/json') // Set the content type header
        .field('tourName', 'New Tour')
        .field('tourType', 'adventure')
        .field('description', 'This is a new tour')
        .field('duration', 5)
        .attach('image', testImagePath)

      if (response.body.data) {
        tourId = response.body.data._id
      }

      expect(response.body).toHaveProperty('message', 'Tour created successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('imagePath')
      expect(response.status).toBe(201)
    })
  })

  describe('GET /api/tours', () => {
    it('should get all tours', async () => {
      const response = await request(app).get('/api/tours')

      expect(response.body).toHaveProperty('message', 'Tours retrieved successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toBeInstanceOf(Array)
      expect(response.status).toBe(200)
    })
  })

  describe('GET /api/tours/:id', () => {
    it('should get a tour', async () => {
      const response = await request(app).get(`/api/tours/${tourId}`)

      expect(response.body).toHaveProperty('message', 'Tour retrieved successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toBeInstanceOf(Object)
      expect(response.status).toBe(200)
    })
  })

  describe('PATCH /api/tours/:id', () => {
    it('should update a tour', async () => {
      const response = await request(app).patch(`/api/tours/${tourId}`).send({
        tourName: 'JEST - Updated Tour',
        tourType: 'Adventure',
        description: 'JEST - This is an updated tour',
        duration: 7
      })

      expect(response.body).toHaveProperty('message', 'Tour updated successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.status).toBe(201)
    })
  })

  describe('DELETE /api/tours/:id', () => {
    it('should delete a tour', async () => {
      const response = await request(app).delete(`/api/tours/${tourId}`)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message', 'Tour deleted successfully')
      expect(response.body).toHaveProperty('data')
    })
  })

  describe('GET /api/tours/search/:term', () => {
    it('should search tours by term', async () => {
      const searchTerm = 'adventure'
      const response = await request(app).get(`/api/tours/search/${searchTerm}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Tours retrieved successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toBeInstanceOf(Array)
    })
  })
})
