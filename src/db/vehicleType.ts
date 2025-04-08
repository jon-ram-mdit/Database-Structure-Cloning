import { AppDataSource } from "../config/database";
import { ProductTypes } from "../modules/products/entities/productType/productTypes";

const vehicleTypeRepo = AppDataSource.getRepository(ProductTypes);

export async function getVehicleTypeById(typeId: string) {
  try {
    const vehicleType = vehicleTypeRepo.findOne({
      where: {
        product_type_id: typeId,
      },
    });

    if (!vehicleType) {
      throw new Error("No vehicle type with given id was found");
    }

    return vehicleType;
  } catch (error) {
    throw error;
  }
}
