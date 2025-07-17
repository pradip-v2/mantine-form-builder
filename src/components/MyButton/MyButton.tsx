import { Button, type 
    ButtonProps } from '@mantine/core';

export interface MyButtonProps extends ButtonProps {
  highlight?: boolean;
}

export function MyButton({ highlight, ...props }: MyButtonProps) {
  return (
    <Button
      {...props}
      bg={"orange"}
    />
  );
} 