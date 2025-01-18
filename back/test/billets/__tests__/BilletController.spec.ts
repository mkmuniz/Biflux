import { Request, Response } from 'express';
import { BilletServices } from "../../../src/modules/billet/billet.services";
import { BilletController } from "../../../src/modules/billet/billet.controller";
import { jest, expect } from "@jest/globals";
import { describe, test, beforeEach } from "@jest/globals";

describe("Test Billets Controller", () => {
    let billetController: BilletController;
    let mockBilletServices: jest.Mocked<BilletServices>;
    const userId = "1bc45d8e-6543-21ab-a789-e4f5g6h7i8j9";

    const mockResponse = () => {
        return {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        } as unknown as Response;
    };

    const mockRequestWithUserId = (userId: string) => {
        return {
            query: { userId }
        } as unknown as Request;
    };

    const mockRequestWithFile = (userId: string, file?: any) => {
        return {
            body: { userId },
            file
        } as unknown as Request;
    };

    const defaultFile = {
        originalname: "2000033567-09-2023.pdf",
        buffer: Buffer.from("test pdf content"),
        mimetype: "application/pdf"
    };

    beforeEach(() => {
        mockBilletServices = {
            getAllBilletsByUserId: jest.fn(),
            uploadBillet: jest.fn(),
            deleteBillet: jest.fn(),
            getSignedDownloadUrl: jest.fn(),
        } as unknown as jest.Mocked<BilletServices>;

        billetController = new BilletController(mockBilletServices);
    });

    test("Should return all billets by user id", async () => {
        const request = mockRequestWithUserId(userId);
        const responseBody = mockResponse();

        const expectedUserBillets = [
            {
                "id": "71a45623-8991-4123-a485-def12ab345c7",
                "fileName": "2000033567-09-2023.pdf",
                "filePath": "https://biflux-bucket.s3.us-east-1.amazonaws.com/1bc45d8e-6543-21ab-a789-e4f5g6h7i8j9_1634055705160.pdf",
                "clientNumber": "2000033567", 
                "month": "SET/23",
                "userId": userId,
                "createdAt": new Date("2024-01-01"),
                "updatedAt": new Date("2024-01-01"),
                "consumes": [
                    {
                        "id": "d1c2e373-cba9-381d-7140-0d2361437ab0",
                        "type": "Energia Elétrica",
                        "value": 52.45,
                        "quantity": 55,
                        "billetId": "71a45623-8991-4123-a485-def12ab345c7",
                        "createdAt": new Date("2024-01-01"),
                        "updatedAt": new Date("2024-01-01")
                    },
                    {
                        "id": "68401c00-46bd-2a76-820a-12262103b304",
                        "type": "Energia SCEE s/ ICMS",
                        "value": 195.62,
                        "quantity": 385,
                        "billetId": "71a45623-8991-4123-a485-def12ab345c7",
                        "createdAt": new Date("2024-01-01"),
                        "updatedAt": new Date("2024-01-01")
                    },
                    {
                        "id": "230807dd-1d87-348a-83a4-e78442780ebc",
                        "type": "Energia Compensada GD I",
                        "value": -190.45,
                        "quantity": 385,
                        "billetId": "71a45623-8991-4123-a485-def12ab345c7",
                        "createdAt": new Date("2024-01-01"),
                        "updatedAt": new Date("2024-01-01")
                    },
                    {
                        "id": "7a67bdac-1524-324d-76d0-b96241e2a02d",
                        "type": "Contrib Ilum Publica Municipal",
                        "value": 45.32,
                        "quantity": null,
                        "billetId": "71a45623-8991-4123-a485-def12ab345c7",
                        "createdAt": new Date("2024-01-01"),
                        "updatedAt": new Date("2024-01-01")
                    }
                ]
            },
            {
                "id": "82b56734-9002-5234-b596-efg23bc456d8",
                "fileName": "2000033567-08-2023.pdf",
                "filePath": "https://biflux-bucket.s3.us-east-1.amazonaws.com/1bc45d8e-6543-21ab-a789-e4f5g6h7i8j9_1634055705160.pdf",
                "clientNumber": "2000033567",
                "month": "AGO/23",
                "userId": userId,
                "createdAt": new Date("2024-01-01"),
                "updatedAt": new Date("2024-01-01"),
                "consumes": [
                    {
                        "id": "c0b2d262-aba7-270c-6030-0c1250326ba0",
                        "type": "Energia Elétrica",
                        "value": 48.92,
                        "quantity": 52,
                        "billetId": "82b56734-9002-5234-b596-efg23bc456d8",
                        "createdAt": new Date("2024-01-01"),
                        "updatedAt": new Date("2024-01-01")
                    },
                    {
                        "id": "57301b00-35ac-1a65-710a-01151002a203",
                        "type": "Energia SCEE s/ ICMS",
                        "value": 178.45,
                        "quantity": 360,
                        "billetId": "82b56734-9002-5234-b596-efg23bc456d8",
                        "createdAt": new Date("2024-01-01"),
                        "updatedAt": new Date("2024-01-01")
                    },
                    {
                        "id": "120706cc-0c76-237a-72a3-d67331670dab",
                        "type": "Energia Compensada GD I",
                        "value": -172.28,
                        "quantity": 360,
                        "billetId": "82b56734-9002-5234-b596-efg23bc456d8",
                        "createdAt": new Date("2024-01-01"),
                        "updatedAt": new Date("2024-01-01")
                    },
                    {
                        "id": "6a56acab-0413-213c-65c0-a85130d1a01c",
                        "type": "Contrib Ilum Publica Municipal",
                        "value": 43.21,
                        "quantity": null,
                        "billetId": "82b56734-9002-5234-b596-efg23bc456d8",
                        "createdAt": new Date("2024-01-01"),
                        "updatedAt": new Date("2024-01-01")
                    }
                ]
            }
        ];

        mockBilletServices.getAllBilletsByUserId.mockResolvedValueOnce(expectedUserBillets);
        await billetController.getAllBilletsByUserId(request, responseBody);

        expect(mockBilletServices.getAllBilletsByUserId).toHaveBeenCalledWith(userId);
        expect(responseBody.status).toHaveBeenCalledWith(200);
        expect(responseBody.json).toHaveBeenCalledWith(expectedUserBillets);
    });

    test("Should return 500 if billet services throws an error", async () => {
        const request = mockRequestWithUserId(userId);
        const responseBody = mockResponse();

        mockBilletServices.getAllBilletsByUserId.mockRejectedValueOnce(new Error("Internal server error"));
        await billetController.getAllBilletsByUserId(request, responseBody);

        expect(mockBilletServices.getAllBilletsByUserId).toHaveBeenCalledWith(userId);
        expect(responseBody.status).toHaveBeenCalledWith(500);
        expect(responseBody.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });

    test("Should return 400 if userId is not provided", async () => {
        const request = mockRequestWithUserId("");
        const responseBody = mockResponse();

        await billetController.getAllBilletsByUserId(request, responseBody);

        expect(mockBilletServices.getAllBilletsByUserId).not.toHaveBeenCalled();
        expect(responseBody.status).toHaveBeenCalledWith(400);
        expect(responseBody.json).toHaveBeenCalledWith({ message: "User ID is required" });
    });

    test("Should return 404 if user not found", async () => {
        const request = mockRequestWithUserId(userId);
        const responseBody = mockResponse();

        mockBilletServices.getAllBilletsByUserId.mockRejectedValueOnce(new Error("User not found"));
        await billetController.getAllBilletsByUserId(request, responseBody);

        expect(mockBilletServices.getAllBilletsByUserId).toHaveBeenCalledWith(userId);
        expect(responseBody.status).toHaveBeenCalledWith(404);
        expect(responseBody.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    test("Should return 200 if billet is uploaded successfully", async () => {
        const request = mockRequestWithFile(userId, defaultFile);
        const responseBody = mockResponse();

        const expectedBillet = {
            id: "71a45623-8991-4123-a485-def12ab345c7",
            fileName: "2000033567-09-2023.pdf",
            filePath: "https://biflux-bucket.s3.us-east-1.amazonaws.com/1bc45d8e-6543-21ab-a789-e4f5g6h7i8j9_1634055705160.pdf",
            clientNumber: "2000033567", 
            month: "SET/23",
            userId: userId,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
            consumes: [
                {
                    id: "d1c2e373-cba9-381d-7140-0d2361437ab0",
                    type: "Energia Elétrica",
                    value: 52.45,
                    quantity: 55,
                    billetId: "71a45623-8991-4123-a485-def12ab345c7",
                    createdAt: new Date("2024-01-01"),
                    updatedAt: new Date("2024-01-01")
                },
                {
                    id: "68401c00-46bd-2a76-820a-12262103b304", 
                    type: "Energia SCEE s/ ICMS",
                    value: 195.62,
                    quantity: 385,
                    billetId: "71a45623-8991-4123-a485-def12ab345c7",
                    createdAt: new Date("2024-01-01"),
                    updatedAt: new Date("2024-01-01")
                },
                {
                    id: "230807dd-1d87-348a-83a4-e78442780ebc",
                    type: "Energia Compensada GD I",
                    value: -190.45,
                    quantity: 385,
                    billetId: "71a45623-8991-4123-a485-def12ab345c7",
                    createdAt: new Date("2024-01-01"),
                    updatedAt: new Date("2024-01-01")
                },
                {
                    id: "7a67bdac-1524-324d-76d0-b96241e2a02d",
                    type: "Contrib Ilum Publica Municipal",
                    value: 45.32,
                    quantity: null,
                    billetId: "71a45623-8991-4123-a485-def12ab345c7",
                    createdAt: new Date("2024-01-01"),
                    updatedAt: new Date("2024-01-01")
                }
            ]
        };

        mockBilletServices.uploadBillet.mockResolvedValueOnce(expectedBillet);
        await billetController.uploadBillet(request, responseBody);

        expect(mockBilletServices.uploadBillet).toHaveBeenCalledWith(defaultFile, userId);
        expect(responseBody.json).toHaveBeenCalledWith(expectedBillet);
    });

    test("Should return 400 if userId is not provided when uploading a billet", async () => {
        const request = mockRequestWithFile("");
        const responseBody = mockResponse();

        await billetController.uploadBillet(request, responseBody);

        expect(mockBilletServices.uploadBillet).not.toHaveBeenCalled();
        expect(responseBody.status).toHaveBeenCalledWith(400);
        expect(responseBody.json).toHaveBeenCalledWith({ message: "Missing required fields" });
    });

    test("Should return 400 if file is not provided when uploading a billet", async () => {
        const request = mockRequestWithFile(userId);
        const responseBody = mockResponse();

        await billetController.uploadBillet(request, responseBody);

        expect(mockBilletServices.uploadBillet).not.toHaveBeenCalled();
        expect(responseBody.status).toHaveBeenCalledWith(400);
        expect(responseBody.json).toHaveBeenCalledWith({ message: "Missing required fields" });
    });

    test("Should return 500 if billet services throws an error when uploading a billet", async () => {
        const request = mockRequestWithFile(userId, defaultFile);
        const responseBody = mockResponse();

        mockBilletServices.uploadBillet.mockRejectedValueOnce(new Error("Internal server error"));
        await billetController.uploadBillet(request, responseBody);

        expect(mockBilletServices.uploadBillet).toHaveBeenCalledWith(defaultFile, userId);
        expect(responseBody.status).toHaveBeenCalledWith(500);
        expect(responseBody.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });

    test("Should return 404 if user not found when uploading a billet", async () => {
        const request = mockRequestWithFile(userId, defaultFile);
        const responseBody = mockResponse();

        mockBilletServices.uploadBillet.mockRejectedValueOnce(new Error("User not found"));
        await billetController.uploadBillet(request, responseBody);

        expect(mockBilletServices.uploadBillet).toHaveBeenCalledWith(defaultFile, userId);
        expect(responseBody.status).toHaveBeenCalledWith(404);
        expect(responseBody.json).toHaveBeenCalledWith({ message: "User not found" });
    });
});
