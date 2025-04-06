import { getBikeDekhoPreBulkUploadData } from "../db/bikeDekhoPreBulkUploadStore";
import { getBusDekhoPreBulkUploadData } from "../db/busDekhoPreBulkUploadStore";
import { getVehicleTypeById } from "../db/vehicleType";
import { createVariantYearValues } from "../db/yearBulkValues";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

export async function bulkUploadBusDekhoData() {
  try {
    // const scooterVehicleTypeId = "9cf4567c-d111-4164-b7a9-d9705187e522";
    const busDekhoVehicleTypeId = "717c38bb-bdf4-4673-b84c-cc1014dfc6b5";

    const vehicleTypeId = busDekhoVehicleTypeId;

    let busDekhoVehicleType: ProductTypes;

    busDekhoVehicleType = await getVehicleTypeById(vehicleTypeId);

    if (busDekhoVehicleType) {
      const busDekhoPreBulkUploaData = await getBusDekhoPreBulkUploadData(
        busDekhoVehicleType
      );

      console.log(
        "total data to bulk upload: ",
        busDekhoPreBulkUploaData.length
      );
      for (let i = 0; i < busDekhoPreBulkUploaData.length; i++) {
        const variantDetail = busDekhoPreBulkUploaData[i];
        console.log(
          "started uploading variant: ",
          i + 1,
          variantDetail.dbVariant.variant_name,
          "remaining to scrape: ",
          busDekhoPreBulkUploaData.length - 1 - i
        );
        await createVariantYearValues(
          variantDetail.dbVariant,
          busDekhoVehicleType,
          variantDetail.scrappedVariant,
          variantDetail.subType,
          variantDetail?.yearColors ?? [],
          variantDetail?.categoricalImages ?? []
        );
      }

      console.log(
        `***** completed uploading all the variants of ${busDekhoVehicleType.product_type_name} *****`
      );
    }
  } catch (error) {
    throw error;
  }
}
