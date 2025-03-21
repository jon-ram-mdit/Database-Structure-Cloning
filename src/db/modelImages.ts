import { AppDataSource } from "..";
import { ModelColors } from "../modules/products/entities/end-product/modelColors";
import { ModelImages } from "../modules/products/entities/end-product/modelImages";
import { BrandsModels } from "../modules/products/entities/end-product/models";
import { YearImages } from "../modules/products/entities/end-product/yearImages";
import { ProductTypeImagePropertyCategories } from "../modules/products/entities/productType/productTypeImagePropCat";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

const modelsRepo = AppDataSource.getRepository(BrandsModels);
const modelImageRepo = AppDataSource.getRepository(ModelImages);
const modelColorsRepo = AppDataSource.getRepository(ModelColors);
const imageCatRepo = AppDataSource.getRepository(
  ProductTypeImagePropertyCategories
);
const yearImagesRepo = AppDataSource.getRepository(YearImages);

export async function isModelImagesInserted(modelId: string) {
  try {
    const modelImage = await modelImageRepo.findOneBy({
      model: {
        brand_model_id: modelId,
      },
    });
    return modelImage ? true : false;
  } catch (error) {
    throw error;
  }
}

export async function isModelColorImagesInserted(modelId: string) {
  try {
    const modelColor = await modelColorsRepo.findOneBy({
      model: {
        brand_model_id: modelId,
      },
    });
    return modelColor ? true : false;
  } catch (error) {
    throw error;
  }
}

export async function createVehicleTypeImageCategories(vehicleType: ProductTypes) {
  try {
    const categories = ["Interior", "Exterior"];

    for (let category of categories) {

      const existingInteriorCategory = await imageCatRepo.findOne({
        where: {
          name: category,
          productType: {
            product_type_id: vehicleType.product_type_id
          }
        }
      });

      if (!existingInteriorCategory) {
        let newImgCategory = new ProductTypeImagePropertyCategories();
        newImgCategory.productType = vehicleType;
        newImgCategory.name = category;
        await imageCatRepo.save(newImgCategory);
      }
    }
  } catch (error) {
    throw error;
  }
}

export async function insertModelCategoryImage({
  model,
  category,
  url,
  caption,
  vehicleType,
}: {
  model: BrandsModels;
  category: string;
  url: string;
  caption: string;
  vehicleType: ProductTypes
}) {
  try {
    // const imgPropCat = await getOrCreateImagePropCat(
    //   vehicleType,
    //   category
    // );

    let carVehicleType = {} as ProductTypes;

    const newModelCategoryImage = new ModelImages();
    newModelCategoryImage.model = model;
    newModelCategoryImage.url = url;
    newModelCategoryImage.caption = caption;

    const existingImgCategory = await imageCatRepo.findOne({
      where: {
        productType: {
          product_type_id: vehicleType.product_type_id,
        },
        name: category,
      },
    });

    if (existingImgCategory) {
      console.log("got existing img category")
      newModelCategoryImage.imagePropertyCategory = existingImgCategory;
    } else {
      console.log("creating new image category");
      let newImgCategory = new ProductTypeImagePropertyCategories();
      newImgCategory.productType = carVehicleType;
      newImgCategory.name = category;
      const dbImgCategory = await imageCatRepo.save(newImgCategory);
      newModelCategoryImage.imagePropertyCategory = dbImgCategory;
    }
    // let imageCategory: ProductTypeImagePropertyCategories;
    // if (category === "Interior") {
    //   imageCategory = await imageCatRepo.findOne({
    //     where: {
    //       product_type_image_prop_cat_id:
    //         "e2d80102-c074-45bc-8d8c-d20b8ceed59e",
    //     },
    //   });
    // } else if (category === "Exterior") {
    //   imageCategory = await imageCatRepo.findOne({
    //     where: {
    //       product_type_image_prop_cat_id:
    //         "ae768112-a9fe-4224-ab38-a8f1a6e1b994",
    //     },
    //   });
    // }
    // newModelCategoryImage.imagePropertyCategory = imageCategory;
    return await modelImageRepo.save(newModelCategoryImage);
  } catch (error) {
    throw error;
  }
}

export async function insertModelColorImage({
  model,
  color1,
  color2,
  url,
  caption,
}: {
  model: BrandsModels;
  color1: string;
  color2?: string;
  url: string;
  caption: string;
}) {
  try {
    const newModelColor = new ModelColors();
    newModelColor.model = model;
    newModelColor.color1 = color1;
    color2 && (newModelColor.color2 = color2);
    newModelColor.url = url;
    newModelColor.caption = caption;
    return modelColorsRepo.save(newModelColor);
  } catch (error) {
    throw error;
  }
}

export async function insertModelImagesToYear() {
  try {
    const allModels = await modelsRepo
      .createQueryBuilder("models")
      .innerJoinAndSelect("models.modelImages", "modelImages")
      .innerJoinAndSelect(
        "modelImages.imagePropertyCategory",
        "imagePropertyCategory"
      )
      .innerJoinAndSelect("models.variants", "variants")
      .innerJoinAndSelect("variants.years", "years")
      .getMany();

    console.log("started inserting model images:");
    for (let i = 0; i < allModels.length; i++) {
      console.log("i is: ", i);
      const model = allModels[i];
      const modelImages = model?.modelImages;
      const variants = model?.variants;

      if (model && modelImages && variants) {
        for (let j = 0; j < variants.length; j++) {
          console.log("j is: ", j);
          const variant = variants[j];
          const years = variant?.years;

          if (years) {
            for (let k = 0; k < years.length; k++) {
              console.log("k is: ", k);
              const year = years[k];
              if (year) {
                for (let l = 0; l < modelImages.length; l++) {
                  console.log("l is: ", j);
                  const modelImage = modelImages[l];
                  const imgCategory = modelImage?.imagePropertyCategory;

                  if (modelImage && imgCategory) {
                    const yearImage = await yearImagesRepo.findOne({
                      where: {
                        imagePropertyCategory: {
                          product_type_image_prop_cat_id:
                            imgCategory.product_type_image_prop_cat_id,
                        },
                        caption: modelImage.caption,
                        endYearVehicle: {
                          variant_year_id: year.variant_year_id,
                        },
                      },
                    });

                    if (!yearImage) {
                      const newYearImage = new YearImages();
                      newYearImage.caption = modelImage.caption;
                      newYearImage.image_url = modelImage.url;
                      newYearImage.imagePropertyCategory = imgCategory;
                      newYearImage.endYearVehicle = year;
                      await yearImagesRepo.save(newYearImage);
                      console.log("inserted year image data");
                    } else {
                      console.log("already inserted");
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log("all year images inserted");
  } catch (error) {
    throw error;
  }
}
