import { PrismaClient, User } from "@prisma/client";
import { UserEntity } from "../../types/user.types";

export interface IUserRepository {
    getAll(): Promise<User[]>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: UserEntity): Promise<User>;
    update(id: string, data: Partial<UserEntity>): Promise<User>;
}

export class UserRepository implements IUserRepository {
    private db: PrismaClient;

    constructor() {
        this.db = new PrismaClient();
    }

    async getAll(): Promise<User[]> {
        return this.db.user.findMany();
    }

    async findById(id: string): Promise<User | null> {
        return this.db.user.findUnique({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.db.user.findUnique({ where: { email } });
    }

    async create(data: any): Promise<User> {
        return this.db.user.create({ data });
    }

    async update(id: string, data: Partial<UserEntity>): Promise<User> {
        return this.db.user.update({ where: { id }, data });
    }
}
