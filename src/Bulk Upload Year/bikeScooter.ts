import { getBikeDekhoPreBulkUploadData } from "../db/bikeDekhoPreBulkUploadStore";
import { getVehicleTypeById } from "../db/vehicleType";
import { createVariantYearValues } from "../db/yearBulkValues";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

export async function bulkUploadBikeDekhoData() {
  try {
    // ** replace with your bike / scooter vehicle type id
    const scooterVehicleTypeId = "c2dcb5fc-ab2a-4071-a266-ed0ecec3f062";
    
    const bikeVehicleTypeId = "01effa96-3555-46be-932f-5c7ac69bd795";

    const vehicleTypeId = bikeVehicleTypeId;

    let bikeDekhoVehicleType: ProductTypes;

    bikeDekhoVehicleType = await getVehicleTypeById(vehicleTypeId);

    if (bikeDekhoVehicleType) {
      const bikeDekhoPreBulkUploadData = await getBikeDekhoPreBulkUploadData(
        bikeDekhoVehicleType
      );

      console.log(
        "total data to bulk upload: ",
        bikeDekhoPreBulkUploadData.length
      );
      for (let i = 0; i < bikeDekhoPreBulkUploadData.length; i++) {
        const variantDetail = bikeDekhoPreBulkUploadData[i];
        console.log(
          "started uploading variant: ",
          i + 1,
          variantDetail.dbVariant.variant_name,
          "remaining to scrape: ",
          bikeDekhoPreBulkUploadData.length - 1 - i
        );
        await createVariantYearValues(
          variantDetail.dbVariant,
          bikeDekhoVehicleType,
          variantDetail.scrappedVariant,
          variantDetail.subType,
          variantDetail?.yearColors ?? [],
          variantDetail?.categoricalImages ?? []
        );
      }

      console.log(
        `***** completed uploading all the variants of ${bikeDekhoVehicleType.product_type_name} *****`
      );
    } else {
      console.log(
        "No vehicle type to insert bike dekho data with the provided id found. Please insert a valid id for inserting bike dekho data."
      );
    }
  } catch (error) {
    throw error;
  }
}
