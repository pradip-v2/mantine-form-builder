export const formTypeEnumEnum = {
  clinical: "clinical",
  admin: "admin",
} as const;

export type FormTypeEnumEnum =
  (typeof formTypeEnumEnum)[keyof typeof formTypeEnumEnum];

/**
 * @description * `clinical` - Clinical\n* `admin` - Admin
 */
export type FormTypeEnum = FormTypeEnumEnum;
