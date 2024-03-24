"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "./ui/label";
import { useRef, useState } from "react";
import { z } from "zod";

const entrySchema = z.object({
    entry: z.string().min(1),
    value: z.string().min(1),
});

export default function CreateEntry({ addEntry }) {
    const [entry, setEntry] = useState({ entry: "", value: "" });
    const [error, setError] = useState<string | null>(null);

    const refEntry = useRef(null);

    const handleChange = (e) => {
        setError(null);
        setEntry({ ...entry, [e.target.name]: e.target.value });
    };

    const handleEntry = (e) => {
        e.preventDefault();

        const parsedEntry = entrySchema.safeParse(entry);

        if (parsedEntry.success) {
            addEntry(entry);
            setEntry({ entry: "", value: "" });
            refEntry.current.focus();
            return;
        }

        setError("Please fill up both inputs");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add your entries</CardTitle>
                <CardDescription>
                    Add as many entries as you want.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex w-full gap-2">
                <div className="grid w-full items-center gap-2">
                    <Label htmlFor="entry">Entry</Label>
                    <Input
                        ref={refEntry}
                        placeholder="What is the entry?"
                        name="entry"
                        id="entry"
                        value={entry.entry}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid items-center gap-2">
                    <Label htmlFor="value">Entry Value</Label>
                    <Input
                        type="number"
                        placeholder="How much?"
                        name="value"
                        id="value"
                        value={entry.value}
                        onChange={handleChange}
                    />
                </div>
            </CardContent>
            <CardFooter className="space-x-2">
                <Button variant="outline" onClick={handleEntry}>
                    Add Entry
                </Button>
                <CardDescription className="text-red-500">
                    {error}
                </CardDescription>
            </CardFooter>
        </Card>
    );
}
