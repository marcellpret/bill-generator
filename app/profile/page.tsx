"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Entry = [string, string] | [];

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    address: z.string(),
    taxNumber: z.string(),
    taxId: z.string(),
    bankName: z.string(),
    iban: z.string(),
    bic: z.string(),
});

export default function Index() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            address: "",
            taxNumber: "",
            taxId: "",
            bankName: "",
            iban: "",
            bic: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Bill address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="taxNumber"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Tax Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Tax Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Tax Id</FormLabel>
                            <FormControl>
                                <Input placeholder="Tax Id" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Bank Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="iban"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>IBAN</FormLabel>
                            <FormControl>
                                <Input placeholder="IBAN" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bic"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>BIC</FormLabel>
                            <FormControl>
                                <Input placeholder="BIC" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
