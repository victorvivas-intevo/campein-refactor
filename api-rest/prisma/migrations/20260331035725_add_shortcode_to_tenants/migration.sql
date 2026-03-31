/*
  Warnings:

  - A unique constraint covering the columns `[shortcode]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shortcode` to the `tenants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tenants" ADD COLUMN "shortcode" TEXT SET;

-- Update data 
UPDATE "tenants" SET "shortcode" = 'tmp-' || id;

-- Alter table to set NOT NULL
ALTER TABLE "tenants" ALTER COLUMN "shortcode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tenants_shortcode_key" ON "tenants"("shortcode");
