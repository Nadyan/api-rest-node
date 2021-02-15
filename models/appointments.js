const connection = require('../database/connection');
const moment = require('moment');

class Appointment {
    index(res) {
        const sql = 'SELECT * FROM Appointments';

        connection.query(sql, (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(result);
            }
        });
    }

    index_id(id, res) {
        const sql = 'SELECT * FROM Appointments WHERE id=?';

        connection.query(sql, id, (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json(result);
            }
        })
    }

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
                    const insertId = result.insertId;
                    res.status(201).json({...appointmentWithDate, insertId});
                }
            });
        }        
    }

    edit(id, values, res) {
        if (values.appointmentDate) {
            values.appointmentDate = moment(values.appointmentDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }

        const sql = 'UPDATE Appointments SET ? WHERE id = ?';

        connection.query(sql, [values, id], (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json({...values, id});
            }
        });
    }

    delete(id, res) {
        const sql = 'DELETE FROM Appointments WHERE id = ?';

        connection.query(sql, id, (err, result) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Appointment;
