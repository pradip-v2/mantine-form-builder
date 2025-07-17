export const typeD59EnumEnum = {
  text: "text",
  select: "select",
  multiselect: "multiselect",
  radio: "radio",
  checkbox: "checkbox",
  textarea: "textarea",
  date: "date",
  datetime: "datetime",
  heading: "heading",
} as const;

export type TypeD59EnumEnum =
  (typeof typeD59EnumEnum)[keyof typeof typeD59EnumEnum];

/**
 * @description * `text` - Text\n* `select` - Dropdown\n* `multiselect` - Multi-select\n* `radio` - Radio\n* `checkbox` - Checkbox\n* `textarea` - Textarea\n* `date` - Date\n* `datetime` - Datetime\n* `heading` - Heading
 */
export type TypeD59Enum = TypeD59EnumEnum;
