/*
  Warnings:

  - You are about to drop the column `aadhar` on the `CheckIn` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "CheckIn_bookingId_aadhar_key";

-- AlterTable
ALTER TABLE "CheckIn" DROP COLUMN "aadhar";
