const Appointment = require('../models/appointments');

module.exports = app => {
    app.get('/appointments', (req, res) => {
        res.send('Appointments route!');
    });

    app.post('/appointments', (req, res) => {
        const appointment = req.body;
        Appointment.add(appointment);
        
        res.send(req.body);
    });
}
