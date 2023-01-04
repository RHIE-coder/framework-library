module.exports = {
    protocol: "mongodb",
    credentials: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
    },
    ip: "172.18.45.173",
    port: 27017,
    connectionOptions: {
        maxPoolSize: 20,
    },
}