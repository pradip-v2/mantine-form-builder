import { Container, Title, Text, Stack, Card, Tabs, Button, Group } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { Check, X } from '@phosphor-icons/react'
import { FormBuilder } from 'mantine-form-builder'
import type { CustomFormRequest } from 'mantine-form-builder'

export default function ExamplesPage() {
  const handleSave = async (formData: CustomFormRequest) => {
    console.log('Form saved:', formData)
    showNotification({
      title: 'Success',
      message: 'Form saved successfully!',
      color: 'green',
      icon: <Check size={16} />,
    })
  }

  const handleCancel = () => {
    showNotification({
      title: 'Cancelled',
      message: 'Form editing was cancelled',
      color: 'yellow',
      icon: <X size={16} />,
    })
  }

  const sampleFormData: CustomFormRequest = {
    title: "Sample Contact Form",
    description: "A sample form with various field types",
    fields: [
      {
        id: 1,
        index: 0,
        type: "heading",
        config: {
          label: "Contact Information",
          required: false,
          span: 12,
          default_value: "",
          label_size: 2,
          options: undefined,
        }
      },
      {
        id: 2,
        index: 1,
        type: "text",
        config: {
          label: "Full Name",
          required: true,
          span: 6,
          default_value: "",
          options: undefined,
        }
      },
      {
        id: 3,
        index: 2,
        type: "text",
        config: {
          label: "Email",
          required: true,
          span: 6,
          default_value: "",
          options: undefined,
        }
      },
      {
        id: 4,
        index: 3,
        type: "select",
        config: {
          label: "Department",
          required: false,
          span: 6,
          default_value: "",
          options: [
            { id: 1, index: 1, label: "Sales", value: "sales" },
            { id: 2, index: 2, label: "Marketing", value: "marketing" },
            { id: 3, index: 3, label: "Engineering", value: "engineering" },
            { id: 4, index: 4, label: "Support", value: "support" },
          ],
        }
      },
      {
        id: 5,
        index: 4,
        type: "textarea",
        config: {
          label: "Message",
          required: true,
          span: 12,
          default_value: "",
          options: undefined,
        }
      },
      {
        id: 6,
        index: 5,
        type: "date",
        config: {
          label: "Preferred Contact Date",
          required: false,
          span: 6,
          default_value: "",
          options: undefined,
        }
      },
      {
        id: 7,
        index: 6,
        type: "checkbox",
        config: {
          label: "Subscribe to newsletter",
          required: false,
          span: 6,
          default_value: "",
          options: undefined,
        }
      }
    ]
  }

  return (
    <Container size="lg" px="xs">
      <Stack gap="xl">
        <Stack gap="md">
          <Title>Examples</Title>
          <Text size="lg" c="dimmed">
            Explore different examples and use cases of the FormBuilder component.
          </Text>
        </Stack>

        <Tabs defaultValue="basic" variant="pills">
          <Tabs.List style={{ flexWrap: 'wrap' }}>
            <Tabs.Tab value="basic">Basic Form</Tabs.Tab>
            <Tabs.Tab value="prefilled">Prefilled Form</Tabs.Tab>
            <Tabs.Tab value="empty">Empty Form</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="basic" pt="md">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Stack gap="md">
                <Title order={2}>Basic Form Builder</Title>
                <Text>
                  This example shows a form builder with some pre-configured fields.
                  Try adding, editing, and reordering fields to see how it works.
                </Text>
                <FormBuilder
                  onSave={handleSave}
                  onCancel={handleCancel}
                  initialData={sampleFormData}
                />
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="prefilled" pt="md">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Stack gap="md">
                <Title order={2}>Prefilled Form</Title>
                <Text>
                  This example shows how to start with a form that already has content.
                  The form comes with a title and description pre-filled.
                </Text>
                <FormBuilder
                  onSave={handleSave}
                  onCancel={handleCancel}
                  initialData={{
                    title: "My Custom Form",
                    description: "This is a form that was pre-filled with data",
                    fields: []
                  }}
                />
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="empty" pt="md">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <Stack gap="md">
                <Title order={2}>Empty Form</Title>
                <Text>
                  Start with a completely empty form and build it from scratch.
                  Use the "Add a field before" and "Add a field after" buttons to add new fields.
                </Text>
                <FormBuilder
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </Stack>
            </Card>
          </Tabs.Panel>
        </Tabs>

        {/* Instructions */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>How to Use</Title>
            <Stack gap="sm">
              <Text><strong>1.</strong> Click on any field to select and edit it</Text>
              <Text><strong>2.</strong> Use the sidebar to modify field properties</Text>
              <Text><strong>3.</strong> Add new fields using the "Add a field before/after" buttons</Text>
              <Text><strong>4.</strong> Drag and drop fields to reorder them</Text>
              <Text><strong>5.</strong> Click "Save" to see the form data in the console</Text>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
} 