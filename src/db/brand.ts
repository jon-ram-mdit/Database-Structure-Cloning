import { AppDataSource } from "..";
import { ProductBrands } from "../modules/products/entities/end-product/brands";

const brandRepo = AppDataSource.getRepository(ProductBrands);

export async function insertBrand({
  name,
  img,
  modelsUrl,
}: {
  name: string;
  img: string;
  modelsUrl: string;
}) {
  try {
    const brandWithSameName = await brandRepo.findOne({
      where: {
        brand_name: name,
      },
    });
    if (brandWithSameName) {
      return { brand: brandWithSameName, modelsUrl };
    } else {
      let newBrand = new ProductBrands();
      newBrand.brand_name = name;
      newBrand.brand_image_url = img;
      const dbBrand = await brandRepo.save(newBrand);
      return { brand: dbBrand, modelsUrl };
    }
  } catch (error) {
    throw error;
  }
}

