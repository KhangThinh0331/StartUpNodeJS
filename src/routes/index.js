const newsRouter = require('./news')
const siteRouter = require('./site')
const productRouter = require('./products')
function routes(app) {
    

    app.use('/news', newsRouter)
    app.use('/', siteRouter)
    app.use('/products', productRouter)
}

module.exports = routes