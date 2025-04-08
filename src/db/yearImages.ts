import { AppDataSource } from "../config/database";
import { VariantsYears } from "../modules/products/entities/end-product/year";
import { YearImages } from "../modules/products/entities/end-product/yearImages";
import { ProductTypeImagePropertyCategories } from "../modules/products/entities/productType/productTypeImagePropCat";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

const yearImagesRepo = AppDataSource.getRepository(YearImages);
const productTypeImagePropCatRepo = AppDataSource.getRepository(
  ProductTypeImagePropertyCategories
);

export async function getOrCreateImagePropCat(
  productType: ProductTypes,
  catName: string
) {
  try {
    const existingProductTypeImgPropCat =
      await productTypeImagePropCatRepo.findOne({
        where: {
          productType: {
            product_type_id: productType.product_type_id,
          },
          name: catName,
        },
      });
    if (existingProductTypeImgPropCat) {
      return existingProductTypeImgPropCat;
    } else {
      const newImgPropCat = new ProductTypeImagePropertyCategories();
      newImgPropCat.name = catName;
      newImgPropCat.productType = productType;
      return await productTypeImagePropCatRepo.save(newImgPropCat);
    }
  } catch (error) {
    throw error;
  }
}

async function insertImageForCategory(
  year: VariantsYears,
  propCat: ProductTypeImagePropertyCategories,
  image: {
    url: string;
    caption: string;
  }
) {
  try {
    const existingImage = await yearImagesRepo.findOne({
      where: {
        endYearVehicle: {
          variant_year_id: year.variant_year_id,
        },
        imagePropertyCategory: {
          product_type_image_prop_cat_id:
            propCat.product_type_image_prop_cat_id,
        },
        caption: image.caption,
      },
    });
    if (!existingImage) {
      const newImage = new YearImages();
      newImage.image_url = image.url;
      newImage.caption = image.caption;
      newImage.imagePropertyCategory = propCat;
      newImage.endYearVehicle = year;
      return await yearImagesRepo.save(newImage);
    }
  } catch (error) {
    throw error;
  }
}

async function insertYearCategoryImages(
  year: VariantsYears,
  productType: ProductTypes,
  categoryImage: {
    category: string;
    images: {
      url: string;
      caption: string;
    }[];
  }
) {
  try {
    const imgPropCat = await getOrCreateImagePropCat(
      productType,
      categoryImage.category
    );

    if (imgPropCat) {
      return categoryImage.images.map(
        async (image) => await insertImageForCategory(year, imgPropCat, image)
      );
    }
  } catch (error) {
    throw error;
  }
}

export async function insertBulkYearImages(
  vehicleType: ProductTypes,
  year: VariantsYears,
  yearImages: {
    category: string;
    images: {
      url: string;
      caption: string;
    }[];
  }[]
) {
  try {
    const isYearImagesInserted = await yearImagesRepo.findOneBy({
      endYearVehicle: {
        variant_year_id: year.variant_year_id,
      },
    });

    if (!isYearImagesInserted) {
      return yearImages.map((yearImage) =>
        insertYearCategoryImages(year, vehicleType, yearImage)
      );
    }
  } catch (error) {
    throw error;
  }
}
