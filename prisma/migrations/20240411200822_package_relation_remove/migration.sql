/*
  Warnings:

  - Added the required column `packages` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `package` DROP FOREIGN KEY `Package_shipment_id_fkey`;

-- AlterTable
ALTER TABLE `shipment` ADD COLUMN `packages` JSON NOT NULL;
