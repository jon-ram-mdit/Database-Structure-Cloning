import { reqBodyFileType } from "../typeBoxSchemas";

export function getDatabaseErrorMessage(
  error,
  entityName: string,
  imageUrl?: string
): string {
  let errorMessage = error ? error.message : "Error in the server";
  if (error && error.code && error.code === "23505") {
    errorMessage = `${entityName} with this name already exists`;
  } else if (error && error.message && error.message.includes("JSON")) {
    errorMessage = `${entityName} must be valid JSON`;
  }

  throw new Error(errorMessage);
}

export function imageValidation(
  fileArray: reqBodyFileType,
  svgRequirement?: boolean
) {
  const validImageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "tiff",
    "webp",
    "svg",
    "avif",
  ];

  const validImageExtenstionsSet = new Set(validImageExtensions);

  if (svgRequirement && fileArray[0].fileExtension !== "svg") {
    throw new Error(
      "The image required for the particular purpose is SVG please upload the image of type SVG"
    );
  }

  let validFileTypeCount = 0;
  for (let i = 0; i < fileArray.length; i++) {
    const file = fileArray[i];
    const fileExtension = file.fileExtension;

    if (validImageExtenstionsSet.has(fileExtension)) {
      validFileTypeCount++;
    } else {
      break;
    }
  }

  if (validFileTypeCount !== fileArray.length) {
    throw new Error("The file provided is not of type image");
  }
}
