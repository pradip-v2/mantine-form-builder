import type { InputFieldConfig } from "./InputFieldConfig.ts";
import type { TypeD59Enum } from "./TypeD59Enum.ts";

export type InputField = {
  /**
   * @type integer
   */
  id: number;
  /**
   * @type integer
   */
  index: number;
  /**
   * @description * `text` - Text\n* `select` - Dropdown\n* `multiselect` - Multi-select\n* `radio` - Radio\n* `checkbox` - Checkbox\n* `textarea` - Textarea\n* `date` - Date\n* `datetime` - Datetime\n* `heading` - Heading
   * @type string
   */
  type: TypeD59Enum;
  /**
   * @type object
   */
  config: InputFieldConfig;
};
