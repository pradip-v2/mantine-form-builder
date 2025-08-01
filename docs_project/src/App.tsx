import { AppShell, Group, Text, UnstyledButton, Burger, Drawer, Stack } from '@mantine/core'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { House, BookOpen, Code, Play } from '@phosphor-icons/react'
import { useDisclosure } from '@mantine/hooks'
import HomePage from './pages/HomePage.tsx'
import GettingStartedPage from './pages/GettingStartedPage.tsx'
import ExamplesPage from './pages/ExamplesPage.tsx'
import ApiPage from './pages/ApiPage.tsx'

const navigation = [
  { label: 'Home', icon: House, path: '/' },
  { label: 'Getting Started', icon: BookOpen, path: '/getting-started' },
  { label: 'Examples', icon: Play, path: '/examples' },
  { label: 'API Reference', icon: Code, path: '/api' },
]

function App() {
  const location = useLocation()
  const [opened, { toggle, close }] = useDisclosure()

  const NavigationItems = () => (
    <>
      <AppShell.Section>
        <Text size="lg" fw={600} mb="md">
          Documentation
        </Text>
      </AppShell.Section>
      
      <AppShell.Section grow>
        {navigation.map((item) => (
          <UnstyledButton
            key={item.path}
            component={Link}
            to={item.path}
            onClick={close}
            sx={(theme: any) => ({
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color: location.pathname === item.path ? theme.white : theme.colors.gray[7],
              backgroundColor: location.pathname === item.path ? theme.colors.blue[6] : 'transparent',
              '&:hover': {
                backgroundColor: location.pathname === item.path 
                  ? theme.colors.blue[6] 
                  : theme.colors.gray[0],
              },
            })}
          >
            <Group>
              <item.icon size={20} />
              <Text size="sm">{item.label}</Text>
            </Group>
          </UnstyledButton>
        ))}
      </AppShell.Section>
    </>
  )

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'md' }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Text size="xl" fw={700} c="blue">
            Mantine Form Builder
          </Text>
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md" visibleFrom="md">
        <NavigationItems />
      </AppShell.Navbar>

      <Drawer opened={opened} onClose={close} size="300px" title="Navigation" hiddenFrom="md">
        <Stack p="md">
          <NavigationItems />
        </Stack>
      </Drawer>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/getting-started" element={<GettingStartedPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="/api" element={<ApiPage />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  )
}

export default App 