"use client";

import MyDocument from "@/components/pdf/test";
import { PDFViewer } from "@react-pdf/renderer";

export default function page() {
    return (
        <PDFViewer
            width={"100%"}
            height={"800px"}
            style={{ border: "1px solid black", borderRadius: "5px" }}
        >
            <MyDocument />
        </PDFViewer>
    );
}
