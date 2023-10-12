/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Account` DROP FOREIGN KEY `Account_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Todo` DROP FOREIGN KEY `Todo_userId_fkey`;

-- DropTable
DROP TABLE `Account`;

-- DropTable
DROP TABLE `Session`;

-- DropTable
DROP TABLE `Todo`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `VerificationToken`;

-- CreateTable
CREATE TABLE `Product_master` (
    `pro_id` VARCHAR(191) NOT NULL,
    `pro_name` VARCHAR(191) NOT NULL,
    `pro_category` VARCHAR(191) NOT NULL,
    `cost` INTEGER NOT NULL,
    `selling` INTEGER NOT NULL,
    `maker` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NOT NULL,
    `weight` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`pro_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stock_details` (
    `stock_id` VARCHAR(191) NOT NULL,
    `stock_num` VARCHAR(191) NOT NULL,
    `pro_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Stock_details_pro_id_key`(`pro_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customer_master` (
    `cust_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`cust_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_master` (
    `order_master_id` VARCHAR(191) NOT NULL,
    `cust_id` VARCHAR(191) NOT NULL,
    `order_id` VARCHAR(191) NOT NULL,
    `payment` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Order_master_order_id_key`(`order_id`),
    PRIMARY KEY (`order_master_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_details` (
    `order_id` VARCHAR(191) NOT NULL,
    `pro_id` VARCHAR(191) NOT NULL,
    `pieces` VARCHAR(191) NOT NULL,
    `unit_price` VARCHAR(191) NOT NULL,
    `subtotal` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Order_details_unit_price_key`(`unit_price`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stock_details` ADD CONSTRAINT `Stock_details_pro_id_fkey` FOREIGN KEY (`pro_id`) REFERENCES `Product_master`(`pro_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_master` ADD CONSTRAINT `Order_master_cust_id_fkey` FOREIGN KEY (`cust_id`) REFERENCES `Customer_master`(`cust_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_details` ADD CONSTRAINT `Order_details_pro_id_fkey` FOREIGN KEY (`pro_id`) REFERENCES `Product_master`(`pro_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_details` ADD CONSTRAINT `Order_details_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order_master`(`order_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
