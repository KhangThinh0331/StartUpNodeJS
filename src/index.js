require('dotenv').config()
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
    sum: (a, b) => a + b,
    paginateRange: function (current, pages, limit, options) {
      current = Number(current);
      pages = Number(pages);
      limit = Number(limit);

      let half = Math.floor(limit / 2);
      let start = current - half;
      let end = current + half;

      if (start < 1) {
        start = 1;
        end = Math.min(limit, pages);
      }

      if (end > pages) {
        end = pages;
        start = Math.max(1, pages - limit + 1);
      }

      let html = '';
      for (let i = start; i <= end; i++) {
        html += options.fn({
          page: i,
          active: i === current
        });
      }
      return html;
    },
    eq: (a, b) => a === b,
    minus: (a, b) => a - b,
    gt: (a, b) => Number(a) > Number(b),
    lt: (a, b) => Number(a) < Number(b),
  }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(trashCount)
app.use((req, res, next) => {
    res.locals.year = new Date().getFullYear();
    next();
});

routes(app)

function trashCount(req, res, next) {
  Product.countDocumentsDeleted({})
    .then(count => {
      res.locals.trashCount = count
      next()
    })
    .catch(next)
}

app.listen(port)