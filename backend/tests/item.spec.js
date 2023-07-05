import request from 'supertest'
import app from '../src/app.js'
describe('Items API', () => {
  let itemId = '6453dffacacf637d5f989b57'
  describe('POST /api/items', () => {
    it('should create a new item', async () => {
      const response = await request(app)
      .post('/api/items')
      .field('itemName', 'JEST - New Item')
      .field('category', 'restaurant')
      .field('price', 'JEST - LKR 200')
      .field('description', 'JEST - This is a new item')
      .field('location', 'JEST - This is a location address')
      .field('cuisine', 'JEST - This is a cuisine')
      .field('img', '/testImage.jpg')
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message', 'Item created successfully')
      expect(response.body).toHaveProperty('data')
    }, 10000)
  })
  describe('GET /api/items', () => {
    it('should get all items', async () => {
      const response = await request(app).get('/api/items')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Items retrieved successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toBeInstanceOf(Array)
    })
  })
  describe('GET /api/items/:id', () => {
    it('should get an item', async () => {
      const response = await request(app).get(`/api/items/${itemId}`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Item retrieved successfully')
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toBeInstanceOf(Object)
    })
  })
  describe('PATCH /api/items/:id', () => {
    it('should update an item', async () => {
      const response = await request(app).patch(`/api/items/${itemId}`).send({
        itemName: 'JEST - Updated Item',
        cuisine: 'JEST - Updated Cuisine',
        description: 'JEST - Updated item description',
        price: 'JEST - Updated item price',
        img: '/updatedTestImage.jpg',
        location: 'JEST - Updated item map location'
      })
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message', 'Item updated successfully')
      expect(response.body).toHaveProperty('data')
    })
  })
})
