module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/users')
    })
    
    app.use('/users', require('./users'))

    // 404 page
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.status(404).render('404')
        }
    })
}