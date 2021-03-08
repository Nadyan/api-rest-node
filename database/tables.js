class Tabelas {
    init(connection) {
        this.connection = connection;
        this.createAppointments();
        this.createPets();
    }

    createAppointments() {
        const sql = `CREATE TABLE IF NOT EXISTS Appointments (
            id int NOT NULL AUTO_INCREMENT,
            client varchar(50) NOT NULL, 
            pet varchar(20), 
            service varchar(20) NOT NULL, 
            appointmentDate datetime NOT NULL,
            creationDate datetime NOT NULL,
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

    createPets() {
        const sql = `CREATE TABLE IF NOT EXISTS Pets (
            id int NOT NULL AUTO_INCREMENT,
            image varchar(200),
            PRIMARY KEY (id)
        )`;

        this.connection.query(sql, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Pets table created.');
            }
        });
    }
}

module.exports = new Tabelas;
