[
    {
        username: String,
        passwordHash: String, 
        role: String, // ADMIN, MEMBER, SUBSCRIBER
        salt: String,
        authMethod: [String], // session, basic, bearer
        createdDate: String,
        updatedDate: String,
        updatePasswordDate: String,
    }
]