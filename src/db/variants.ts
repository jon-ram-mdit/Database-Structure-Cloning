import { AppDataSource } from "..";
import { BrandsModels } from "../modules/products/entities/end-product/models";
import { ModelsVariants } from "../modules/products/entities/end-product/variants";

const variantRepo = AppDataSource.getRepository(ModelsVariants);

export async function insertVariant({
  name,
  model,
  variantDetailUrl,
}: {
  name: string;
  model: BrandsModels;
  variantDetailUrl: string;
}) {
  try {
    const existingVariant = await variantRepo.findOne({
      where: {
        variant_name: name,
        brandModel: {
          brand_model_id: model.brand_model_id,
        },
      },
    });

    if (existingVariant) {
      return {
        variant: existingVariant,
        detailUrl: variantDetailUrl,
      };
    } else {
      let newVariant = new ModelsVariants();
      newVariant.brandModel = model;
      newVariant.variant_name = name;
      newVariant.variant_description = `${name} Description`;
      const dbVariant = await variantRepo.save(newVariant);
      delete dbVariant.brandModel;
      return { variant: dbVariant, detailUrl: variantDetailUrl };
    }
  } catch (error) {
    throw error;
  }
}

export async function updateVariantDesc(variant: ModelsVariants, desc: string) {
  try {
    variant.variant_description = desc;
    await variantRepo.save(variant);
  } catch (error) {
    throw error;
  }
}
