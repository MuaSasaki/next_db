/*
  Warnings:

  - You are about to drop the `Customer_master` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order_master` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product_master` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Stock_details` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Order_details` DROP FOREIGN KEY `Order_details_order_id_fkey`;

-- DropForeignKey
ALTER TABLE `Order_details` DROP FOREIGN KEY `Order_details_pro_id_fkey`;

-- DropForeignKey
ALTER TABLE `Order_master` DROP FOREIGN KEY `Order_master_cust_id_fkey`;

-- DropForeignKey
ALTER TABLE `Stock_details` DROP FOREIGN KEY `Stock_details_pro_id_fkey`;

-- DropTable
DROP TABLE `Customer_master`;

-- DropTable
DROP TABLE `Order_details`;

-- DropTable
DROP TABLE `Order_master`;

-- DropTable
DROP TABLE `Product_master`;

-- DropTable
DROP TABLE `Stock_details`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pro_name` VARCHAR(191) NOT NULL,
    `maker` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stock_num` INTEGER NOT NULL,
    `pro_id` INTEGER NOT NULL,

    UNIQUE INDEX `Stock_pro_id_key`(`pro_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_pro_id_fkey` FOREIGN KEY (`pro_id`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
