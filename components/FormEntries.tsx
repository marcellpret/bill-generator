import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function FormEntries() {
    return (
        <div className="flex gap-2">
            <FormField
                control={form.control}
                name="entry"
                render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormLabel>Entry</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="What is the entry?"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="entryValue"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Entry Value</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="How much?"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
