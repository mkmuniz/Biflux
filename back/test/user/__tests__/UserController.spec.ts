import { Request, Response } from 'express';
import { UserController } from "../../../src/modules/user/user.controller";
import { UserServices } from "../../../src/modules/user/user.services";
import { jest, expect } from "@jest/globals";
import { describe, test, beforeEach } from "@jest/globals";

const generateRandomPassword = (length: number = 12): string => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '@#$%&*!';
    
    const allChars = uppercase + lowercase + numbers + symbols;
    let password = '';
    
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
};

const mockResponse = () => {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    } as unknown as Response;
};

const mockRequestWithBody = (body: any) => {
    return {
        body
    } as Request;
};

const mockRequestWithParams = (params: any) => {
    return {
        params
    } as unknown as Request;
};

const mockRequestWithParamsAndBody = (params: any, body: any) => {
    return {
        params,
        body
    } as unknown as Request;
};

describe("Test User Controller", () => {
    let userController: UserController;
    let mockUserService: jest.Mocked<UserServices>;

    beforeEach(() => {
        mockUserService = {
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
            updateUserProfile: jest.fn(),
        } as unknown as jest.Mocked<UserServices>;

        userController = new UserController(mockUserService);
    });

    test("Should create a User", async () => {
        const requestBody = {
            name: "Rafael Moreira",
            email: "rafael.moreira@gmail.com",
            password: generateRandomPassword(),
        };

        const request = mockRequestWithBody(requestBody);
        const response = mockResponse();

        const expectedUser = {
            id: "1",
            name: "Rafael Moreira",
            email: "rafael.moreira@gmail.com",
            password: requestBody.password,
            profilePicture: null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const expectedUserWithDetails = {
            ...expectedUser,
            password: requestBody.password,
            profilePicture: null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        mockUserService.createUser.mockResolvedValueOnce(expectedUserWithDetails);

        await userController.createUser(request, response);

        expect(mockUserService.createUser).toHaveBeenCalledWith(requestBody);
        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith(expectedUser);
    });

    test("Should handle error when user data is invalid", async () => {
        const request = mockRequestWithBody(null);
        const response = mockResponse();

        const error = new Error("User fields are required");

        await userController.createUser(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            message: error.message
        });
    });

    test("Should handle error when user already exists", async () => {
        const request = mockRequestWithBody({
            name: "Isabela Santos",
            email: "isabela.santos@outlook.com",
            password: "Lk@323456",
        });
        const response = mockResponse();

        const error = new Error("User already exists");
        mockUserService.createUser.mockRejectedValueOnce(error);

        await userController.createUser(request, response);

        expect(mockUserService.createUser).toHaveBeenCalledWith(request.body);
        expect(response.status).toHaveBeenCalledWith(409);
        expect(response.json).toHaveBeenCalledWith({
            message: error.message
        });
    });

    test("Should handle error when creating user", async () => {
        const request = mockRequestWithBody({
            name: "Bruno Carvalho",
            email: "bruno.carvalho@gmail.com",
            password: "Lk@323456",
        });
        const response = mockResponse();

        const error = new Error("Database error");
        mockUserService.createUser.mockRejectedValueOnce(error);

        await userController.createUser(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });

    describe('getAllUsers', () => {
        test('Should return all users successfully', async () => {
            const users = [
                {
                    id: '1',
                    name: 'Pedro Alves',
                    email: 'pedro.alves@gmail.com',
                    profilePicture: null,
                    password: generateRandomPassword(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '2',
                    name: 'Maria Silva',
                    email: 'maria.silva@outlook.com',
                    profilePicture: null,
                    password: generateRandomPassword(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ];

            const request = {} as Request;
            const response = mockResponse();

            mockUserService.getAllUsers.mockResolvedValueOnce(users);

            await userController.getAllUsers(request, response);

            expect(mockUserService.getAllUsers).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith(users);
        });

        test('Should handle error when getting all users', async () => {
            const request = {} as Request;
            const response = mockResponse();

            const error = new Error('Database error');
            mockUserService.getAllUsers.mockRejectedValueOnce(error);

            await userController.getAllUsers(request, response);

            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.json).toHaveBeenCalledWith({ message: 'Internal server error' });
        });
    });

    describe('getUserById', () => {
        test('Should return user by ID successfully', async () => {
            const user = {
                id: '1',
                name: 'Lucas Santos',
                email: 'lucas.santos@hotmail.com',
                profilePicture: null,
                password: "m2kSL11mkD3",
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const request = mockRequestWithParams({ id: '1' });
            const response = mockResponse();

            mockUserService.getUserById.mockResolvedValueOnce(user);

            await userController.getUserById(request, response);

            expect(mockUserService.getUserById).toHaveBeenCalledWith('1');
            expect(response.json).toHaveBeenCalledWith(user);
        });

        test('Should handle missing user ID', async () => {
            const request = mockRequestWithParams({});
            const response = mockResponse();

            await userController.getUserById(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({ message: 'User ID is required' });
        });

        test('Should handle user not found', async () => {
            const request = mockRequestWithParams({ id: '999' });
            const response = mockResponse();

            mockUserService.getUserById.mockResolvedValueOnce(null);

            await userController.getUserById(request, response);

            expect(response.status).toHaveBeenCalledWith(404);
            expect(response.json).toHaveBeenCalledWith({ message: 'User not found' });
        });
    });

    describe('updateUserProfile', () => {
        test('Should update user profile successfully', async () => {
            const updateData = {
                name: 'Ana Carolina Oliveira',
                email: 'ana.oliveira@yahoo.com',
                profilePicture: 'ana-profile.jpg'
            };

            const request = mockRequestWithParamsAndBody({ id: '1' }, updateData);
            const response = mockResponse();

            const updatedUser = {
                id: '1',
                ...updateData,
                password: "m2kSL11mkD3",
                createdAt: new Date(),
                updatedAt: new Date()
            };

            mockUserService.updateUserProfile.mockResolvedValueOnce(updatedUser);

            await userController.updateUserProfile(request, response);

            expect(mockUserService.updateUserProfile).toHaveBeenCalledWith('1', {
                name: updateData.name,
                email: updateData.email,
                profilePicture: updateData.profilePicture
            });
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith(updatedUser);
        });

        test('Should handle missing user ID in update', async () => {
            const request = mockRequestWithParamsAndBody({}, { name: 'João Paulo Mendes' });
            const response = mockResponse();

            await userController.updateUserProfile(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({ message: 'User ID is required' });
        });

        test('Should handle empty update data', async () => {
            const request = mockRequestWithParamsAndBody({ id: '1' }, {});
            const response = mockResponse();

            await userController.updateUserProfile(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({
                message: 'At least one field must be provided for update'
            });
        });

        test('Should handle user profile not found during update', async () => {
            const request = mockRequestWithParamsAndBody({ id: '999' }, { name: 'Gabriela Costa' });
            const response = mockResponse();

            mockUserService.updateUserProfile.mockRejectedValueOnce(
                new Error('User profile not found')
            );

            await userController.updateUserProfile(request, response);

            expect(response.status).toHaveBeenCalledWith(404);
            expect(response.json).toHaveBeenCalledWith({
                message: 'User profile not found'
            });
        });
    });
});
