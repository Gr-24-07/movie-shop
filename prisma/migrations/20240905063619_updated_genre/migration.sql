/*
  Warnings:

  - You are about to drop the `_GenreToMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_B_fkey";

-- AlterTable
ALTER TABLE "Genre" ADD COLUMN     "deletedDate" TIMESTAMP(3);

-- DropTable
DROP TABLE "_GenreToMovie";

-- CreateTable
CREATE TABLE "_GenreMovies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenreMovies_AB_unique" ON "_GenreMovies"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreMovies_B_index" ON "_GenreMovies"("B");

-- AddForeignKey
ALTER TABLE "_GenreMovies" ADD CONSTRAINT "_GenreMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreMovies" ADD CONSTRAINT "_GenreMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
