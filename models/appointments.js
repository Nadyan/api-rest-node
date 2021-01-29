const connection = require('../database/connection');

class Appointment {
    add(appointment) {
        const sql = `INSERT INTO Appointments SET ?`;
        
        connection.query(sql, appointment, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
            }
        });
    }
}

module.exports = new Appointment;
