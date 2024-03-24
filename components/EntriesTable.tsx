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

import { X } from "lucide-react";

interface EntriesTableProps {
    entries: [string, number][];
    taxPercentage: number;
    total: number;
    deleteEntry: (entry: string) => void;
}

export default function EntriesTable({
    entries,
    taxPercentage,
    total,
    deleteEntry,
}: EntriesTableProps) {
    return (
        <div className="">
            <Table>
                <TableCaption>
                    The list of items to add to the invoice
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-full">Entry</TableHead>
                        <TableHead className="text-right">Value</TableHead>
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
                                onClick={() => deleteEntry(entry[0]!)}
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
                            {(total + total * taxPercentage).toFixed(2)}$
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
