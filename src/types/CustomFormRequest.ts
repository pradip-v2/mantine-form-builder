import type { FormTypeEnum } from "./FormTypeEnum.ts";
import type { InputFieldRequest } from "./InputFieldRequest.ts";

/**
 * @description Base serializer for all models.
 */
export type CustomFormRequest = {
  /**
   * @type array
   */
  fields: InputFieldRequest[];
  /**
   * @minLength 1
   * @maxLength 255
   * @type string
   */
  title: string;
  /**
   * @type string | undefined
   */
  description?: string;
  /**
   * @type boolean | undefined
   */
  is_shared?: boolean;
  /**
   * @description * `clinical` - Clinical\n* `admin` - Admin
   * @type string | undefined
   */
  form_type?: FormTypeEnum;
  /**
   * @type integer
   */
  created_by?: number | null;
  /**
   * @type integer
   */
  updated_by?: number | null;
};
