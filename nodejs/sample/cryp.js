const bcrypt = require("bcryptjs")

const inputPassword = "gr!";


(async() => {
    const salt = bcrypt.genSaltSync(10);
    console.log(salt);
    const storedPassword = await bcrypt.hash(inputPassword, salt);
    console.log(storedPassword)
    const matchResult = bcrypt.compareSync(inputPassword, storedPassword)
    console.log(matchResult);
})()
