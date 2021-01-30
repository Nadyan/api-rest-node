const connection = require('../database/connection');
const moment = require('moment');

class Appointment {
    add(appointment, res) {
        const creationDate = moment().format('YYYY-MM-DD HH:MM:SS');
        const appointmentDate = moment(appointment.appointmentDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const appointmentWithDate = {...appointment, creationDate, appointmentDate};
        
        const sql = `INSERT INTO Appointments SET ?`;
        
        connection.query(sql, appointmentWithDate, (err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.json(result);
            }
        });
    }
}

module.exports = new Appointment;
