import { Textarea } from "@mantine/core";
import type { TextareaProps } from "@mantine/core";

interface TextareaEditProps extends TextareaProps {
  textareaProps?: TextareaProps;
}

const TextareaEdit: React.FC<TextareaEditProps> = ({ textareaProps }) => {
  return <Textarea placeholder="Enter text" {...textareaProps} readOnly />;
};

export default TextareaEdit;
