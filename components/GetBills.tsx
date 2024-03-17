import { createClient } from "@/utils/supabase/server";
import Bill from "./Bill";

export default async function GetBills() {
    const supabase = createClient();
    const { data: bills } = await supabase.from("bills").select();

    return (
        <ul>
            {bills!.map((bill) => (
                <Bill bill={bill} key={bill.serial} />
            ))}
        </ul>
    );
}
