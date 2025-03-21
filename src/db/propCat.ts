import { AppDataSource } from "..";
import { ProductPropCat } from "../modules/products/entities/properties/propCat";

const propCatRepo = AppDataSource.getRepository(ProductPropCat);

export async function getOrCreatePropCat(catName: string) {
  try {
    const propCat = await propCatRepo.findOne({
      where: {
        name: catName,
      },
    });

    if (propCat) {
      return propCat;
    } else {
      const newPropCat = new ProductPropCat();
      newPropCat.name = catName;
      return await propCatRepo.save(newPropCat);
    }
  } catch (error) {
    console.log("error on get or create prop cat is: ", error);
    throw error;
  }
}
