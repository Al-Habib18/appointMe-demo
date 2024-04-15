-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "auth_user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "phone" TEXT,
    "profile_picture" TEXT,
    "bio" TEXT,
    "years_of_experience" TEXT,
    "hospital_affliation" TEXT,
    "availability" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_auth_user_id_key" ON "Patient"("auth_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_license_key" ON "Patient"("license");

-- CreateIndex
CREATE INDEX "Patient_auth_user_id_idx" ON "Patient"("auth_user_id");
