const mongoose = require('mongoose')
const slugify = require('slugify')
const Schema = mongoose.Schema

const Product = new Schema({
    name: { type: String, default: '' },
    price: { type: Number, default: 0, min: 0 },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    slug: { type: String, unique: true },
}, { timestamps: true })

Product.pre('save', async function () {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, {
      lower: true,
      strict: true,
      locale: 'vi'
    })
  }
})

module.exports = mongoose.model('Product', Product)