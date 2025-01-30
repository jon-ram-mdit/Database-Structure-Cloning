import { generateRandom } from "..";

interface loginIdGenerator {
  firstname: string;
  lastname: string;
  company: string;
}

const textSource = "ABCDEFGHIJKLMNOPQRSTUVQXYZ";

export const loginIdGenerator = ({
  firstname,
  lastname,
  company,
}: loginIdGenerator) => {
  const randomNo = generateRandom();
  const loginId = `${lastname.slice(0, 3)}.${firstname}${randomNo}@${
    company.split(" ")[0]
  }`.toLocaleLowerCase();
  return loginId;
};

export const generateRandomCode = (size: number = 8) => {
  const keys = [];
  for (let a = 0; a < size; a++) {
    const random = Math.floor((Math.random() * 100) % 26);
    if (a === 3 || a === 6) {
      const randomNumberTwo = Math.floor(
        (Math.random() * 100) % 10
      )?.toString();
      keys.push(randomNumberTwo);
    } else {
      keys.push(textSource.charAt(random));
    }
  }
  let code = keys?.reduce((prev, item) => {
    return prev + item;
  }, "");
  return code;
};

export function generateRandomNumber(numDigits: number): number {
  if (numDigits <= 0) {
    throw new Error("Number of digits must be greater than 0.");
  }

  // Calculate the range of possible numbers within the specified digits
  const min = Math.pow(10, numDigits - 1);
  const max = Math.pow(10, numDigits) - 1;

  // Generate a random number within the range
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
