import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['restaurant', 'hotel'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  cuisine: {
    type: String,
    required: false
  },
  imagePath: {
    type: String,
    required: true
  }
})

const Item = mongoose.model('Item', itemSchema)

export default Item
