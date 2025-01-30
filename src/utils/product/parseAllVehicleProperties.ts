import { VariantsYears } from "../../modules/products/entities/end-product/year";
import { ProductSubTypes } from "../../modules/products/entities/sub-type/subType";
import { OuterSpecWithValue } from "../../modules/products/services/responseClasses/outerSpec";

export class Property {
  propId: string;
  name: string;
  valueId: string;
  value: string | number | boolean;
  valueType: string;
  textSpecValueId: string;
  constructor({
    propId,
    propName,
    propValue,
    propValueType,
    propUnit,
    propValueId,
    textSpecValueId,
  }: {
    propId: string;
    propName: string;
    propValue: string | number | boolean;
    propValueType: string;
    propValueId?: string;
    propUnit?: string;
    textSpecValueId?: string;
  }) {
    this.propId = propId;
    this.name = propName;
    this.valueId = propValueId ? propValueId : null;
    this.value = propValue;
    this.valueType = propValueType;
    textSpecValueId && (this.textSpecValueId = textSpecValueId);
  }
}

export class PropertyWithUnit extends Property {
  unit: string;

  constructor({
    propId,
    propName,
    propValue,
    propValueType,
    propUnit,
    propValueId,
    textSpecValueId,
  }: {
    propId: string;
    propName: string;
    propValue: string | number | boolean;
    propValueType: string;
    propValueId?: string;
    propUnit?: string;
    textSpecValueId?: string;
  }) {
    super({
      propId,
      propName,
      propValue,
      propValueType,
      propValueId,
      textSpecValueId,
    });
    this.unit = propUnit ? propUnit : undefined;
  }
}

export class PropertyCategoryWithProperty {
  catId: string;
  name: string;
  image: string;
  intSpecs: PropertyWithUnit[] = [];
  textSpecs: Property[] = [];
  decSpecs: PropertyWithUnit[] = [];
  features: Property[] = [];

  constructor(propCatId: string, propCatName: string, propCatImage: string) {
    this.catId = propCatId;
    this.name = propCatName;
    this.image = propCatImage;
  }
}

export function parseVehicleAllProperties(
  outputYear: VariantsYears,
  subType: ProductSubTypes
) {
  // look up prop cat map is to aggregate the various properties into
  // their parent property category
  const lookUpPropCatMap = new Map<string, number>();
  const parsedPropCat: PropertyCategoryWithProperty[] = [];

  // for parsing all key properties
  let keyIntSpecsWithValue: PropertyWithUnit[] = [];
  let keyTextSpecsWithValue: Property[] = [];
  let keyDecimalSpecsWithValue: PropertyWithUnit[] = [];
  let keyFeaturesWithValue: Property[] = [];

  // first storing all the key properties in set data structure for quick lookup
  let keyDecSpecsLookUp = new Set<string>(),
    keyTextSpecsLookUp = new Set<string>(),
    keyIntSpecsLookUp = new Set<string>(),
    keyFeaturesLookUp = new Set<string>();

  // for storing all outer specifications
  let outerIntSpecsWithValue: OuterSpecWithValue[] = [];
  let outerDecSpecsWithValue: OuterSpecWithValue[] = [];
  let outerTextSpecsWithValue: OuterSpecWithValue[] = [];

  let outerDecSpecsLookUp = new Map<string, string>(),
    outerTextSpecsLookUp = new Map<string, string>(),
    outerIntSpecsLookUp = new Map<string, string>();

  if (subType) {
    const {
      keyDecSpecs,
      keyIntSpecs,
      keyTextSpecs,
      keyFeatures,
      outerDecSpecs,
      outerIntSpecs,
      outerTextSpecs,
    } = subType;

    keyDecSpecs?.forEach(({ decimalSpec }) => {
      const decSpecId = decimalSpec?.product_decimal_spec_id;
      decSpecId && keyDecSpecsLookUp.add(decSpecId);
    });

    keyIntSpecs?.forEach(({ intSpec }) => {
      const intSpecId = intSpec?.product_int_spec_id;
      intSpecId && keyIntSpecsLookUp.add(intSpecId);
    });

    keyTextSpecs?.forEach(({ textSpec }) => {
      const textSpecId = textSpec?.product_text_spec_id;
      textSpecId && keyTextSpecsLookUp.add(textSpecId);
    });

    keyFeatures?.forEach(({ feature }) => {
      const featureId = feature?.product_feature_id;
      featureId && keyFeaturesLookUp.add(featureId);
    });

    outerDecSpecs?.forEach(({ decimalSpec, image_url }) => {
      const decimalSpecId = decimalSpec?.product_decimal_spec_id;
      decimalSpecId && outerDecSpecsLookUp.set(decimalSpecId, image_url);
    });

    outerIntSpecs?.forEach(({ intSpec, image_url }) => {
      const intSpecId = intSpec?.product_int_spec_id;
      intSpecId && outerIntSpecsLookUp.set(intSpecId, image_url);
    });

    outerTextSpecs?.forEach(({ textSpec, image_url }) => {
      const textSpecId = textSpec?.product_text_spec_id;
      textSpecId && outerTextSpecsLookUp.set(textSpecId, image_url);
    });
  }

  outputYear?.yearDecimalSpecValues?.forEach(
    ({ year_decimal_spec_value_id, value_type, value, propCatDecimalSpec }) => {
      const { subTypePropCat, decimalSpec } = propCatDecimalSpec || {};
      if (!decimalSpec) return;

      // checking whether sub type prop cat is present after checking the spec
      // because hiding a prop cat will hide the spec but even if the prop cat
      // is hidden and spec is not hidden then displaying it in key specs and outer specs

      const {
        product_decimal_spec_id: propId,
        name: propName,
        unit,
      } = decimalSpec;

      let newDecimalSpecWithValue = new PropertyWithUnit({
        propId,
        propName,
        propValue: value,
        propValueType: value_type,
        propValueId: year_decimal_spec_value_id,
        propUnit: unit ? unit.name : null,
      });

      if (keyDecSpecsLookUp.has(propId)) {
        keyDecimalSpecsWithValue.push(newDecimalSpecWithValue);
      }

      const outerDecSpecImgUrl = outerDecSpecsLookUp.get(propId);
      if (outerDecSpecImgUrl) {
        outerDecSpecsWithValue.push(
          new OuterSpecWithValue({
            id: propId,
            name: propName,
            imgUrl: outerDecSpecImgUrl,
            unit: unit ? unit.name : null,
            value,
          })
        );
      }

      if (!subTypePropCat) return;

      const { subtype_property_category_id: propCatId, propCat } =
        subTypePropCat || {};
      if (!propCat || !propCatId) return;

      const { name: propCatName, image_url: propCatImage } = propCat;
      if (!propCatName || !propName) return;

      if (!lookUpPropCatMap.has(propCatName)) {
        let parsedPropCatLen = parsedPropCat.length;
        lookUpPropCatMap.set(propCatName, parsedPropCatLen);
        parsedPropCat.push(
          new PropertyCategoryWithProperty(propCatId, propCatName, propCatImage)
        );
        parsedPropCat[parsedPropCatLen].decSpecs.push(newDecimalSpecWithValue);
      } else {
        const index = lookUpPropCatMap.get(propCatName);
        parsedPropCat[index].decSpecs.push(newDecimalSpecWithValue);
      }
    }
  );

  outputYear?.yearIntSpecValues?.forEach(
    ({ year_int_spec_value_id, value_type, value, propCatIntSpec }) => {
      const { subTypePropCat, intSpec } = propCatIntSpec || {};
      if (!intSpec) return;

      const { product_int_spec_id: propId, name: propName, unit } = intSpec;

      let newIntSpecWithValue = new PropertyWithUnit({
        propId,
        propName,
        propValue: value,
        propValueType: value_type,
        propValueId: year_int_spec_value_id,
        propUnit: unit?.name ?? null,
      });

      if (keyIntSpecsLookUp.has(propId)) {
        keyIntSpecsWithValue.push(newIntSpecWithValue);
      }

      const outerIntSpecImgUrl = outerIntSpecsLookUp.get(propId);
      if (outerIntSpecImgUrl) {
        outerIntSpecsWithValue.push(
          new OuterSpecWithValue({
            id: propId,
            name: propName,
            imgUrl: outerIntSpecImgUrl,
            unit: unit ? unit.name : null,
            value,
          })
        );
      }

      if (!subTypePropCat) return;

      const { subtype_property_category_id: propCatId, propCat } =
        subTypePropCat || {};

      if (!propCat || !propCatId) return;

      const { name: propCatName, image_url: propCatImage } = propCat;
      if (!propCatId || !propCatName || !propName) return;

      if (!lookUpPropCatMap.has(propCatName)) {
        let parsedPropCatLen = parsedPropCat.length;
        lookUpPropCatMap.set(propCatName, parsedPropCatLen);
        parsedPropCat.push(
          new PropertyCategoryWithProperty(propCatId, propCatName, propCatImage)
        );
        parsedPropCat[parsedPropCatLen].intSpecs.push(newIntSpecWithValue);
      } else {
        const index = lookUpPropCatMap.get(propCatName);
        parsedPropCat[index].intSpecs.push(newIntSpecWithValue);
      }
    }
  );

  outputYear?.yearTextSpecValues?.forEach(
    ({ year_text_spec_value_id, value_type, value, propCatTextSpec }) => {
      const { value: textSpecValue, text_spec_value_id: textSpecValueId } =
        value || {};

      if (!textSpecValue) return;

      const { subTypePropCat, textSpec } = propCatTextSpec || {};
      if (!textSpec) return;

      const { product_text_spec_id: propId, name: propName } = textSpec;

      let newTextSpecWithValue = new Property({
        propId,
        propName,
        propValue: textSpecValue ?? "",
        propValueType: value_type,
        propValueId: year_text_spec_value_id,
        textSpecValueId: textSpecValueId ?? "",
      });

      if (keyTextSpecsLookUp.has(propId)) {
        keyTextSpecsWithValue.push(newTextSpecWithValue);
      }

      const outerTextSpecImgUrl = outerTextSpecsLookUp.get(propId);
      if (outerTextSpecImgUrl) {
        outerTextSpecsWithValue.push(
          new OuterSpecWithValue({
            id: textSpec.product_text_spec_id,
            name: textSpec.name,
            imgUrl: outerTextSpecImgUrl,
            value: value.value,
          })
        );
      }

      if (!subTypePropCat) return;

      const { subtype_property_category_id: propCatId, propCat } =
        subTypePropCat || {};
      if (!propCat || !propCatId) return;

      const { name: propCatName, image_url: propCatImage } = propCat;
      if (!propCatId || !propCatName || !propName || !year_text_spec_value_id)
        return;

      if (!lookUpPropCatMap.has(propCatName)) {
        let parsedPropCatLen = parsedPropCat.length;
        lookUpPropCatMap.set(propCatName, parsedPropCatLen);
        parsedPropCat.push(
          new PropertyCategoryWithProperty(propCatId, propCatName, propCatImage)
        );
        parsedPropCat[parsedPropCatLen].textSpecs.push(newTextSpecWithValue);
      } else {
        const index = lookUpPropCatMap.get(propCatName);
        parsedPropCat[index].textSpecs.push(newTextSpecWithValue);
      }
    }
  );

  outputYear?.yearFeaturesValues?.forEach(
    ({ year_feature_value_id, value_type, value, propCatFeature }) => {
      const { subTypePropCat, feature } = propCatFeature || {};
      if (!feature) return;

      const { product_feature_id: propId, name: propName } = feature;

      let newFeatureWithValue = new Property({
        propId,
        propName,
        propValue: value,
        propValueType: value_type,
        propValueId: year_feature_value_id,
      });

      if (keyFeaturesLookUp.has(propId)) {
        keyFeaturesWithValue.push(newFeatureWithValue);
      }

      if (!subTypePropCat) return;

      const { subtype_property_category_id: propCatId, propCat } =
        subTypePropCat || {};
      if (!propCat || !propCatId) return;

      const { name: propCatName, image_url: propCatImage } = propCat;
      if (!propCatId || !propCatName || !propName) return;

      if (!lookUpPropCatMap.has(propCatName)) {
        let parsedPropCatLen = parsedPropCat.length;
        lookUpPropCatMap.set(propCatName, parsedPropCatLen);
        parsedPropCat.push(
          new PropertyCategoryWithProperty(propCatId, propCatName, propCatImage)
        );
        parsedPropCat[parsedPropCatLen].features.push(newFeatureWithValue);
      } else {
        const index = lookUpPropCatMap.get(propCatName);
        parsedPropCat[index].features.push(newFeatureWithValue);
      }
    }
  );

  return {
    propCatWithProp: parsedPropCat,
    keyFeatures: keyFeaturesWithValue,
    keyIntSpecs: keyIntSpecsWithValue,
    keyTextSpecs: keyTextSpecsWithValue,
    keyDecSpecs: keyDecimalSpecsWithValue,
    outerIntSpecs: outerIntSpecsWithValue,
    outerTextSpecs: outerTextSpecsWithValue,
    outerDecSpecs: outerDecSpecsWithValue,
  };
}
