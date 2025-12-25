const path = require('path')
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const { engine } = require('express-handlebars')
const Product = require('./app/models/Product')
const app = express()
const port = 3000
const routes = require('./routes')
const db = require('./config/db')

db.connect()

app.engine('hbs', engine({
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b
  }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(trashCount)

routes(app)

function trashCount(req, res, next) {
  Product.countDocumentsDeleted({})
    .then(count => {
      res.locals.trashCount = count
      next()
    })
    .catch(next)
}

// app.use(morgan('combined'))
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})