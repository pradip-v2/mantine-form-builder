import type { OptionRequest } from "./OptionRequest";

export type InputFieldConfigRequest = {
  /**
   * @minLength 1
   * @type string
   */
  label: string;
  /**
   * @type boolean
   */
  required: boolean;
  /**
   * @type integer
   */
  span: number;
  /**
   * @minLength 1
   * @maxLength 6
   * @type integer
   */
  label_size?: number | null;
  /**
   * @minLength 1
   * @type string
   */
  default_value: string;
  /**
   * @type array
   */
  options?: OptionRequest[] | null;
};
