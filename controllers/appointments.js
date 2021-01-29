module.exports = app => {
    app.get('/appointments', (req, res) => {
        res.send('Appointments route!');
    });

    app.post('/appointments', (req, res) => {

        res.send(req.body);
    });
}
