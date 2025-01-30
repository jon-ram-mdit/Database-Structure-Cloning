export const globalConstants = {
  homeScreenFixedLogos: {
    budgetSVG:
      "https://d1nfarxkt267md.cloudfront.net/static-image-contents/home-page-logos/brandSVGNew.svg",
    brandSVG:
      "https://d1nfarxkt267md.cloudfront.net/static-image-contents/home-page-logos/budgetSVGNew.svg",
  },
  companyLogos: {
    mditLogo:
      "https://d1nfarxkt267md.cloudfront.net/static-image-contents/company-logo/mditLogo.jpg",
  },
  defaultLocation: {
    name: "Kathmandu, Nepal",
    coordinates: [27.7172, 85.324],
  },
  defaultProfileLogo:
    "https://d1nfarxkt267md.cloudfront.net/static-image-contents/home-page-logos/DefaultDP.jpg",
  noOfDigitsForEmailRegister: 6,
  noOfDigitsInEmailOtp: 6,
  usedVehicleLogos: {
    location:
      "https://d1nfarxkt267md.cloudfront.net/static-image-contents/used-vehilce-logs/location-svgrepo-com.svg",
    taxClearYear:
      "https://d1nfarxkt267md.cloudfront.net/static-image-contents/used-vehilce-logs/taxClearYear.svg",
    kmDriven:
      "https://d1nfarxkt267md.cloudfront.net/static-image-contents/used-vehilce-logs/kmDriven.svg",
    condition:
      "https://d1nfarxkt267md.cloudfront.net/static-image-contents/used-vehilce-logs/vehicle-condition.svg",
    ownershipType:
      "https://d1nfarxkt267md.cloudfront.net/static-image-contents/used-vehilce-logs/ownerShipType.svg",
    purchaseYear:
      "https://d1nfarxkt267md.cloudfront.net/static-image-contents/used-vehilce-logs/purchaseYearSVG.svg",
  },
};

export enum PricingUnits {
  rs = "Rs",
  lakh = "L",
  crore = "Cr",
}

export enum FullPricingUnits {
  rs = "Rs",
  lakh = "Lakhs",
  crore = "Crore",
}

export const imageUrlPrefix = "https://d1nfarxkt267md.cloudfront.net/";

export default globalConstants;
