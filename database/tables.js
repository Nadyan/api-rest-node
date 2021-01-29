class Tabelas {
    init(connection) {
        this.connection = connection;
        this.createAppointments();
    }

    createAppointments() {
        const sql = `CREATE TABLE Appointments (
            id int NOT NULL AUTO_INCREMENT,
            client varchar(50) NOT NULL, 
            pet varchar(20), 
            service varchar(20) NOT NULL, 
            status varchar(20) NOT NULL,
            obs text,
            PRIMARY KEY(id)
        )`;

        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Appointments table created.');
            }
        });
    }
}

module.exports = new Tabelas;