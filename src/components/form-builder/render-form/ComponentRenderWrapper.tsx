import type { InputField } from "@/api";
import { Flex, Grid, Input } from "@mantine/core";
import type React from "react";

interface ComponentRenderWrapperProps extends React.PropsWithChildren {
  field: InputField;
  error?: React.ReactNode;
}

const ComponentRenderWrapper: React.FC<ComponentRenderWrapperProps> = ({
  children,
  field,
  error,
}) => {
  return (
    <Grid.Col span={field.config.span}>
      <Flex w={"100%"} h={"100%"} p={"sm"}>
        <Input.Wrapper
          withAsterisk={field.type === "checkbox" ? false : field.config.required}
          label={
            ["heading", "checkbox"].includes(field.type)
              ? field.type === "checkbox"
                ? " "
                : undefined
              : field.config.label
          }
          labelProps={{
            style: { fontWeight: "bold" },
          }}
          h={"100%"}
          w={"100%"}
          error={error}
        >
          {children}
        </Input.Wrapper>
      </Flex>
    </Grid.Col>
  );
};

export default ComponentRenderWrapper;
