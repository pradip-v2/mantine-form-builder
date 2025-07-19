import {
  Container,
  Title,
  Text,
  Stack,
  Card,
  Group,
  Badge,
  Button,
} from "@mantine/core";
import { ArrowRight, Star, Download, GithubLogo } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Container size="lg" px="xs">
      <Stack gap="xl">
        {/* Hero Section */}
        <Stack gap="md" ta="center">
          <Title
            size="h1"
            fw={900}
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            Mantine Form Builder
          </Title>
          <Text
            size="xl"
            c="dimmed"
            maw={600}
            mx="auto"
            style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
          >
            A powerful, drag-and-drop form builder component built with React,
            TypeScript, and Mantine UI. Create dynamic forms with ease and
            style.
          </Text>
          <Group justify="center" gap="md" wrap="wrap">
            <Button
              size="lg"
              leftSection={<Download size={20} />}
              component={Link}
              to="/getting-started"
              onClick={(e) => {
                e.preventDefault();
                navigate("/getting-started");
              }}
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              leftSection={<GithubLogo size={20} />}
              component="a"
              href="https://github.com/pradip-v2/mantine-form-builder"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </Button>
          </Group>
        </Stack>

        {/* Features */}
        <Stack gap="lg">
          <Title order={2} ta="center">
            Features
          </Title>
          <Group gap="md" wrap="wrap">
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ flex: 1, minWidth: 280 }}
            >
              <Stack gap="sm">
                <Badge color="blue" variant="light">
                  Drag & Drop
                </Badge>
                <Title order={3}>Intuitive Interface</Title>
                <Text size="sm" c="dimmed">
                  Build forms using a visual drag-and-drop interface. Add,
                  remove, and reorder fields with ease.
                </Text>
              </Stack>
            </Card>

            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ flex: 1, minWidth: 280 }}
            >
              <Stack gap="sm">
                <Badge color="green" variant="light">
                  Multiple Field Types
                </Badge>
                <Title order={3}>Rich Components</Title>
                <Text size="sm" c="dimmed">
                  Support for text, select, multiselect, radio, checkbox,
                  textarea, date, datetime, and heading fields.
                </Text>
              </Stack>
            </Card>

            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              style={{ flex: 1, minWidth: 280 }}
            >
              <Stack gap="sm">
                <Badge color="purple" variant="light">
                  TypeScript
                </Badge>
                <Title order={3}>Type Safe</Title>
                <Text size="sm" c="dimmed">
                  Built with TypeScript for better development experience and
                  type safety.
                </Text>
              </Stack>
            </Card>
          </Group>
        </Stack>

        {/* Quick Start */}
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2}>Quick Start</Title>
            <Text>
              Get up and running with Mantine Form Builder in minutes. Follow
              our getting started guide to create your first dynamic form.
            </Text>
            <Button rightSection={<ArrowRight size={16} />} variant="light">
              Read Documentation
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
