import { Flex, Grid, Input } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { InputField } from "../types/InputField";

interface ComponentEditWrapperProps extends React.PropsWithChildren {
  field: InputField;
  isActive?: boolean;
  onClick: () => void;
}

const ComponentEditWrapper: React.FC<ComponentEditWrapperProps> = ({
  children,
  field,
  isActive = false,
  onClick,
}) => {
  const { hovered, ref } = useHover();
  return (
    <Grid.Col ref={ref} span={field.config.span} onClick={onClick}>
      <Flex
        w={"100%"}
        h={"100%"}
        bd={hovered ? "1px solid red" : undefined}
        p={"sm"}
        bg={isActive ? "pink" : undefined}
      >
        <Input.Wrapper
          withAsterisk={field.config.required}
          label={field.config.label}
          h={"100%"}
          w={"100%"}
        >
          {children}
        </Input.Wrapper>
      </Flex>
    </Grid.Col>
  );
};

export default ComponentEditWrapper;
