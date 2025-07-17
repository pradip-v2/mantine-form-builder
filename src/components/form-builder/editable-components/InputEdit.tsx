import { Input } from "@mantine/core";
import type { InputProps } from "@mantine/core";

interface InputEditProps extends InputProps {
  inputProps?: InputProps;
}

const InputEdit: React.FC<InputEditProps> = ({ inputProps }) => {
  return <Input placeholder="Enter text" {...inputProps} readOnly />;
};

export default InputEdit;
