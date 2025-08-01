import {
  Button,
  Card,
  Checkbox,
  CloseButton,
  Fieldset,
  Flex,
  Grid,
  Input,
  NumberInput,
  Select,
  Title,
  type TitleOrder,
  TextInput,
} from "@mantine/core";
import InputFieldsContainer from "./InputFieldsContainer";
import InputEdit from "./editable-components/InputEdit";
import ComponentEditWrapper from "./ComponentEditWrapper";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import cx from "clsx";
import {
  DotsSixVerticalIcon as IconGripVertical,
  PlusIcon as IconPlus,
} from "@phosphor-icons/react";
import React from "react";
import SelectEdit from "./editable-components/SelectEdit";
import classes from "./DndListHandle.module.css";
import type { CustomFormRequest, InputField } from "@/types";
import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";

import { getError } from "@/utility/error-utility";
import MultiSelectEdit from "./editable-components/MultiselectEdit";
import RadioEdit from "./editable-components/RadioEdit";
import TextareaEdit from "./editable-components/TextareaEdit";
import DateInputEdit from "./editable-components/DateInputEdit";
import DateTimeInputEdit from "./editable-components/DateTimeInputEdit";
import { reorder } from "@/utility/array-utility";

interface FormBuilderProps {
  initialData?: CustomFormRequest;
  onSave: (value: CustomFormRequest) => Promise<any>;
  onCancel: () => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  onSave,
  onCancel,
  initialData,
}) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <Formik<CustomFormRequest>
      initialValues={{
        title: "",
        description: "",
        fields: [],
        ...initialData,
      }}
      validationSchema={Yup.object({
        title: Yup.string().required("Title is required"),
        description: Yup.string(),
        fields: Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.number().required(),
              index: Yup.number().required(),
              type: Yup.string().required(),
              config: Yup.object().shape({
                label: Yup.string().required("Label is required"),
                required: Yup.boolean(),
                span: Yup.number().min(1).max(12),
                default_value: Yup.string(),
                options: Yup.array()
                  .of(
                    Yup.object().shape({
                      id: Yup.number().required(),
                      index: Yup.number().required(),
                      label: Yup.string().required("Label is required"),
                      value: Yup.string().required("Value is required"),
                    })
                  )
                  .optional()
                  .nullable(),
              }),
            })
          )
          .optional(),
      })}
      onSubmit={async (values, formikHelpers) => {
        return onSave(values).catch((err) => {
          const { fieldErrors } = getError(err);

          if (fieldErrors) formikHelpers.setErrors(fieldErrors);
        });
      }}
    >
      {(formik) => {
        return (
          <Grid w={"100%"}>
            <Grid.Col span={12}>
              <Flex justify={"space-between"} align={"center"}>
                <Flex gap={"md"} align={"center"}>
                  <TextInput
                    value={formik.values.title}
                    label={"Title"}
                    withAsterisk
                    error={formik.touched.title && formik.errors.title}
                    onChange={(e: any) => {
                      formik.setValues({
                        ...formik.values,
                        title: e.target.value,
                      });
                    }}
                    placeholder="Enter title"
                  />
                </Flex>
                <Flex direction={"row"} gap={"sm"}>
                  <Button onClick={onCancel} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={formik.submitForm}>Save</Button>
                </Flex>
              </Flex>
            </Grid.Col>
            <Grid.Col span={3}>
              <Flex direction={"column"} gap={"sm"}>
                <Button
                  onClick={() => {
                    formik.setValues((prev) => {
                      prev.fields.splice(active ?? 0, 0, {
                        id: new Date().getTime(),
                        index: (active ?? 1) - 1,
                        type: "text",
                        config: {
                          label: "Label",
                          required: false,
                          span: 3,
                          default_value: "default value",
                          options: undefined,
                        },
                      });
                      return { ...prev };
                    });
                  }}
                >
                  Add a field before
                </Button>
                {active !== null && (
                  <FieldEditForm
                    fieldIndex={active}
                    fieldId={formik.values.fields[active].id}
                    values={formik.values.fields[active]}
                    onChange={function (values: InputField): void {
                      formik.setValues({
                        ...formik.values,
                        fields: formik.values.fields.map((field, index) => {
                          if (index === active) return values;
                          return field;
                        }),
                      });
                    }}
                  />
                )}
                <Button
                  onClick={() => {
                    formik.setValues((prev) => {
                      prev.fields.splice(active !== null ? active + 1 : 0, 0, {
                        id: new Date().getTime(),
                        index: (active ?? 1) - 1,
                        type: "text",
                        config: {
                          label: "Label",
                          required: false,
                          span: 3,
                          default_value: "default value",
                          options: undefined,
                        },
                      });
                      return { ...prev };
                    });
                  }}
                >
                  Add a field after
                </Button>
              </Flex>
            </Grid.Col>
            <Grid.Col span={9}>
              <InputFieldsContainer>
                {formik.values?.fields?.map((field, inx) => {
                  return (
                    <ComponentEditWrapper
                      key={`field-${inx}`}
                      isActive={active === inx}
                      field={field}
                      onClick={() => {
                        setActive(inx);
                      }}
                      onDelete={() => {
                        formik.setValues({
                          ...formik.values,
                          fields: formik.values.fields.filter(
                            (_, index) => index !== inx
                          ),
                        });
                        if (active === inx) {
                          setActive(null);
                        }
                      }}
                    >
                      {field?.type === "text" && <InputEdit />}
                      {field?.type === "select" && (
                        <SelectEdit
                          selectProps={{
                            data: field.config.options ?? [],
                            placeholder: "Select",
                          }}
                        />
                      )}
                      {field?.type === "multiselect" && (
                        <MultiSelectEdit
                          MultiSelectProps={{
                            data: field.config.options ?? [],
                            placeholder: "Select",
                          }}
                        />
                      )}
                      {field?.type === "radio" && (
                        <RadioEdit data={field.config.options ?? []} />
                      )}
                      {field?.type === "checkbox" && <Checkbox />}
                      {field?.type === "textarea" && <TextareaEdit />}
                      {field?.type === "date" && <DateInputEdit />}
                      {field?.type === "datetime" && <DateTimeInputEdit />}
                      {field?.type === "heading" && (
                        <Title
                          order={
                            (7 - (field.config.label_size ?? 3)) as TitleOrder
                          }
                        >
                          {field.config.label}
                        </Title>
                      )}
                    </ComponentEditWrapper>
                  );
                })}
              </InputFieldsContainer>
            </Grid.Col>
          </Grid>
        );
      }}
    </Formik>
  );
};

export default FormBuilder;

interface FieldEditFormProps {
  fieldIndex: number;
  fieldId: number;
  values: InputField;
  onChange: (values: InputField) => void;
}

const FieldEditForm: React.FC<FieldEditFormProps> = ({
  fieldIndex,
  fieldId,
  values,
  onChange,
}) => {
  const formik = useFormikContext<CustomFormRequest>();

  const items =
    values.config.options?.map((item, index) => (
      <Draggable
        key={item.id.toString()}
        index={index}
        draggableId={item.index.toString()}
      >
        {(provided, snapshot) => (
          <div
            className={cx(classes.item, {
              [classes.itemDragging]: snapshot.isDragging,
            })}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div {...provided.dragHandleProps} className={classes.dragHandle}>
              <IconGripVertical size={18} />
            </div>
            <Input.Wrapper
              error={
                (formik.touched.fields?.[fieldIndex] as any)?.config?.options?.[
                  index
                ]?.label &&
                (formik.errors.fields?.[fieldIndex] as any)?.config?.options?.[
                  index
                ]?.label
              }
            >
              <Input
                placeholder="Value"
                value={values.config?.options?.[index]?.label ?? ""}
                onChange={(e) => {
                  onChange({
                    ...values,
                    config: {
                      ...values.config,
                      options: values.config?.options?.map((option, inx) => {
                        if (inx === index)
                          return {
                            ...option,
                            value: `${e.target.value} ${index + 1}`,
                            label: e.target.value,
                          };
                        return option;
                      }),
                    },
                  });
                }}
              />
            </Input.Wrapper>
            <CloseButton
              onClick={() => {
                const prev = { ...values };
                prev.config.options = prev.config.options?.filter(
                  (option) => option.id !== item.id
                );
                onChange(prev);
              }}
            />
          </div>
        )}
      </Draggable>
    )) ?? [];

  return (
    <Card withBorder key={`field-edit-${fieldId}`}>
      <Flex direction={"column"} gap={"sm"}>
        <Input.Wrapper label={"Type"}>
          <Select
            data={[
              { value: "text", label: "Text" },
              { value: "select", label: "Dropdown" },
              { value: "multiselect", label: "Multi-select" },
              { value: "radio", label: "Radio" },
              { value: "checkbox", label: "Checkbox" },
              { value: "textarea", label: "Textarea" },
              { value: "date", label: "Date" },
              { value: "datetime", label: "Datetime" },
              { value: "heading", label: "Heading" },
            ]}
            value={values.type}
            clearable={false}
            onChange={(value: any) => {
              onChange({ ...values, type: value! });
            }}
          />
        </Input.Wrapper>
        {["select", "multiselect", "radio"].includes(values.type) && (
          <Fieldset legend={"Options"}>
            <Flex direction={"column"}>
              <DragDropContext
                onDragEnd={({ destination, source }) => {
                  const prev = { ...values };
                  prev.config.options = reorder(
                    values.config.options ?? [],
                    source.index,
                    destination?.index ?? 0
                  );
                  onChange(prev);
                }}
              >
                <Droppable droppableId="dnd-list" direction="vertical">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {items}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <Button
                leftSection={<IconPlus />}
                onClick={() => {
                  onChange({
                    ...values,
                    config: {
                      ...values.config,
                      options: [
                        ...(values.config?.options ?? []),
                        {
                          id: new Date().getTime(),
                          index: (values.config?.options ?? []).length + 1,
                          label: "",
                          value:
                            "Option" +
                            ((values.config?.options ?? []).length + 1),
                        },
                      ],
                    },
                  });
                }}
              >
                Add Option
              </Button>
            </Flex>
          </Fieldset>
        )}
        <Input.Wrapper
          label={"Label"}
          error={
            formik.touched.fields?.[fieldIndex]?.config?.label &&
            (formik.errors.fields?.[fieldIndex] as any)?.config?.label
          }
        >
          <Input
            value={values.config.label}
            onChange={(e) => {
              onChange({
                ...values,
                config: { ...values.config, label: e.target.value },
              });
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper>
          <Checkbox
            label={"Required"}
            checked={values.config.required}
            onChange={(e) => {
              onChange({
                ...values,
                config: { ...values.config, required: e.target.checked },
              });
            }}
          />
        </Input.Wrapper>
        <Input.Wrapper label={"Size"}>
          <NumberInput
            min={1}
            max={12}
            defaultValue={3}
            value={values.config.span}
            onChange={(e) => {
              onChange({
                ...values,
                config: {
                  ...values.config,
                  span: typeof e === "number" ? e : 1,
                },
              });
            }}
          />
        </Input.Wrapper>
        {values.type === "heading" && (
          <Input.Wrapper label={"Heading Size"}>
            <NumberInput
              min={1}
              max={6}
              defaultValue={3}
              value={values.config.label_size ?? ""}
              onChange={(e) => {
                onChange({
                  ...values,
                  config: {
                    ...values.config,
                    label_size: typeof e === "number" ? e : 1,
                  },
                });
              }}
            />
          </Input.Wrapper>
        )}
        {/* <Input.Wrapper label={"Default Value"}>
          <Input
            value={values.config.default_value}
            onChange={(e) => {
              onChange({
                ...values,
                config: {
                  ...values.config,
                  default_value: e.target.value,
                },
              });
            }}
          />
        </Input.Wrapper> */}
      </Flex>
    </Card>
  );
};
