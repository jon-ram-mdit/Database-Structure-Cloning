import { YearImages } from "../../modules/products/entities/end-product/yearImages";
import { EndYearImages } from "../../modules/products/services/responseClasses/variant";

export function parseYearImages(yearImages: YearImages[] = []) {
  let parsedYearImages: EndYearImages[] = [];
  let lookUpPropCat = new Map<string, number>();
  for (let i = 0; i < yearImages.length; i++) {
    let image = yearImages[i];
    const propCat = image?.imagePropertyCategory;
    const propCatId = propCat?.product_type_image_prop_cat_id;
    let toPushImage = {
      id: image.year_image_id,
      url: image.image_url,
      caption: image.caption,
      deleted_date: image.deleted_date,
    };
    if (propCat && propCatId) {
      if (!lookUpPropCat.has(propCatId)) {
        lookUpPropCat.set(propCatId, parsedYearImages.length);
        parsedYearImages.push(new EndYearImages(propCatId, propCat.name));
        parsedYearImages[parsedYearImages.length - 1].images.push(toPushImage);
      } else {
        const index = lookUpPropCat.get(propCatId);
        parsedYearImages[index]?.images.push(toPushImage);
      }
    }
  }
  return parsedYearImages;
}
