'use client';

import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


export default function FieldSelect({ form, name, label, placeholder, description }) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder ? placeholder : "Sélectionnez une valeur"} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                            </SelectContent>
                        </Select>
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

