import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Line,
} from "@react-pdf/renderer";

// Create styles
const { page, title, flex, bigger_bold } = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 12,
    },
    title: {
        fontWeight: "bold",
        fontSize: "28px",
    },
    flex: {
        display: "flex",
    },
    bigger_bold: {
        fontSize: 14,
    },
});

// Create Document Component
const MyDocument = () => (
    <>
        <Document>
            <Page size="A4" style={page}>
                <View>
                    <Text style={title}>Show Turner</Text>
                    <Text>22.04.2024</Text>
                </View>
                <View>
                    <Text>To</Text>
                    <Text>Stage Factory</Text>
                    <Text>Rheinstrasse 10, 12163 Berlin</Text>
                </View>
                <View>
                    <Text>From</Text>
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
                        Der Gesamtbetrag ist ab Erhalt dieser Rechnung zahlbar
                        innerhalb von 21 Tagen ohne Abzug.
                    </Text>
                </View>

                <View>
                    <Text>Mit freundlichen Grüßen,</Text>
                    <img src="" alt="" />
                </View>
                <View>
                    <Text>Bank Name</Text>
                    <Text>IBAN:</Text>
                    <Text>BIC:</Text>
                </View>
                <View>
                    <Text>Contact</Text>
                    <Text>Telefone</Text>
                    <Text>Email</Text>
                    <Text>Website</Text>
                </View>
            </Page>
        </Document>
    </>
);

export default MyDocument;
