/*
  Warnings:

  - Added the required column `fee` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "appointmentStatus" ADD VALUE 'cancelled';

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "fee" INTEGER NOT NULL;
