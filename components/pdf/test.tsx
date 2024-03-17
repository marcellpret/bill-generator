import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
    document: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4",
    },
    page: {
        width: "100%",
        flexDirection: "row",
        padding: 20,
    },
    section: {
        flexGrow: 1,
    },
});

const pStyles = {
    fontSize: 12,
};

// Create Document Component
const MyDocument = () => (
    <>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Show Turner</Text>
                    <Text style={pStyles}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Reprehenderit quidem nemo voluptatibus ab magnam
                        quisquam deleniti doloremque. Nostrum, mollitia velit.
                    </Text>
                </View>
            </Page>
        </Document>
    </>
);

export default MyDocument;
