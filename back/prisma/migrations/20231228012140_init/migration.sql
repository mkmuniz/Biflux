-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_token" (
    "id" TEXT NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "refresh_token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billets" (
    "id" SERIAL NOT NULL,
    "referenceMonth" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "billets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consume" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "billetId" INTEGER NOT NULL,

    CONSTRAINT "consume_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_id_key" ON "refresh_token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_userId_key" ON "refresh_token"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "billets_id_key" ON "billets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "consume_id_key" ON "consume"("id");

-- AddForeignKey
ALTER TABLE "refresh_token" ADD CONSTRAINT "refresh_token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billets" ADD CONSTRAINT "billets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consume" ADD CONSTRAINT "consume_billetId_fkey" FOREIGN KEY ("billetId") REFERENCES "billets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
