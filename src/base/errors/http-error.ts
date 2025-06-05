export abstract class HttpError extends Error {
    constructor(message: string) {
      super(message);
      this.name = this.constructor.name;
      Object.setPrototypeOf(this, HttpError.prototype);
    }
  
    public abstract getStatusCode(): number;
  } 