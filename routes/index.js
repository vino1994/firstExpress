module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/users')
    })
    
    app.use('/api/users', require('./users'))
    app.use('/api/wx', require('./wx'))

    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404')
        }
    })
}