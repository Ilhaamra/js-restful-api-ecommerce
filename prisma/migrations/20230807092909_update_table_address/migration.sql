/*
  Warnings:

  - Added the required column `address_name` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "address_name" VARCHAR(100) NOT NULL,
ADD COLUMN     "country" VARCHAR(50) NOT NULL,
ADD COLUMN     "province" VARCHAR(50) NOT NULL,
ALTER COLUMN "street" SET DATA TYPE VARCHAR(200);
