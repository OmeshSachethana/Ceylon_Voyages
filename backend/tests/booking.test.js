import request from 'supertest'
import app from './setup'

describe('Booking API', () => {
  let bookingId

  describe('POST /api/bookings', () => {
    it('should create a new booking', async () => {
      const response = await request(app).post('/api/bookings').send({
        tourId: '645265c7fd71b842cd0d4a2f',
        name: 'John Doe',
        email: 'johndoe@example.com',
        date: '2023-05-08',
        budget: 1000
      })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message', 'Booking created successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('_id')

      // Store the booking ID for further tests
      bookingId = response.body.data._id
    }, 10000)
  })

  describe('GET /api/bookings', () => {
    it('should get all bookings', async () => {
      const response = await request(app).get('/api/bookings')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toBeInstanceOf(Array)
    })
  })

  describe('GET /api/bookings/:id', () => {
    it('should get a booking by ID', async () => {
      const response = await request(app).get(`/api/bookings/${bookingId}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('_id', bookingId)
    })

    it('should return 404 if booking not found', async () => {
      const nonExistingBookingId = '6455e63b9c5235517108539d'
      const response = await request(app).get(`/api/bookings/${nonExistingBookingId}`)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('message', 'Booking not found')
    })
  })

  describe('PATCH /api/bookings/:id', () => {
    it('should update the status of a booking', async () => {
      const response = await request(app).patch(`/api/bookings/${bookingId}`).send({ status: 'Completed' })

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message', 'Booking status updated successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('_id', bookingId)
      expect(response.body.data).toHaveProperty('status', 'Completed')
    })

    it('should return 404 if booking not found', async () => {
      const nonExistingBookingId = '6455e63b9c5235517108539d'
      const response = await request(app).patch(`/api/bookings/${nonExistingBookingId}`).send({ status: 'Completed' })

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('message', 'Booking not found')
    })
  })

  describe('DELETE /api/bookings/:id', () => {
    it('should delete a booking', async () => {
      const response = await request(app).delete(`/api/bookings/${bookingId}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Booking deleted successfully')
    })
  })
})
