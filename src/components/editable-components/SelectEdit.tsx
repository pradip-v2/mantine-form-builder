import { Select, SelectProps } from "@mantine/core";

interface SelectEditProps {
  selectProps?: SelectProps;
}

const SelectEdit: React.FC<SelectEditProps> = ({ selectProps }) => {
  return <Select {...selectProps} />;
};

export default SelectEdit;
