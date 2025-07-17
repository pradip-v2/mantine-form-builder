import { Flex } from "@mantine/core";
import { FormBuilder } from "mantine-form-builder";

function App() {
  return (
    <Flex h="100vh" w="100vw">
      <FormBuilder
        onSave={async (value) => {
          console.log(value);
        }}
        onCancel={() => {
          console.log("cancel");
        }}
      />
    </Flex>
  );
}

export default App;
