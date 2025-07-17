import type { Option } from "./Option";

export type InputFieldConfig = {
  /**
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
   * @type string
   */
  default_value: string;
  /**
   * @type array
   */
  options?: Option[] | null;
};
