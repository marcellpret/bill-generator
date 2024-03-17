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
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import CreateEntry from "./CreateEntry";

import { useState } from "react";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

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
    taxPercentage: z.enum(["0.07", "0.19"]),
});

export default function CreateBill() {
    const [entries, setEntries] = useState<Entry[]>([]);

    const [taxPercentage, setTaxPercentage] = useState("0.19");

    const total = entries.reduce((acc, entry) => {
        return acc + parseFloat(entry[1]!);
    }, 0);

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
            taxPercentage: "0.19",
        },
    });

    function handleChange(value) {
        setTaxPercentage(value);
    }

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        values.entries = entries;

        console.log(values);
    }

    // console.log(taxPercentage);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
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
                        <Label htmlFor="taxPercentage">Tax</Label>
                        <Select
                            name="taxPercentage"
                            onValueChange={handleChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Tax" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0.07">7%</SelectItem>
                                <SelectItem value="0.19">19%</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* <FormField
                        control={form.control}
                        name="taxPercentage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tax Percentage</FormLabel>
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
                                        <SelectItem value="0.07">7%</SelectItem>
                                        <SelectItem value="0.19">
                                            19%
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
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
                                    placeholder="CLient address"
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
                                                    "w-[240px] pl-3 text-left font-normal",
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
                    <div className="">
                        <Table>
                            <TableCaption>
                                The list of items to add to the invoice
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-full">
                                        Entry
                                    </TableHead>
                                    <TableHead className="text-right">
                                        Value
                                    </TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {entries.map((entry) => (
                                    <TableRow key={entry[0]}>
                                        <TableCell>{entry[0]}</TableCell>
                                        <TableCell className="text-right">
                                            {entry[1]}$
                                        </TableCell>
                                        <TableCell
                                            className=" cursor-pointer"
                                            onClick={() =>
                                                deleteEntry(entry[0])
                                            }
                                        >
                                            <X className=" hover:text-red-600 hover:scale-110" />
                                        </TableCell>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableCell>
                                        {Math.floor(taxPercentage * 100)}% tax
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {(total * taxPercentage).toFixed(2)}$
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    <TableCell className="text-right">
                                        {(
                                            total +
                                            total * taxPercentage
                                        ).toFixed(2)}
                                        $
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                )}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
