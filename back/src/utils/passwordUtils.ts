import bcrypt from 'bcrypt';

export class PasswordUtils {
    private static saltRounds = 10;

    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(PasswordUtils.saltRounds);
        return bcrypt.hash(password, salt);
    }

    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
