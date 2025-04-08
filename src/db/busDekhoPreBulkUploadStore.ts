import { AppDataSource } from "../config/database";
import { BusDekhoPreBulkUploadStore, IBusDekhoPreBulkUploadStoreType } from "../modules/products/entities/end-product/busDekhoPreBulkUploadStore";
import { ModelsVariants } from "../modules/products/entities/end-product/variants";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";


const busDekhoPreBulkUploadStoreRepo = AppDataSource.getRepository(BusDekhoPreBulkUploadStore);

export async function storeBusDekhoPreBulkUploadData(data: IBusDekhoPreBulkUploadStoreType, variant: ModelsVariants, vehicleType: ProductTypes) {
    try {
        if (data && variant && vehicleType) {
            const existingData = await busDekhoPreBulkUploadStoreRepo.findOne({
                where: {
                    variant: {
                        model_variant_id: variant.model_variant_id,
                    }
                }
            });

            if (!existingData) {
                const storeData = new BusDekhoPreBulkUploadStore();
                storeData.data = data;
                storeData.vehicleType = vehicleType;
                storeData.variant = variant;
                await busDekhoPreBulkUploadStoreRepo.save(storeData);
            }
        }

    } catch (error) {
        throw error;
    }
}

export async function getBusDekhoPreBulkUploadData(vehicleType: ProductTypes) {
    try {
        const result = await busDekhoPreBulkUploadStoreRepo.find({
            where: {
                vehicleType: {
                    product_type_id: vehicleType.product_type_id
                }
            }
        })

        return result.map((res) => res.data);
    } catch (error) {
        throw error;
    }
}