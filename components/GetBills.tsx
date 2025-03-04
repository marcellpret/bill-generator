import { createClient } from "@/utils/supabase/server";
import Bill from "./Bill";

export default async function GetBills() {
    const supabase = createClient();
    const { data: invoices } = await supabase.from("invoices").select("*");

    console.log(invoices);

    return (
        <ol className="space-y-2">
            Teste
            {invoices?.map((bill) => (
                <Bill bill={bill} key={bill.serial} />
            ))}
        </ol>
    );
}
