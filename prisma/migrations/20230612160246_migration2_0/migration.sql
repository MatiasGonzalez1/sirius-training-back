/*
  Warnings:

  - The `type_publish` column on the `Publish` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Publish` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Publish_type" AS ENUM ('album', 'EP', 'single', 'compilado');

-- DropForeignKey
ALTER TABLE "Publish" DROP CONSTRAINT "Publish_artist_id_fkey";

-- AlterTable
ALTER TABLE "Publish" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "artist_id" DROP NOT NULL,
DROP COLUMN "type_publish",
ADD COLUMN     "type_publish" "Publish_type" DEFAULT 'single';

-- AlterTable
CREATE SEQUENCE theme_index_seq;
ALTER TABLE "Theme" ALTER COLUMN "index" SET DEFAULT nextval('theme_index_seq');
ALTER SEQUENCE theme_index_seq OWNED BY "Theme"."index";

-- DropTable
DROP TABLE "Type";

-- AddForeignKey
ALTER TABLE "Publish" ADD CONSTRAINT "Publish_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id_artist") ON DELETE SET NULL ON UPDATE CASCADE;
