-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "full_link" TEXT NOT NULL,
    "selftext" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false
);
-- CreateIndex
CREATE UNIQUE INDEX "Submission_id_key" ON "Submission"("id");