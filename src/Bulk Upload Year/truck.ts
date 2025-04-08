import { getBikeDekhoPreBulkUploadData } from "../db/bikeDekhoPreBulkUploadStore";
import { getTruckDekhoPreBulkUploadData } from "../db/truckDekhoPreBulkUploadStore";
import { getVehicleTypeById } from "../db/vehicleType";
import { createVariantYearValues } from "../db/yearBulkValues";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

export async function bulkUploadTruckDekhoData() {
  try {
    // ** replace with your vehicle type id of truck dekho

    const truckDekhoVehicleTypeId = "717c38bb-bdf4-4673-b84c-cc1014dfc6b5";

    const vehicleTypeId = truckDekhoVehicleTypeId;

    let truckDekhoVehicleType: ProductTypes;

    truckDekhoVehicleType = await getVehicleTypeById(vehicleTypeId);

    if (truckDekhoVehicleType) {
      const truckDekhoPreBulkUploadData = await getTruckDekhoPreBulkUploadData(
        truckDekhoVehicleType
      );

      console.log(
        "total data to bulk upload: ",
        truckDekhoPreBulkUploadData.length
      );
      for (let i = 0; i < truckDekhoPreBulkUploadData.length; i++) {
        const variantDetail = truckDekhoPreBulkUploadData[i];
        console.log(
          "started uploading variant: ",
          i + 1,
          variantDetail.dbVariant.variant_name,
          "remaining to scrape: ",
          truckDekhoPreBulkUploadData.length - 1 - i
        );
        await createVariantYearValues(
          variantDetail.dbVariant,
          truckDekhoVehicleType,
          variantDetail.scrappedVariant,
          variantDetail.subType,
          variantDetail?.yearColors ?? [],
          variantDetail?.categoricalImages ?? []
        );
      }

      console.log(
        `***** completed uploading all the variants of ${truckDekhoVehicleType.product_type_name} *****`
      );
    } else {
      console.log(
        "No vehicle type to insert truck dekho data with the provided id found. Please insert a valid id for inserting truck dekho data."
      );
    }
  } catch (error) {
    throw error;
  }
}
