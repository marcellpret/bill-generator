"use client";

import MyDocument from "@/components/pdf/test";
import { PDFViewer } from "@react-pdf/renderer";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function PDFpage({ params }: { params: { id: string } }) {
    const supabase = createClient();

    const [bill, setBill] = useState();

    useEffect(() => {
        async function getBill() {
            try {
                const { data: bill } = await supabase
                    .from("bills")
                    .select()
                    .eq("id", params.id);

                if (bill) {
                    setBill(bill[0]);
                }
            } catch (error) {
                console.error("Error fetching bill: ", error);
            }
        }
        getBill();
    }, [bill]);

    if (!bill) {
        return <div>Loading...</div>;
    }

    return (
        <PDFViewer
            // width={"80%"}
            // height={"8"}
            style={{
                border: "1px solid black",
                borderRadius: "5px",
                width: "100%",
                height: "80vh",
            }}
        >
            <MyDocument bill={bill} />
        </PDFViewer>
    );
}
