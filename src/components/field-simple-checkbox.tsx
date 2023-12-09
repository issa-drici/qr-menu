'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Checkbox } from "./ui/checkbox";

interface FieldSimpleCheckboxProps {
  form: any
  name: string
  label: string
  description?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FieldSimpleCheckbox({ form, name, label, description, onChange }: FieldSimpleCheckboxProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(value) => {
                field.onChange(value)
                onChange(value)
              }}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              {label}
            </FormLabel>
            {description ? (
              <FormDescription>
                {description}
              </FormDescription>
            ) : null}
          </div>
        </FormItem>
      )}
    />
  )
}

