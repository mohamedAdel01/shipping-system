/*
  Warnings:

  - You are about to alter the column `service` on the `shipment` table. The data in that column could be lost. The data in that column will be cast from `LongText` to `Int`.

*/
-- DropIndex
DROP INDEX `Package_shipment_id_fkey` ON `package`;

-- AlterTable
ALTER TABLE `shipment` MODIFY `service` INTEGER NOT NULL;
