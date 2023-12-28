const bcrypt = require("bcrypt")
const saltRounds = 10;

export async function hashPassword(password: string) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        return hashedPassword;
    } catch (err: any) {
        console.error(err);
    };
};