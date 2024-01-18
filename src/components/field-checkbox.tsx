'use client';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "./ui/checkbox";

interface FieldCheckboxProps {
  form: any
  name: string
  label: string
  description?: string
  items: Array<{ label: string, id: string }>
}


export default function FieldCheckbox({ form, name, label, description, onChange, items }: FieldCheckboxProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel>{label}</FormLabel>
            {description ? <FormDescription>
              {description}
            </FormDescription> : null}
          </div>
          {items.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        disabled={field.value.length === 1 && form.getValues('languages')[0] === item.id}
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (onChange) {
                            if (checked) {
                              onChange([...field.value, item.id])
                            } else {
                              onChange(field.value?.filter(
                                (value) => value !== item.id
                              ))
                            }
                          }

                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                              field.value?.filter(
                                (value) => value !== item.id
                              )
                            )
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                )
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}