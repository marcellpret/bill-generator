"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createClient } from "@/utils/supabase/client";

import useLocalStorageState from "use-local-storage-state";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Entry } from "@/lib/types";

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
import { format, set } from "date-fns";
import CreateEntry from "./CreateEntry";

import { use, useEffect, useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import EntriesTable from "./EntriesTable";
import MyDocument from "./pdf/test";
import { data } from "autoprefixer";

const formSchema = z.object({
    bill: z.string().min(2, {
        message: "Bill name must be at least 2 characters.",
    }),
    billNumber: z.string().min(8, {
        message: "Bill number should follow this format: 000-<year>",
    }),
    issueDate: z.date({
        required_error: "A date of issue is required.",
    }),
    clientName: z.string(),
    clientAddress: z.string(),
    extraInfo: z.string().optional(),
    entries: z.array(z.array(z.string(), z.string())),
    taxPercentage: z.enum(["0.07", "0.19", "0"]),
});

export default function CreateBill() {
    // const [formLocal, setFormLocal] = useLocalStorageState("form", {
    //     defaultValue: {},
    // });

    const [entries, setEntries] = useState<Entry[]>([]);

    const supabase = createClient();

    const addEntry = (entry: { entry: string; value: string }) => {
        setEntries([...entries, [entry.entry, entry.value]]);
    };

    const deleteEntry = (entry: string) => {
        setEntries(entries.filter((e) => e[0] !== entry));
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            bill: "",
            billNumber: "",
            entries: [],
            clientName: "",
            clientAddress: "",
            extraInfo: "",
            taxPercentage: "0",
        },
    });

    const taxPercentage = form.watch("taxPercentage");

    // useEffect(() => {
    //     if (Object.keys(formLocal).length === 0) return;
    //     form.reset(formLocal);
    // }, [formLocal]);

    // form.watch((data) => {
    //     setFormLocal(data);
    // });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        console.log("Test");

        values.entries = entries;
        try {
            const { data, error } = await supabase
                .from("bills")
                .insert({
                    bill: values.bill,
                    bill_number: values.billNumber,
                    issue_date: new Date(values.issueDate),
                    client_name: values.clientName,
                    client_address: values.clientAddress,
                    extra_info: values.extraInfo,
                    tax_percentage: values.taxPercentage,
                    entries: values.entries,
                })
                .select();

            if (error) {
                console.error("Error inserting bill: ", error);
                return;
            }

            setEntries([]);
            form.reset();
            toast.success("Bill created successfully", {
                position: "bottom-center",
            });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10 pr-4"
            >
                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="bill"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Name*</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Name your bill"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="taxPercentage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="taxPercentage">
                                        Tax
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Tax" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="0">
                                                0%
                                            </SelectItem>
                                            <SelectItem value="0.07">
                                                7%
                                            </SelectItem>
                                            <SelectItem value="0.19">
                                                19%
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client Name*</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Who is paying you?"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="clientAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client Address*</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Client address"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-2">
                    <FormField
                        control={form.control}
                        name="billNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bill Number*</FormLabel>
                                <FormControl>
                                    <Input
                                        className=" w-max"
                                        placeholder="000-2020"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="issueDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Issue Date*</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value &&
                                                        "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="extraInfo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Extra Information</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Anything else to be added..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <CreateEntry addEntry={addEntry} />
                {entries.length !== 0 && (
                    <EntriesTable
                        entries={entries}
                        taxPercentage={taxPercentage}
                        deleteEntry={deleteEntry}
                    />
                )}

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
