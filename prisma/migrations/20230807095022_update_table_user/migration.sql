/*
  Warnings:

  - You are about to drop the column `user_key` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `userId` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_user_key_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "user_key",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("user_key") ON DELETE RESTRICT ON UPDATE CASCADE;
