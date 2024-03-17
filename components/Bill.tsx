interface Bill {
    id: string;
    created_at: Date;
    name: string;
    serial: number;
    entries: [string, string][];
    user_id: string;
}

export default function Bill({ bill }: { bill: Bill }) {
    return (
        <>
            <h2>
                {bill.name} - {bill.serial}
            </h2>

            <Entries entries={bill.entries} />

            <em>Created at: {new Date(bill.created_at).toLocaleString()}</em>
        </>
    );
}

function Entries({ entries }: { entries: [string, string][] }) {
    return (
        <>
            {entries.map((entry) => (
                <li>
                    {entry[0]}: {entry[1]}
                </li>
            ))}
        </>
    );
}
