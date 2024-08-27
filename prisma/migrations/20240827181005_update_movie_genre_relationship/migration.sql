/*
  Warnings:

  - You are about to drop the column `orderDate` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "orderDate",
DROP COLUMN "status";
