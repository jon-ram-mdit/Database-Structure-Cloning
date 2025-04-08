import { AppDataSource } from "../config/database";
import {
  ITruckDekhoPreBulkUploadStoreType,
  TruckDekhoPreBulkUploadStore,
} from "../modules/products/entities/end-product/truckDekhoPreBulkUploadStore";
import { ModelsVariants } from "../modules/products/entities/end-product/variants";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

const truckDekhoPreBulkUploadStoreRepo = AppDataSource.getRepository(
  TruckDekhoPreBulkUploadStore
);

export async function storeTruckDekhoPreBulkUploadData(
  data: ITruckDekhoPreBulkUploadStoreType,
  variant: ModelsVariants,
  vehicleType: ProductTypes
) {
  try {
    if (data && variant && vehicleType) {
      const existingData = await truckDekhoPreBulkUploadStoreRepo.findOne({
        where: {
          variant: {
            model_variant_id: variant.model_variant_id,
          },
        },
      });

      if (!existingData) {
        const storeData = new TruckDekhoPreBulkUploadStore();
        storeData.data = data;
        storeData.vehicleType = vehicleType;
        storeData.variant = variant;
        await truckDekhoPreBulkUploadStoreRepo.save(storeData);
      }
    }
  } catch (error) {
    throw error;
  }
}

export async function getTruckDekhoPreBulkUploadData(
  vehicleType: ProductTypes
) {
  try {
    const result = await truckDekhoPreBulkUploadStoreRepo.find({
      where: {
        vehicleType: {
          product_type_id: vehicleType.product_type_id,
        },
      },
    });

    return result.map((res) => res.data);
  } catch (error) {
    throw error;
  }
}
