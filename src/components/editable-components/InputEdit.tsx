import { Input, InputProps } from "@mantine/core";

interface InputEditProps extends InputProps {
  inputProps?: InputProps;
}

const InputEdit: React.FC<InputEditProps> = ({ inputProps }) => {
  return <Input {...inputProps} readOnly />;
};

export default InputEdit;
