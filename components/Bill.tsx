import Link from "next/link";
import { Button } from "./ui/button";

interface Bill {
    id: string;
    created_at: Date;
    bill: string;
    bill_number: number;
    entries: [string, string][];
    user_id: string;
    client_name: string;
    tax_percentage: string;
}

import { FileText } from "lucide-react";

export default function Bill({ bill }: { bill: Bill }) {
    const total = bill.entries.reduce((acc, entry) => {
        return acc + parseFloat(entry[1]!);
    }, 0);

    return (
        <div className="border border-black rounded p-2">
            <h3>{bill.client_name}</h3>
            <h2>
                {bill.bill} - {bill.bill_number}
            </h2>

            <p>
                Total:{" "}
                {(total + total * Number(bill.tax_percentage)).toFixed(2)}$
            </p>
            <br />
            <em>Created at: {new Date(bill.created_at).toLocaleString()}</em>

            <Button asChild>
                <Link href={`pdf/${bill.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    PDF
                </Link>
            </Button>
        </div>
    );
}

function Entries({ entries }: { entries: [string, string][] }) {
    return (
        <ul>
            {entries.map((entry) => (
                <li>
                    {entry[0]}: {entry[1]}
                </li>
            ))}
        </ul>
    );
}
