"use client";

import MyDocument from "@/components/pdf/test";
import { PDFViewer } from "@react-pdf/renderer";

export default function page() {
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
            <MyDocument />
        </PDFViewer>
    );
}
