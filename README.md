# Mantine Form Builder

[![npm version](https://img.shields.io/npm/v/mantine-form-builder.svg)](https://www.npmjs.com/package/mantine-form-builder)
[![npm downloads](https://img.shields.io/npm/dm/mantine-form-builder.svg)](https://www.npmjs.com/package/mantine-form-builder)

A powerful, drag-and-drop form builder component built with [Mantine UI](https://mantine.dev/) and React. Create dynamic forms with ease using an intuitive visual interface.

📦 **Package**: [mantine-form-builder on npm](https://www.npmjs.com/package/mantine-form-builder)

## Features

- 🎨 **Built with Mantine UI** - Consistent design system and components
- 🖱️ **Drag & Drop Interface** - Intuitive form field reordering
- 📝 **Multiple Field Types** - Text, Select, Multi-select, Radio, Checkbox, Textarea, Date, DateTime, and Heading
- ⚡ **Real-time Preview** - See your form as you build it
- 🔧 **Field Configuration** - Customize labels, validation, and layout
- 📱 **Responsive Design** - Works on all screen sizes
- 🎯 **TypeScript Support** - Full type safety and IntelliSense
- 🔄 **Form Validation** - Built-in validation with Yup schema
- 📊 **Form Response Viewer** - Display submitted form responses

## Installation

```bash
npm install mantine-form-builder
# or
yarn add mantine-form-builder
# or
pnpm add mantine-form-builder
```

## Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install @mantine/core @mantine/dates @mantine/hooks @mantine/notifications @hello-pangea/dnd formik yup dayjs
```

## Quick Start

```tsx
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { FormBuilder } from 'mantine-form-builder';

function App() {
  return (
    <MantineProvider>
      <Notifications />
      <FormBuilder
        onSave={async (formData) => {
          console.log('Form saved:', formData);
          // Handle form save logic
        }}
        onCancel={() => {
          console.log('Form creation cancelled');
          // Handle cancel logic
        }}
      />
    </MantineProvider>
  );
}
```

## Basic Usage

### Creating a Form Builder

```tsx
import { FormBuilder } from 'mantine-form-builder';
import type { CustomFormRequest } from 'mantine-form-builder';

function MyFormBuilder() {
  const handleSave = async (formData: CustomFormRequest) => {
    try {
      // Save form to your backend
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('Form saved successfully!');
      }
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log('Form creation cancelled');
  };

  return (
    <FormBuilder
      onSave={handleSave}
      onCancel={handleCancel}
      initialData={{
        title: "My Custom Form",
        description: "A sample form",
        fields: []
      }}
    />
  );
}
```

### Viewing Form Responses

```tsx
import { ViewFormResponse } from 'mantine-form-builder';
import type { FormResponse } from 'mantine-form-builder';

function FormResponseViewer({ formResponse }: { formResponse: FormResponse }) {
  return <ViewFormResponse formResponse={formResponse} />;
}
```

## Field Types

The Form Builder supports the following field types:

| Field Type | Description | Configuration Options |
|------------|-------------|----------------------|
| `text` | Single line text input | Label, Required, Span, Default Value |
| `textarea` | Multi-line text input | Label, Required, Span, Default Value |
| `select` | Dropdown selection | Label, Required, Span, Options |
| `multiselect` | Multiple selection dropdown | Label, Required, Span, Options |
| `radio` | Radio button group | Label, Required, Span, Options |
| `checkbox` | Checkbox input | Label, Required, Span |
| `date` | Date picker | Label, Required, Span |
| `datetime` | Date and time picker | Label, Required, Span |
| `heading` | Section heading | Label, Heading Size, Span |

## API Reference

### FormBuilder Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSave` | `(formData: CustomFormRequest) => Promise<any>` | Yes | Callback function called when form is saved |
| `onCancel` | `() => void` | Yes | Callback function called when form creation is cancelled |
| `initialData` | `CustomFormRequest` | No | Initial form data to populate the builder |

### CustomFormRequest Type

```typescript
interface CustomFormRequest {
  title: string;                    // Form title (required)
  description?: string;             // Form description
  fields: InputFieldRequest[];      // Array of form fields
  is_shared?: boolean;              // Whether form is shared
  form_type?: FormTypeEnum;         // Form type (clinical/admin)
  created_by?: number | null;       // Creator ID
  updated_by?: number | null;       // Last updater ID
}
```

### InputField Type

```typescript
interface InputField {
  id: number;                       // Unique field ID
  index: number;                    // Field position
  type: TypeD59Enum;                // Field type
  config: InputFieldConfig;         // Field configuration
}
```

### InputFieldConfig Type

```typescript
interface InputFieldConfig {
  label: string;                    // Field label
  required: boolean;                // Whether field is required
  span: number;                     // Grid span (1-12)
  default_value?: string;           // Default value
  options?: Option[];               // Options for select/multiselect/radio
  label_size?: number;              // Heading size (1-6) for heading type
}
```

## Advanced Usage

### Pre-populating Form Data

```tsx
const initialFormData: CustomFormRequest = {
  title: "Employee Registration",
  description: "Register new employees",
  fields: [
    {
      id: 1,
      index: 0,
      type: "text",
      config: {
        label: "Full Name",
        required: true,
        span: 6,
        default_value: ""
      }
    },
    {
      id: 2,
      index: 1,
      type: "select",
      config: {
        label: "Department",
        required: true,
        span: 6,
        options: [
          { id: 1, index: 1, label: "Engineering", value: "engineering" },
          { id: 2, index: 2, label: "Marketing", value: "marketing" },
          { id: 3, index: 3, label: "Sales", value: "sales" }
        ]
      }
    }
  ]
};

<FormBuilder
  initialData={initialFormData}
  onSave={handleSave}
  onCancel={handleCancel}
/>
```

### Custom Validation

The Form Builder uses Yup for validation. You can extend the validation schema:

```tsx
import * as Yup from 'yup';

const customValidationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: Yup.string()
    .max(500, "Description must be less than 500 characters"),
  fields: Yup.array().min(1, "At least one field is required")
});
```

## Examples

Check out the [basic example](./examples/basic-mantine-form-builder) for a complete working implementation.

To run the example:

```bash
cd examples/basic-mantine-form-builder
npm install
npm run dev
```

## Styling

The Form Builder uses Mantine's theming system. You can customize the appearance by configuring your MantineProvider:

```tsx
import { MantineProvider } from '@mantine/core';

<MantineProvider
  theme={{
    colorScheme: 'light',
    primaryColor: 'blue',
    // Add your custom theme configuration
  }}
>
  <FormBuilder {...props} />
</MantineProvider>
```

## Browser Support

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Author

**Pradip Bankar**
- Email: pradipbankar0097@gmail.com
- GitHub: [@pradip-v2](https://github.com/pradip-v2)

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/pradip-v2/mantine-form-builder/issues) on GitHub.
