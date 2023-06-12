/*
  Warnings:

  - The primary key for the `Artist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Artist` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_pkey",
DROP COLUMN "id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id_artist" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Artist_pkey" PRIMARY KEY ("id_artist");

-- CreateTable
CREATE TABLE "Publish" (
    "id_publish" SERIAL NOT NULL,
    "artist_id" INTEGER NOT NULL,
    "type_publish" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publish_pkey" PRIMARY KEY ("id_publish")
);

-- CreateTable
CREATE TABLE "Type" (
    "id_type" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id_type")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "publish_id" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "duration" BIGINT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Publish" ADD CONSTRAINT "Publish_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id_artist") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_publish_id_fkey" FOREIGN KEY ("publish_id") REFERENCES "Publish"("id_publish") ON DELETE RESTRICT ON UPDATE CASCADE;
