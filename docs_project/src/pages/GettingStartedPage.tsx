import { Container, Title, Text, Stack, Card, Code, Alert } from '@mantine/core'
import { Warning } from '@phosphor-icons/react'

export default function GettingStartedPage() {
  const installationCode = `npm install mantine-form-builder
# or
yarn add mantine-form-builder`

  const basicUsageCode = `import { FormBuilder } from 'mantine-form-builder'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

function App() {
  const handleSave = async (formData) => {
    console.log('Form data:', formData)
    // Handle form submission
  }

  const handleCancel = () => {
    console.log('Form cancelled')
  }

  return (
    <MantineProvider>
      <Notifications />
      <FormBuilder
        onSave={handleSave}
        onCancel={handleCancel}
        initialData={{
          title: "My Form",
          description: "A sample form",
          fields: []
        }}
      />
    </MantineProvider>
  )
}`

  const dependenciesCode = `{
  "dependencies": {
    "@mantine/core": "^8",
    "@mantine/dates": "^8",
    "@mantine/hooks": "^8",
    "@mantine/notifications": "^8",
    "@hello-pangea/dnd": "^18.0.1",
    "@phosphor-icons/react": "^2.1.10",
    "formik": "^2.4.6",
    "yup": "^1.6.1"
  }
}`

  return (
    <Container size="lg">
      <Stack gap="xl">
        <Stack gap="md">
          <Title>Getting Started</Title>
          <Text size="lg" c="dimmed">
            Learn how to install and use Mantine Form Builder in your React application.
          </Text>
        </Stack>

        {/* Installation */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>Installation</Title>
            <Text>
              Install the package using npm or yarn:
            </Text>
            <Code block>
              {installationCode}
            </Code>
            
            <Alert icon={<Warning size={16} />} title="Dependencies" color="blue">
              Make sure you have the required dependencies installed. The FormBuilder component
              requires Mantine UI components and other packages.
            </Alert>
            
            <Text fw={500}>Required Dependencies:</Text>
            <Code block>
              {dependenciesCode}
            </Code>
          </Stack>
        </Card>

        {/* Basic Usage */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>Basic Usage</Title>
            <Text>
              Here's a simple example of how to use the FormBuilder component:
            </Text>
            <Code block>
              {basicUsageCode}
            </Code>
          </Stack>
        </Card>

        {/* Props */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>Props</Title>
            
            <Stack gap="sm">
              <Text fw={500}>FormBuilder Props:</Text>
              <Stack gap="xs">
                <Text><Code>onSave</Code> - Function called when form is saved</Text>
                <Text><Code>onCancel</Code> - Function called when form is cancelled</Text>
                <Text><Code>initialData</Code> - Optional initial form data</Text>
              </Stack>
            </Stack>
          </Stack>
        </Card>

        {/* Next Steps */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>Next Steps</Title>
            <Text>
              Now that you have the basic setup, explore the examples to see different use cases
              and check the API reference for detailed prop documentation.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Container>
  )
} 