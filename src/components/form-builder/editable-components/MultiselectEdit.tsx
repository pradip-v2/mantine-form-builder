import { MultiSelect } from "@mantine/core";
import type { MultiSelectProps } from "@mantine/core";

interface MultiSelectEditProps {
  MultiSelectProps?: MultiSelectProps;
}

const MultiSelectEdit: React.FC<MultiSelectEditProps> = ({
  MultiSelectProps,
}) => {
  return <MultiSelect {...MultiSelectProps} />;
};

export default MultiSelectEdit;
