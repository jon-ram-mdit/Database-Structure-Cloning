import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timeZone from "dayjs/plugin/timezone";
import config from "../config";

export function getTimeAgo(timestamp: Date): string {
  try {
    // Extend necessary dayjs plugins
    dayjs.extend(duration);
    dayjs.extend(relativeTime);
    dayjs.extend(utc);
    dayjs.extend(timeZone);

    const NODE_ENV = config.NODE_ENV;

    // Set explicit time zone based on environment
    const kathmanduTimeZone = "Asia/Kathmandu";
    let createdDate = dayjs.utc(timestamp); // Start with UTC

    if (NODE_ENV === "development") {
      // Convert to Kathmandu time zone explicitly
      createdDate = createdDate.tz(kathmanduTimeZone);
    }

    // Get current time in the correct time zone
    let now =
      NODE_ENV === "development" ? dayjs().tz(kathmanduTimeZone) : dayjs.utc();

    // Calculate the time difference
    const fromToday = createdDate.from(now);

    return fromToday;
  } catch (error) {
    console.log("error in parsing timestamp is: ", error);
    throw error;
  }
}

export function convertObjectKeysToCamelCase(input: any): any {
  if (input === null || typeof input !== "object") {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map((item) => convertObjectKeysToCamelCase(item));
  }

  if (typeof input === "object") {
    const newObject: { [key: string]: any } = {};
    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (_, match) =>
          match.toUpperCase()
        );
        newObject[camelCaseKey] = convertObjectKeysToCamelCase(input[key]);
      }
    }
    return newObject;
  }

  return input;
}
