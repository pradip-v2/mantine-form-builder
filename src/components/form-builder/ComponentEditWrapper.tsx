import type { InputField } from "@/types";
import { Flex, Grid, Input, CloseButton, useMantineTheme } from "@mantine/core";
import { useHover } from "@mantine/hooks";

interface ComponentEditWrapperProps extends React.PropsWithChildren {
  field: InputField;
  isActive?: boolean;
  onClick: () => void;
  onDelete?: () => void;
}

const ComponentEditWrapper: React.FC<ComponentEditWrapperProps> = ({
  children,
  field,
  isActive = false,
  onClick,
  onDelete,
}) => {
  const theme = useMantineTheme();

  const { hovered, ref } = useHover();

  return (
    <Grid.Col ref={ref} span={field.config.span} onClick={onClick}>
      <Flex
        w={"100%"}
        h={"100%"}
        bd={hovered ? `1px solid ${theme.primaryColor}` : undefined}
        p={"sm"}
        bg={isActive ? theme.colors[theme.primaryColor][2] : undefined}
        pos="relative"
      >
        <Input.Wrapper
          withAsterisk={field.config.required}
          label={field.type !== "heading" ? field.config.label : undefined}
          h={"100%"}
          w={"100%"}
        >
          {children}
        </Input.Wrapper>
        {hovered && onDelete && (
          <CloseButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            pos="absolute"
            top={0}
            right={0}
            size="sm"
          />
        )}
      </Flex>
    </Grid.Col>
  );
};

export default ComponentEditWrapper;
