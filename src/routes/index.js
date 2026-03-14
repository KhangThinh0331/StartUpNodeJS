const siteRouter = require('./site')
const productRouter = require('./products')
const trashRouter = require('./trashes')
function routes(app) {
    
    app.use('/api/products', siteRouter)
    app.use('/api/products', productRouter)
    app.use('/api/trashes', trashRouter)
}

module.exports = routes