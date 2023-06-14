-- CreateEnum
CREATE TYPE "Publish_type" AS ENUM ('album', 'EP', 'single', 'compilado');

-- CreateTable
CREATE TABLE "Artist" (
    "id_artist" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id_artist")
);

-- CreateTable
CREATE TABLE "Publish" (
    "id_publish" SERIAL NOT NULL,
    "artist_id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type_publish" "Publish_type" DEFAULT 'single',
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publish_pkey" PRIMARY KEY ("id_publish")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "publish_id" INTEGER,
    "index" SERIAL NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Publish" ADD CONSTRAINT "Publish_artist_id_fkey" FOREIGN KEY ("artist_id") REFERENCES "Artist"("id_artist") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_publish_id_fkey" FOREIGN KEY ("publish_id") REFERENCES "Publish"("id_publish") ON DELETE SET NULL ON UPDATE CASCADE;
