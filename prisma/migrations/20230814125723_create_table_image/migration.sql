-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "originalname" VARCHAR NOT NULL,
    "image_file" VARCHAR NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
