import type {
  FormResponsesCreateMutationRequest,
  PatchedFormResponseRequest,
} from "@/api";
import { getError } from "@/utility/error-utility";
import {
  Grid,
  Flex,
  Button,
  Title,
  type TitleOrder,
  Radio,
  Group,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useFormik } from "formik";
import InputFieldsContainer from "../InputFieldsContainer";
import * as Yup from "yup";
import ComponentRenderWrapper from "./ComponentRenderWrapper";
import CustomInput from "@/components/shared/custom-input";
import CustomSelect from "@/components/shared/custom-select";
import CustomMultiselect from "@/components/shared/custom-multiselect";
import CustomCheckbox from "@/components/shared/custom-checkbox";
import CustomDateInput from "@/components/shared/custom-date-input";
import dayjs from "dayjs";
import LabelledDateTimeInputAMPM from "@/components/shared/custom-date-time-am-pm";
import CustomTextarea from "@/components/shared/custom-text-area";

const optionSchema = Yup.object().shape({
  id: Yup.number().required(),
  index: Yup.number().required(),
  label: Yup.string().required(),
  value: Yup.string().required(),
});

const configSchema = Yup.object().shape({
  label: Yup.string().required(),
  required: Yup.boolean().required(),
  span: Yup.number().required(),
  label_size: Yup.number().optional().nullable(),
  default_value: Yup.string().optional().nullable(),
  options: Yup.array().of(optionSchema).optional().nullable(),
});

const responseFieldSchema = Yup.object().shape({
  id: Yup.number().required(),
  index: Yup.number().required(),
  type: Yup.string()
    .oneOf([
      "text",
      "select",
      "textarea",
      "date",
      "datetime",
      "heading",
      "checkbox",
      "multiselect",
      "radio",
    ])
    .required(),
  config: configSchema.required(),
  response: Yup.mixed().when("config.required", {
    is: true,
    then: (schema) =>
      schema
        .required("Required field")
        .test(
          "is-valid-type",
          "Response must be a string, number, or boolean",
          (value) => ["string", "number", "boolean"].includes(typeof value)
        )
        .when("type", {
          is: "checkbox",
          then: (schema) => schema.oneOf(["true"], "Required field"),
          otherwise: (schema) => schema,
        }),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const validationSchema = Yup.object().shape({
  response_fields: Yup.array().of(responseFieldSchema).required(),
  form_assignment: Yup.number().required(),
});

interface RenderFormProps {
  title: string;
  initialData?: PatchedFormResponseRequest;
  onSave: (value: FormResponsesCreateMutationRequest) => Promise<any>;
  onCancel: () => void;
}

export const RenderForm: React.FC<RenderFormProps> = ({
  title,
  onSave,
  onCancel,
  initialData,
}) => {
  const formik = useFormik<FormResponsesCreateMutationRequest>({
    initialValues: {
      form_assignment: 0,
      response_fields: [],
      ...initialData,
    },
    validationSchema,
    onSubmit: async (values, formikHelpers) => {
      return onSave(values).catch((err) => {
        const { message, fieldErrors } = getError(err);

        showNotification({ message });
        if (fieldErrors) formikHelpers.setErrors(fieldErrors);
      });
    },
  });

  // console.log("errors", formik.errors);
  // console.log("values", formik.values);

  return (
    <Grid w={"100%"}>
      <Grid.Col span={12}>
        <Flex justify={"space-between"} align={"center"}>
          <Flex>{title}</Flex>
          <Flex direction={"row"} gap={"sm"}>
            <Button onClick={onCancel} variant="outline">
              Cancel
            </Button>
            <Button onClick={formik.submitForm}>Save</Button>
          </Flex>
        </Flex>
      </Grid.Col>
      <Grid.Col span={12}>
        <InputFieldsContainer>
          {formik.values?.response_fields?.map((field, inx) => {
            return (
              <ComponentRenderWrapper key={`field-${inx}`} field={field}>
                {field?.type === "heading" && (
                  <Title
                    order={
                      (field.config.label_size
                        ? 7 - field.config.label_size
                        : 3) as TitleOrder
                    }
                  >
                    {field.config.label}
                  </Title>
                )}
                {field?.type === "text" && (
                  <CustomInput
                    placeholder="Enter text"
                    withAsterisk
                    value={field.response}
                    onChange={(e: any) => {
                      formik.setFieldValue(
                        `response_fields.${inx}.response`,
                        e.target.value
                      );
                    }}
                    error={
                      (formik.errors.response_fields as any)?.[inx]?.response
                    }
                  />
                )}
                {field?.type === "select" && (
                  <CustomSelect
                    withAsterisk
                    placeholder="Select"
                    data={field.config.options ?? []}
                    value={field.response}
                    onChange={(value: any) => {
                      formik.setFieldValue(
                        `response_fields.${inx}.response`,
                        value
                      );
                    }}
                    error={
                      (formik.errors.response_fields as any)?.[inx]?.response
                    }
                  />
                )}
                {field?.type === "multiselect" && (
                  <CustomMultiselect
                    data={field.config.options ?? []}
                    placeholder="Select"
                    value={field.response ? field.response?.split(",") : []}
                    onChange={(value: any) => {
                      formik.setFieldValue(
                        `response_fields.${inx}.response`,
                        value?.join(",")
                      );
                    }}
                    error={
                      formik.touched.response_fields &&
                      (formik.errors.response_fields as any)?.[inx]?.response
                    }
                  />
                )}
                {field?.type === "checkbox" && (
                  <CustomCheckbox
                    label={
                      <Flex gap={"xs"}>
                        {field.config.required && <Text c={"red"}>*</Text>}
                        <Text size="sm" fw={600}>
                          {field.config.label}
                        </Text>
                      </Flex>
                    }
                    value={field.response == "true" ? true : false}
                    onChange={(e: any) => {
                      const value = e.currentTarget.checked;
                      formik.setFieldValue(
                        `response_fields.${inx}.response`,
                        value?.toString() ?? "false"
                      );
                    }}
                    error={
                      formik.touched.response_fields &&
                      (formik.errors.response_fields as any)?.[inx]?.response
                    }
                  />
                )}
                {field?.type === "radio" && (
                  <Radio.Group
                    value={field.response}
                    onChange={(value: any) => {
                      formik.setFieldValue(
                        `response_fields.${inx}.response`,
                        value
                      );
                    }}
                    error={
                      (formik.errors.response_fields as any)?.[inx]?.response
                    }
                  >
                    <Group mt="xs">
                      {field.config.options?.map((item) => (
                        <Radio value={item.value} label={item.label} />
                      ))}
                    </Group>
                  </Radio.Group>
                )}
                {field?.type === "date" && (
                  <CustomDateInput
                    name={field.id.toString()} // No use
                    placeholder="Select date"
                    value={
                      field.response
                        ? dayjs(field.response).format("MM/DD/YYYY")
                        : null
                    }
                    onChange={(value: any) => {
                      formik.setFieldValue(
                        `response_fields.${inx}.response`,
                        dayjs(value).format("YYYY-MM-DD")
                      );
                    }}
                  />
                )}
                {field?.type === "datetime" && (
                  <LabelledDateTimeInputAMPM
                    value={field.response ? dayjs(field.response).startOf("day").toDate() : null}
                    onChange={(value: any) => {
                      formik.setFieldValue(
                        `response_fields.${inx}.response`,
                        value?.toISOString()
                      );
                    }}
                    error={
                      (formik.errors.response_fields as any)?.[inx]?.response
                    }
                  />
                )}
                {field?.type === "textarea" && (
                  <CustomTextarea
                    placeholder="Enter text"
                    value={field.response}
                    onChange={(e: any) => {
                      formik.setFieldValue(
                        `response_fields.${inx}.response`,
                        e.target.value
                      );
                    }}
                    error={
                      (formik.errors.response_fields as any)?.[inx]?.response
                    }
                  />
                )}
              </ComponentRenderWrapper>
            );
          })}
        </InputFieldsContainer>
      </Grid.Col>
    </Grid>
  );
};
