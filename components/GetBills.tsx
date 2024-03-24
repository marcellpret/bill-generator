import { createClient } from "@/utils/supabase/server";
import Bill from "./Bill";

export default async function GetBills() {
    const supabase = createClient();
    const { data: bills } = await supabase.from("bills").select();

    return (
        <ol className="space-y-2">
            {bills!.map((bill) => (
                <Bill bill={bill} key={bill.serial} />
            ))}
        </ol>
    );
}
