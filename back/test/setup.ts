import { PrismaClient } from '@prisma/client';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { jest } from '@jest/globals';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(),
}));

export const prismaMock = mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>; 