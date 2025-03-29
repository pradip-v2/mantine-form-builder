import {
  Button,
  Card,
  Checkbox,
  CloseButton,
  Fieldset,
  Flex,
  Grid,
  Input,
  MantineProvider,
  NumberInput,
  Select,
} from "@mantine/core";
import InputFieldsContainer from "./InputFieldsContainer";
import InputEdit from "./editable-components/InputEdit";
import { InputField } from "../types/InputField";
import ComponentEditWrapper from "./ComponentEditWrapper";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import cx from "clsx";
import { useListState } from "@mantine/hooks";
import { IconGripVertical, IconPlus } from "@tabler/icons-react";
import classes from "./DndListHandle.module.css";

interface FormBuilderProps {
  data: { fields: InputField[] };
  onChange: (value: { fields: InputField[] }) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  data: dataTemp,
  onChange,
}) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <MantineProvider>
      <Grid>
        <Grid.Col span={12}>Header</Grid.Col>
        <Grid.Col span={3}>
          {active !== null && (
            <FieldEditForm
              values={dataTemp.fields[active]}
              onChange={function (values: InputField): void {
                onChange({
                  fields: dataTemp.fields.map((field, index) => {
                    if (index === active) return values;
                    return field;
                  }),
                });
              }}
            />
          )}
        </Grid.Col>
        <Grid.Col span={9}>
          <InputFieldsContainer>
            {dataTemp?.fields?.map((field, inx) => {
              return (
                <ComponentEditWrapper
                  key={`field-${inx}`}
                  isActive={active === inx}
                  field={field}
                  onClick={() => {
                    setActive(inx);
                  }}
                >
                  {field?.type === "text" && <InputEdit />}
                  {field?.type === "select" && (
                    <SelectEdit selectProps={{ data: field.config.options }} />
                  )}
                </ComponentEditWrapper>
              );
            })}
          </InputFieldsContainer>
        </Grid.Col>
      </Grid>
    </MantineProvider>
  );
};

export default FormBuilder;

import React from "react";
import SelectEdit from "./editable-components/SelectEdit";

interface FieldEditFormProps {
  values: InputField;
  onChange: (values: InputField) => void;
}

const FieldEditForm: React.FC<FieldEditFormProps> = ({ values, onChange }) => {
  const [state, handlers] = useListState(values.config.options ?? []);

  useEffect(() => {
    onChange({ ...values, config: { ...values.config, options: state } });
  }, [state]);

  const items = state.map((item, index) => (
    <Draggable
      key={item.id.toString()}
      index={index}
      draggableId={item.id.toString()}
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
            <IconGripVertical size={18} stroke={1.5} />
          </div>
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
                        value: e.target.value,
                        label: e.target.value,
                      };
                    return option;
                  }),
                },
              });
            }}
          />
          <CloseButton
            onClick={() => {
              handlers.remove(index);
            }}
          />
        </div>
      )}
    </Draggable>
  ));

  return (
    <Card>
      <Flex direction={"column"} gap={"sm"}>
        <Input.Wrapper label={"Type"}>
          <Select
            data={[
              { value: "text", label: "Text" },
              { value: "select", label: "Dropdown" },
              { value: "radio", label: "Radio" },
            ]}
            value={values.type}
            clearable={false}
            onChange={(value: any) => {
              onChange({ ...values, type: value! });
            }}
          />
        </Input.Wrapper>
        {values.type === "select" && (
          <Fieldset legend={"Options"}>
            <Flex direction={"column"}>
              <DragDropContext
                onDragEnd={({ destination, source }) => {
                  handlers.reorder({
                    from: source.index,
                    to: destination?.index || 0,
                  });
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
                  handlers.append({
                    id: new Date().getTime(),
                    position: (values.config?.options ?? []).length + 1,
                    label:
                      "Option" + ((values.config?.options ?? []).length + 1),
                    value:
                      "Option" + ((values.config?.options ?? []).length + 1),
                  });
                }}
              >
                Add Option
              </Button>
            </Flex>
          </Fieldset>
        )}
        <Input.Wrapper label={"Label"}>
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
        <Input.Wrapper label={"Default Value"}>
          <Input
            value={values.config.defaultValue}
            onChange={(e) => {
              onChange({
                ...values,
                config: {
                  ...values.config,
                  defaultValue: e.target.value,
                },
              });
            }}
          />
        </Input.Wrapper>
      </Flex>
    </Card>
  );
};
