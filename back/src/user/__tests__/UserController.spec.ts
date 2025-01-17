import { Request, Response } from 'express';
import { UserController } from "../../modules/user/user.controller";
import { UserServices } from "../../modules/user/user.services";
import { jest, expect } from "@jest/globals";
import { describe, test, beforeEach } from "@jest/globals";

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
            password: "Lk@323456",
        };

        const request = {
            body: requestBody,
        } as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as unknown as Response;

        const expectedUser = {
            id: "1",
            name: "Rafael Moreira",
            email: "rafael.moreira@gmail.com",
            password: "Lk@323456",
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
        const request = {
            body: null
        } as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as unknown as Response;

        const error = new Error("User fields are required");

        await userController.createUser(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({
            message: error.message
        });
    });

    test("Should handle error when user already exists", async () => {
        const request = {
            body: {
                name: "Isabela Santos",
                email: "isabela.santos@outlook.com",
                password: "Lk@323456",
            },
        } as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as unknown as Response;

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
        const request = {
            body: {
                name: "Bruno Carvalho",
                email: "bruno.carvalho@gmail.com",
                password: "Lk@323456",
            },
        } as Request;

        const response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as unknown as Response;

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
                    password: "mKSidl239Lc23DK",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '2',
                    name: 'Maria Silva',
                    email: 'maria.silva@outlook.com',
                    profilePicture: null,
                    password: "m2kSL11mkD3",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ];

            const request = {} as Request;
            const response = {
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            mockUserService.getAllUsers.mockResolvedValueOnce(users);

            await userController.getAllUsers(request, response);

            expect(mockUserService.getAllUsers).toHaveBeenCalled();
            expect(response.json).toHaveBeenCalledWith(users);
        });

        test('Should handle error when getting all users', async () => {
            const request = {} as Request;
            const response = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

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

            const request = {
                params: { id: '1' }
            } as unknown as Request;

            const response = {
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            mockUserService.getUserById.mockResolvedValueOnce(user);

            await userController.getUserById(request, response);

            expect(mockUserService.getUserById).toHaveBeenCalledWith('1');
            expect(response.json).toHaveBeenCalledWith(user);
        });

        test('Should handle missing user ID', async () => {
            const request = {
                params: {}
            } as unknown as Request;

            const response = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            await userController.getUserById(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({ message: 'User ID is required' });
        });

        test('Should handle user not found', async () => {
            const request = {
                params: { id: '999' }
            } as unknown as Request;

            const response = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

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

            const request = {
                params: { id: '1' },
                body: updateData
            } as unknown as Request;

            const response = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

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
            const request = {
                params: {},
                body: { name: 'João Paulo Mendes' }
            } as unknown as Request;

            const response = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            await userController.updateUserProfile(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({ message: 'User ID is required' });
        });

        test('Should handle empty update data', async () => {
            const request = {
                params: { id: '1' },
                body: {}
            } as unknown as Request;

            const response = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

            await userController.updateUserProfile(request, response);

            expect(response.status).toHaveBeenCalledWith(400);
            expect(response.json).toHaveBeenCalledWith({
                message: 'At least one field must be provided for update'
            });
        });

        test('Should handle user profile not found during update', async () => {
            const request = {
                params: { id: '999' },
                body: { name: 'Gabriela Costa' }
            } as unknown as Request;

            const response = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
            } as unknown as Response;

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
