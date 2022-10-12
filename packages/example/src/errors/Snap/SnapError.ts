import { BaseError } from "../base";
import { mapErrorToUserFriendlyMessage } from "./messageMap";

export class SnapError extends BaseError {
  constructor(message: string) {
    const userFriendlyMessage = mapErrorToUserFriendlyMessage(message);
    super(userFriendlyMessage);
    this.name = '';
    this.message = message;
  }
}
