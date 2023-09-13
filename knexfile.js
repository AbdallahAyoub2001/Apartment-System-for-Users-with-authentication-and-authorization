module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'apartment_booking_sys'
        },
        migrations: { // knex migrate:latest --knexfile db/knexfile.js
            directory: "./db/migrations/migrations",

        }
    },
};