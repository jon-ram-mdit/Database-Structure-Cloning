import { AppDataSource } from "..";
import { BikeDekhoPreBulkUploadStore, IBikeDekhoScrappedVariantDetail } from "../modules/products/entities/end-product/BikeDekhoPreBulkUploadStore";
import { ModelsVariants } from "../modules/products/entities/end-product/variants";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

const bikeDekhoPreBulkUploadStoreRepo = AppDataSource.getRepository(
  BikeDekhoPreBulkUploadStore
);

export async function storeBikeDekhoPreBulkUploadData(
  variant: ModelsVariants,
  vehicleType: ProductTypes,
  data: IBikeDekhoScrappedVariantDetail
) {
  try {
    const existingData = await bikeDekhoPreBulkUploadStoreRepo.findOne({
      where: {
        variant: {
          model_variant_id: variant.model_variant_id,
        },
      },
    });

    if (!existingData && vehicleType && variant) {
      const storeData = new BikeDekhoPreBulkUploadStore();
      storeData.data = data;
      storeData.productType = vehicleType;
      storeData.variant = variant;
      await bikeDekhoPreBulkUploadStoreRepo.save(storeData);
    }
  } catch (error) {
    throw error;
  }
}

export async function getBikeDekhoPreBulkUploadData(vehicleType: ProductTypes) {
  try {
    const result = await bikeDekhoPreBulkUploadStoreRepo.find({
      where: {
        productType: {
          product_type_id: vehicleType.product_type_id,
        },
      },
    });
    return result.map((res) => res.data);
  } catch (error) {
    throw error;
  }
}
