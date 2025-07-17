import { Checkbox } from "@mantine/core";
import type { CheckboxProps } from "@mantine/core";

interface CheckboxEditProps extends CheckboxProps {
  CheckboxProps?: CheckboxProps;
}

const CheckboxEdit: React.FC<CheckboxEditProps> = ({ CheckboxProps }) => {
  return <Checkbox {...CheckboxProps} readOnly />;
};

export default CheckboxEdit;
