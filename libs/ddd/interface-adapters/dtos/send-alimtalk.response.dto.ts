export class SendAlimtalkResponse {
  constructor(isSent: boolean, message?: string) {
    this.isSent = isSent;
    this.message = message;
  }

  readonly isSent: boolean;

  readonly message?: string;
}
