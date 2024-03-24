import {
    Table,
    TableBody,
    TableCaption,
    div,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

import { X } from "lucide-react";

export default function EntriesTableTest() {
    const entries = [
        ["Show", "300"],
        ["Rehearsal", "150"],
    ];

    return (
        <div className="">
            {entries.map((entry) => (
                <div key={entry[0]} className="flex border-b-2 py-2">
                    <div className="flex-1">{entry[0]}</div>
                    <div className="text-right">{entry[1]}$</div>
                </div>
            ))}

            <div className="flex border-b-2 py-2">
                <div className="flex-1 ">0% MwSt</div>
                <div className="text-right">450$</div>
            </div>
            <div className="flex py-2">
                <div className="flex-1">Total</div>
                <div className="text-right">450$</div>
            </div>
        </div>
    );
}
