export type OptionRequest = {
  /**
   * @type integer
   */
  id: number;
  /**
   * @type integer
   */
  index: number;
  /**
   * @minLength 1
   * @type string
   */
  label: string;
  /**
   * @minLength 1
   * @type string
   */
  value: string;
};
