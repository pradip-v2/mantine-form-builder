import { Container, Title, Text, Stack, Card, Table, Code, Badge } from '@mantine/core'

export default function ApiPage() {
  return (
    <Container size="lg">
      <Stack gap="xl">
        <Stack gap="md">
          <Title>API Reference</Title>
          <Text size="lg" c="dimmed">
            Complete API documentation for the FormBuilder component and related types.
          </Text>
        </Stack>

        {/* FormBuilder Props */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>FormBuilder Props</Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Prop</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Required</Table.Th>
                  <Table.Th>Description</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td><Code>onSave</Code></Table.Td>
                  <Table.Td><Code>(value: CustomFormRequest) =&gt; Promise&lt;any&gt;</Code></Table.Td>
                  <Table.Td><Badge color="red">Yes</Badge></Table.Td>
                  <Table.Td>Function called when the form is saved</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Code>onCancel</Code></Table.Td>
                  <Table.Td><Code>() =&gt; void</Code></Table.Td>
                  <Table.Td><Badge color="red">Yes</Badge></Table.Td>
                  <Table.Td>Function called when the form is cancelled</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Code>initialData</Code></Table.Td>
                  <Table.Td><Code>CustomFormRequest</Code></Table.Td>
                  <Table.Td><Badge color="gray">No</Badge></Table.Td>
                  <Table.Td>Initial form data to populate the builder</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Stack>
        </Card>

        {/* Types */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>Types</Title>
            
            <Stack gap="lg">
              <div>
                <Title order={3}>CustomFormRequest</Title>
                <Text size="sm" c="dimmed" mb="sm">The main form data structure</Text>
                <Code block>
{`interface CustomFormRequest {
  title: string;
  description: string;
  fields: InputField[];
}`}
                </Code>
              </div>

              <div>
                <Title order={3}>InputField</Title>
                <Text size="sm" c="dimmed" mb="sm">Represents a single form field</Text>
                <Code block>
{`interface InputField {
  id: number;
  index: number;
  type: string;
  config: InputFieldConfig;
}`}
                </Code>
              </div>

              <div>
                <Title order={3}>InputFieldConfig</Title>
                <Text size="sm" c="dimmed" mb="sm">Configuration for a form field</Text>
                <Code block>
{`interface InputFieldConfig {
  label: string;
  required: boolean;
  span: number;
  default_value: string;
  options?: Option[];
  label_size?: number; // For heading type
}`}
                </Code>
              </div>

              <div>
                <Title order={3}>Option</Title>
                <Text size="sm" c="dimmed" mb="sm">Option for select, multiselect, and radio fields</Text>
                <Code block>
{`interface Option {
  id: number;
  index: number;
  label: string;
  value: string;
}`}
                </Code>
              </div>
            </Stack>
          </Stack>
        </Card>

        {/* Field Types */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>Supported Field Types</Title>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Supports Options</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td><Code>text</Code></Table.Td>
                  <Table.Td>Single line text input</Table.Td>
                  <Table.Td><Badge color="gray">No</Badge></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Code>textarea</Code></Table.Td>
                  <Table.Td>Multi-line text input</Table.Td>
                  <Table.Td><Badge color="gray">No</Badge></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Code>select</Code></Table.Td>
                  <Table.Td>Dropdown selection</Table.Td>
                  <Table.Td><Badge color="green">Yes</Badge></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Code>multiselect</Code></Table.Td>
                  <Table.Td>Multiple selection dropdown</Table.Td>
                  <Table.Td><Badge color="green">Yes</Badge></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Code>radio</Code></Table.Td>
                  <Table.Td>Radio button group</Table.Td>
                  <Table.Td><Badge color="green">Yes</Badge></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Code>checkbox</Code></Table.Td>
                  <Table.Td>Checkbox input</Table.Td>
                  <Table.Td><Badge color="gray">No</Badge></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Code>date</Code></Table.Td>
                  <Table.Td>Date picker</Table.Td>
                  <Table.Td><Badge color="gray">No</Badge></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Code>datetime</Code></Table.Td>
                  <Table.Td>Date and time picker</Table.Td>
                  <Table.Td><Badge color="gray">No</Badge></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td><Code>heading</Code></Table.Td>
                  <Table.Td>Section heading</Table.Td>
                  <Table.Td><Badge color="gray">No</Badge></Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
          </Stack>
        </Card>

        {/* Validation */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>Validation</Title>
            <Text>
              The FormBuilder uses Yup for form validation. The following validation rules are applied:
            </Text>
            <Stack gap="sm">
              <Text><Code>title</Code> - Required string</Text>
              <Text><Code>description</Code> - Optional string</Text>
              <Text><Code>fields</Code> - Array of InputField objects</Text>
              <Text><Code>fields[].config.label</Code> - Required string</Text>
              <Text><Code>fields[].config.span</Code> - Number between 1 and 12</Text>
              <Text><Code>fields[].config.options[].label</Code> - Required string</Text>
              <Text><Code>fields[].config.options[].value</Code> - Required string</Text>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
} 