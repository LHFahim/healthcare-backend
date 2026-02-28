-- CreateEnum
CREATE TYPE "AuthPanel" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('EMAIL', 'GOOGLE', 'FACEBOOK', 'APPLE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "passwordChangeRequired" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatar" TEXT,
    "city" TEXT,
    "postCode" TEXT,
    "address" TEXT,
    "phoneNumber" TEXT,
    "secondaryPhoneNumber" TEXT,
    "authProvider" "AuthProvider" NOT NULL,
    "authPanel" "AuthPanel" NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "gdprEnabled" BOOLEAN DEFAULT false,
    "lastLoggedAt" TIMESTAMP(3),
    "lastActiveAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
