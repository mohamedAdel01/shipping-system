-- AlterTable
ALTER TABLE `address` ADD COLUMN `user_id` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
