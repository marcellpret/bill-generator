import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";

// Create styles
const { page, title, bigger_bold, row, small_italic } = StyleSheet.create({
    page: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        fontSize: 12,
        size: "A4",
        lineHeight: 1.25,
        justifyContent: "space-between",
    },
    title: {
        fontWeight: "bold",
        fontSize: "28px",
    },
    bigger_bold: {
        fontSize: 14,
    },
    small_italic: {
        fontSize: 10,
        fontStyle: "italic",
        color: "gray",
    },
    row: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
    },
});

// Create Document Component
const MyDocument = ({ bill }) => {
    return (
        <>
            <Document>
                <Page size="A4" style={page}>
                    <View style={row}>
                        <View>
                            <Text style={title}>{bill.bill}</Text>
                            <Text>Rechnung Nr.: {bill.bill_number}</Text>
                            <Text style={small_italic}>22.04.2024</Text>
                        </View>
                        <View>
                            <Text style={small_italic}>To</Text>
                            <Text style={bigger_bold}>Stage Factory</Text>
                            <Text>Rheinstrasse 10, 12163 Berlin</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={small_italic}>From</Text>
                        <Text style={bigger_bold}>Mariana Souza</Text>
                        <Text>Deitmerstrasse 10, 12163 Berlin</Text>
                        <Text>Steuernummer:</Text>
                        <Text>SteuerID:</Text>
                    </View>
                    <View>
                        <Text>Extra text</Text>
                    </View>
                    <View>
                        <Text>Table of Entries</Text>
                    </View>
                    <View>
                        <Text>
                            Der Gesamtbetrag ist ab Erhalt dieser Rechnung
                            zahlbar innerhalb von 21 Tagen ohne Abzug.
                        </Text>
                    </View>

                    <View>
                        <Text>Mit freundlichen Grüßen,</Text>
                        <Image
                            src="https://sxzhormxnuelqhqgpzay.supabase.co/storage/v1/object/sign/bill-bucket/489b29b3-d445-4c70-9ebf-a188b3a51ac9/assinatura.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJiaWxsLWJ1Y2tldC80ODliMjliMy1kNDQ1LTRjNzAtOWViZi1hMTg4YjNhNTFhYzkvYXNzaW5hdHVyYS5qcGciLCJpYXQiOjE3MTEzMjA5NTQsImV4cCI6MTcxMTkyNTc1NH0.HKVP9pFQsgMi1Y138nzUjMZ6GEQ3yzW6xamiOqOVHnY&t=2024-03-24T22%3A55%3A54.165Z"
                            style={{ width: "40%" }}
                        />
                    </View>
                    <View
                        style={[
                            row,
                            { borderTop: "1px solid gray", paddingTop: 10 },
                        ]}
                    >
                        <View style={small_italic}>
                            <Text>Bank Name</Text>
                            <Text>IBAN:</Text>
                            <Text>BIC:</Text>
                        </View>
                        <View style={small_italic}>
                            <Text>Telefone</Text>
                            <Text>Email</Text>
                            <Text>Website</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </>
    );
};
export default MyDocument;
