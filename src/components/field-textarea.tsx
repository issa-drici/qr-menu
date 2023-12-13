'use client';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea";

interface FieldTextareaProps {
    form: any
    name: string
    label: string
    placeholder: string
    description?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function FieldTextarea({ form, name, label, placeholder, description, onChange }: FieldTextareaProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl onChange={onChange}>
                        <Textarea placeholder={placeholder ? placeholder : "Entrez du texte"} className="resize-none" {...field} />
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