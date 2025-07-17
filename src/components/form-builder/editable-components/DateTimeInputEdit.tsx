import { DateTimePicker, type DateTimePickerProps } from "@mantine/dates";

interface DateTimeInputEditProps extends DateTimePickerProps {}

const DateTimeInputEdit: React.FC<DateTimeInputEditProps> = () => {
  return <DateTimePicker value={null} onChange={function (): void {}} />;
};

export default DateTimeInputEdit;
