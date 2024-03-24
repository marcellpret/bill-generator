"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createClient } from "@/utils/supabase/client";

type Entry = [string, string] | [];

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

const formSchema = z.object({
    address: z.string(),
    taxNumber: z.string(),
    taxId: z.string(),
    bankName: z.string(),
    iban: z.string(),
    bic: z.string(),
    signature: z.any(),
});

export default function Index() {
    // const [defaultFormValues, setDefaultFormValues] = useState({});
    const [userId, setUserId] = useState<string>("");

    const router = useRouter();

    const supabase = createClient();

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

    useEffect(() => {
        async function getUser() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                return router.push("/login");
            }

            setUserId(user.id);
        }

        async function fetchProfile() {
            const { data, error } = await supabase.from("profiles").select();
            if (error) {
                console.error("Error fetching profile: ", error);
                return;
            }
            console.log("Data fetched: ", data);
            form.reset({
                address: data[0]?.bill_address,
                taxNumber: data[0]?.tax_number,
                taxId: data[0]?.tax_id,
                bankName: data[0]?.bank_name,
                iban: data[0]?.iban,
                bic: data[0]?.bic,
            });
        }
        getUser();
        fetchProfile();
    }, []);

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        values.signature = await onUpload(userId);
        const { address, taxNumber, taxId, bankName, iban, bic, signature } =
            values;
        try {
            console.log(values);
            const { data, error } = await supabase
                .from("profiles")
                .upsert(
                    {
                        bill_address: address,
                        tax_number: taxNumber,
                        tax_id: taxId,
                        bank_name: bankName,
                        iban,
                        bic,
                        signature,
                    },
                    { onConflict: "user_id" }
                )
                .select();

            if (error) {
                console.error("Error inserting data: ", error);
                return;
            }

            console.log("Data inserted: ", data);
        } catch (error) {
            console.error(error);
        }
    }

    async function onUpload(userId: string) {
        const image = form.getValues("signature");

        if (!image) {
            return;
        }

        const saveImage = await supabase.storage
            .from("bill-bucket")
            .upload(`${userId}/${image.name}`, image);
        if (saveImage.error) {
            console.error("Error uploading signature: ", saveImage.error);
            return;
        }

        const url = await supabase.storage
            .from("bill-bucket")
            .createSignedUrl(`${userId}/${image.name}`, 3600);

        if (url.data) {
            console.log(url.data.signedUrl);
            return url.data.signedUrl;
        }
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
                <FormField
                    control={form.control}
                    name="signature"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Upload your signature</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    {...field}
                                    onChange={(event) => {
                                        onChange(event.target.files[0]);
                                    }}
                                />
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
