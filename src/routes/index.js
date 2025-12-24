const newsRouter = require('./news')
const siteRouter = require('./site')
const productRouter = require('./products')
const trashRouter = require('./trashes')
function routes(app) {
    

    app.use('/news', newsRouter)
    app.use('/', siteRouter)
    app.use('/products', productRouter)
    app.use('/', trashRouter)
}

module.exports = routes