module.exports = {
    protocol: "mongodb",
    credentials: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
    },
    ip: process.env.MONGODB_IP || 'localhost',
    port: process.env.MONGODB_PORT || 27017,

    connectionOptions: {
        maxPoolSize: 20,
    },
}