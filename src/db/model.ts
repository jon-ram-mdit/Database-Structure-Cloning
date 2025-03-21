import { AppDataSource } from "..";
import { ProductBrands } from "../modules/products/entities/end-product/brands";
import { BrandsModels } from "../modules/products/entities/end-product/models";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

const modelsRepo = AppDataSource.getRepository(BrandsModels);

export async function insertModel(
  name: string,
  brand: ProductBrands,
  vehicleType: ProductTypes,
  variantsUrl: string
) {
  try {
    const existingModel = await modelsRepo.findOne({
      where: {
        model_name: name,
        productType: {
          product_type_id: vehicleType.product_type_id,
        },
      },
    });

    if (existingModel) {
      return { model: existingModel, variantsUrl };
    } else {
      let newModel = new BrandsModels();
      newModel.model_name = name;
      newModel.model_description = `${name} Description`;
      newModel.brand = brand;
      newModel.productType = vehicleType;
      const dbModel = await modelsRepo.save(newModel);
      delete dbModel.brand;
      return { model: dbModel, variantsUrl };
    }
  } catch (error) {
    throw error;
  }
}

export async function updateModelDesc(model: BrandsModels, modelDesc: string) {
  try {
    model.model_description = modelDesc;
    await modelsRepo.save(model);
  } catch (error) {
    throw error;
  }
}

export async function updateModelName(model: BrandsModels, modelName: string) {
  try {
    model.model_name = modelName;
    await modelsRepo.save(model);
  } catch (error) {
    throw error;
  }
}
