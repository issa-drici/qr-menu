'use client';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FieldInputProps {
    form: any
    name: string
    label?: string
    placeholder?: string
    accept?: string
    type?: string
    description?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string
}


export default function FieldInput({ form, accept, name, label, placeholder, type = "text", description, defaultValue, onChange }: FieldInputProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label ? (
                        <FormLabel>{label}</FormLabel>
                    ) : null}
                    <FormControl onChange={onChange}>
                        <Input accept={accept} placeholder={placeholder ? placeholder : null} type={type} className={type === 'file' ? "file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 hidden" : null} {...field} />
                    </FormControl>
                    {description ? (
                        <FormDescription>
                            {description}
                        </FormDescription>
                    ) : null}
                    <FormMessage />
                </FormItem>
            )}
        />

    )
}