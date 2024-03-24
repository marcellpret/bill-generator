interface Bill {
    id: string;
    created_at: Date;
    bill: string;
    bill_number: number;
    entries: [string, string][];
    user_id: string;
}

export default function Bill({ bill }: { bill: Bill }) {
    return (
        <li className="border border-black rounded p-2">
            <h3>{bill.client_name}</h3>
            <h2>
                {bill.bill} - {bill.bill_number}
            </h2>

            <Entries entries={bill.entries} />

            <em>Created at: {new Date(bill.created_at).toLocaleString()}</em>
        </li>
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
