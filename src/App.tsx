// core styles are required for all packages
import "@mantine/core/styles.css";

// other css files are required only if
// you are using components from the corresponding package
import "@mantine/dates/styles.css";
import FormBuilder from "./components/FormBuilder";
import { MantineProvider } from "@mantine/core";
import { useState } from "react";
import { InputField } from "./types/InputField";
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...

const INITIAL_DATA: { fields: InputField[] } = {
  fields: [
    {
      type: "text",
      config: {
        required: true,
        label: "One",
        span: 3,
        defaultValue: "hello",
      },
    },
    {
      type: "text",
      config: {
        label: "Two",
        required: true,
        span: 6,
        defaultValue: "hello",
      },
    },
    {
      type: "select",
      config: {
        label: "Three",
        required: false,
        span: 3,
        defaultValue: "hello",
        options: [
          {
            value: "hello",
            label: "Hello",
            id: 1,
            position: 1,
          },
          {
            value: "bye",
            label: "Bye",
            id: 2,
            position: 2,
          },
        ],
      },
    },
  ],
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);

  return (
    <MantineProvider>
      <FormBuilder data={data} onChange={setData} />
    </MantineProvider>
  );
}

export default App;
