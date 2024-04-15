/*
  Warnings:

  - Added the required column `years_of_experience` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "years_of_experience",
ADD COLUMN     "years_of_experience" INTEGER NOT NULL;
