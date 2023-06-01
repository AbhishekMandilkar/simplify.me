import { ValidateEmail, validatePassword } from "lib/utils";

import { ILoginScreenContext } from "./interfaces";
import type { ILoginScreenComponentState } from "./interfaces";

export const ValidateForm = (
  value: ILoginScreenComponentState,
  validationType: ILoginScreenContext
) => {
  const object: any = {};
  let isValid = true;
  switch (validationType) {
    case ILoginScreenContext.LOGIN:
      if (!ValidateEmail(value.email)) {
        object.email = "Email is invalid";
        isValid = false;
      }
      if (validatePassword(value.password)) {
        object.password = validatePassword(value.password);
        isValid = false;
      }
      return { componentError: object, isValid };
    case ILoginScreenContext.REGISTER:
      return {};
    default:
      return {};
  }
};
