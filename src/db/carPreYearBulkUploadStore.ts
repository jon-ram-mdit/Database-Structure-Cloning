import { AppDataSource } from "..";
import { CarPreYearBulkUploadStore, IScrappedVariantDetail } from "../modules/products/entities/end-product/CarPreYearBulkUploadStore";
import { ModelsVariants } from "../modules/products/entities/end-product/variants";

const carPreYearBulkUploadStoreRepo = AppDataSource.getRepository(
  CarPreYearBulkUploadStore
);

export async function storePreCarData(
  variant: ModelsVariants,
  data: IScrappedVariantDetail
) {
  try {
    const existingData = await carPreYearBulkUploadStoreRepo.findOne({
      where: {
        variant: {
          model_variant_id: variant.model_variant_id,
        },
      },
    });

    if (!existingData && variant) {
      const newData = new CarPreYearBulkUploadStore();
      newData.data = data;
      newData.variant = variant;
      await carPreYearBulkUploadStoreRepo.save(newData);
    }
  } catch (error) {
    throw error;
  }
}

export async function getAllCarBulkStoreData() {
  try {
    const allData = await carPreYearBulkUploadStoreRepo.find();
    return allData.map((data) => data.data);
  } catch (error) {
    throw error;
  }
}