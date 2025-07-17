import { Group, Radio } from "@mantine/core";
import type { ComboboxItem, RadioGroupProps } from "@mantine/core";

interface RadioEditProps {
  data: ComboboxItem[];
  radioGroupProps?: RadioGroupProps;
}

const RadioEdit: React.FC<RadioEditProps> = ({ radioGroupProps, data }) => {
  return (
    <Radio.Group {...radioGroupProps}>
      <Group mt="xs">
        {data?.map((item) => <Radio value={item.value} label={item.label} />)}
      </Group>
    </Radio.Group>
  );
};

export default RadioEdit;
