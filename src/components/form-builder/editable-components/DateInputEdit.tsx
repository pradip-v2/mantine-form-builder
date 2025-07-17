import { DateInput } from "@mantine/dates";
import type { DateInputProps } from "@mantine/dates";
import { CalendarBlankIcon } from "@phosphor-icons/react";

interface DateInputEditProps extends DateInputProps {
  DateInputProps?: DateInputProps;
}

const DateInputEdit: React.FC<DateInputEditProps> = ({ DateInputProps }) => {
  return <DateInput placeholder="Select date" rightSection={<CalendarBlankIcon size={20} />} {...DateInputProps} readOnly />;
};

export default DateInputEdit;
