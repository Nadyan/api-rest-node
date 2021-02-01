const connection = require('../database/connection');
const moment = require('moment');

class Appointment {
    add(appointment, res) {
        const creationDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const appointmentDate = moment(appointment.appointmentDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        
        const validDate = moment(appointmentDate).isSameOrAfter(creationDate);
        const validClient = appointment.client.length >= 3;

        const validations = [
            {
                name: 'date',
                msg: 'Appointment Date must be after the actual date.',
                valid: validDate
            },
            {
                name: 'client',
                msg: 'Client name must have at least 3 chars.',
                valid: validClient
            }
        ];

        const errors = validations.filter(field => !field.valid);

        if (errors.length) {
            res.status(400).json(errors);
        } else {
            const appointmentWithDate = {...appointment, creationDate, appointmentDate};
        
            const sql = `INSERT INTO Appointments SET ?`;
            
            connection.query(sql, appointmentWithDate, (err, result) => {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.status(201).json(result.insertId);
                }
            });
        }        
    }
}

module.exports = new Appointment;
