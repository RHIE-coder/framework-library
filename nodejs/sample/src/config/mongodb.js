module.exports = {
    protocol: "mongodb",
    credential: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
    },
    ip: process.env.MONGODB_IP || 'localhost',
    port: process.env.MONGODB_PORT || 27017,
    dbName: 'applicationService',
    connectionOption: {
        maxPoolSize: 20,
    },
}