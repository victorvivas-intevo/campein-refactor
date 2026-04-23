/*
  Warnings:

  - A unique constraint covering the columns `[tenant_id,code]` on the table `forms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortcode]` on the table `tenants` will be added. If there are existing duplicate values, this will fail.
  - Made the column `shortcode` on table `tenants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "imageCard" TEXT;

-- AlterTable
ALTER TABLE "tenants" ALTER COLUMN "shortcode" SET NOT NULL;

-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tenant_id" UUID NOT NULL,
    "logo" TEXT,
    "bannerOne" TEXT,
    "imageOne" TEXT,
    "imageTwo" TEXT,
    "imageThree" TEXT,
    "imageFour" TEXT,
    "colorPrimary" TEXT,
    "colorSecondary" TEXT,
    "colorTertiary" TEXT,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_tenant_id_key" ON "profile"("tenant_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_logo_key" ON "profile"("logo");

-- CreateIndex
CREATE UNIQUE INDEX "profile_bannerOne_key" ON "profile"("bannerOne");

-- CreateIndex
CREATE UNIQUE INDEX "profile_imageOne_key" ON "profile"("imageOne");

-- CreateIndex
CREATE UNIQUE INDEX "profile_imageTwo_key" ON "profile"("imageTwo");

-- CreateIndex
CREATE UNIQUE INDEX "profile_imageThree_key" ON "profile"("imageThree");

-- CreateIndex
CREATE UNIQUE INDEX "profile_imageFour_key" ON "profile"("imageFour");

-- CreateIndex
CREATE UNIQUE INDEX "profile_colorPrimary_key" ON "profile"("colorPrimary");

-- CreateIndex
CREATE UNIQUE INDEX "profile_colorSecondary_key" ON "profile"("colorSecondary");

-- CreateIndex
CREATE UNIQUE INDEX "profile_colorTertiary_key" ON "profile"("colorTertiary");

-- CreateIndex
CREATE UNIQUE INDEX "forms_tenant_id_code_key" ON "forms"("tenant_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_shortcode_key" ON "tenants"("shortcode");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
