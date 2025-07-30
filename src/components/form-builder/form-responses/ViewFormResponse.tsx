import { Flex, Grid, Text, Title, type TitleOrder } from "@mantine/core";
import type { FormResponse } from "@/types";
import dayjs from "dayjs";

interface ViewFormResponseProps {
  formResponse: FormResponse;
}

const ViewFormResponse: React.FC<ViewFormResponseProps> = ({
  formResponse,
}) => {
  return (
    <Grid w={"100%"}>
      {/* <Grid.Col span={12}>
        <Flex justify={"space-between"} align={"center"}>
          <Flex>
            <Title order={3}>
              {formResponse.form_assignment_data.custom_form_data.title}
            </Title>
          </Flex>
        </Flex>
      </Grid.Col> */}
      {formResponse?.response_fields?.map((field, inx) => {
        return (
          <Grid.Col key={`field-${inx}`} span={field?.config?.span ?? 12}>
            <Flex direction={"column"} gap={"xs"}>
              <Flex>
                <Title
                  order={
                    (field.config.label_size
                      ? 7 - field.config.label_size
                      : 4) as TitleOrder // Default to 4 if field is not heading type
                  }
                >
                  {field.config.label}
                </Title>
              </Flex>
              <Flex>
                <Text>
                  {field?.type === "text" && field.response}
                  {field?.type === "textarea" && field.response}
                  {field?.type === "select" &&
                    field.config?.options?.find(
                      (option) => option.value === field.response
                    )?.label}
                  {field?.type === "checkbox" &&
                    (field.response ? "Yes" : "No")}
                  {field?.type === "radio" &&
                    field.config?.options?.find(
                      (option) => option.value === field.response
                    )?.label}
                  {field?.type === "date" &&
                    (field.response
                      ? dayjs(field.response).format("MM/DD/YYYY")
                      : "-")}
                  {field?.type === "datetime" &&
                    (field.response
                      ? dayjs(field.response).format("MM/DD/YYYY HH:mm A")
                      : "-")}
                  {field.type === "multiselect" &&
                    field.response
                      ?.split(",")
                      .map((item: string, idx: number) => (
                        <Text
                          key={`multiselect-${inx}-${idx}`}
                          component="span"
                        >
                          {
                            field.config?.options?.find(
                              (option) => option.value === item
                            )?.label
                          }
                          {idx < field.response.split(",").length - 1
                            ? ", "
                            : ""}
                        </Text>
                      ))}
                </Text>
              </Flex>
            </Flex>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};

export default ViewFormResponse;
