import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// core styles are required for all packages
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

// other css files are required only if
// you are using components from the corresponding package
import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={{}}>
    <App />
    </MantineProvider>
  </StrictMode>,
)
