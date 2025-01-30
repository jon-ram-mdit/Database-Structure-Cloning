const errorMessages = {
  INVALID_ID: "INVALID ID",
  DATABASE_DUPLICATE: "ENTITY ALREADY EXISTS, DUPLICATE ERROR",
  DATA_NOT_FOUND: "NO DATA FOUND",
};

export class ErrorGenerator {
  message = "Something Went Wrong";
  constructor(message: string) {
    this.message = message;
  }
}

export default errorMessages;
