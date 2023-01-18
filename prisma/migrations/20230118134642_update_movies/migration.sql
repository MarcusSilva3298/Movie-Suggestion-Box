/*
  Warnings:

  - You are about to drop the column `votes` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "votes",
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "rating" TEXT,
ADD COLUMN     "synopsis" TEXT;
