import { Grid } from "@mantine/core";

interface InputFieldsContainerProps extends React.PropsWithChildren {}

const InputFieldsContainer: React.FC<InputFieldsContainerProps> = ({
  children,
}) => {
  return <Grid>{children}</Grid>;
};

export default InputFieldsContainer;
