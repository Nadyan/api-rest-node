module.exports = app => {
    app.get('/appointments', (req, res) => {
        res.send('Appointments route!');
    });
}