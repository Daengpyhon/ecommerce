import React from "react";
//! React PDF
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import moment from "moment/min/moment-with-locales";
import fontlao from "./PhetsarathOT.ttf";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
// Register font
Font.register({ family: "fontlao", src: fontlao });

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    fontFamily: "fontlao",
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  summary : {
    textAlign : 'right'
  }
});
const Invoice = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Daeng TO DEV</Text>
          <Text>ແດງ ພັດທະນາ</Text>
          <Text>{moment(Date.now()).locale("lo").format("l")}</Text>
          <Table>
            <TableHeader>
              <TableCell>ລາຍການສີນຄ້າ</TableCell>
              <TableCell>ລາຄາ</TableCell>
              <TableCell>ຈຳນວນສ</TableCell>
            </TableHeader>
          </Table>
          <Table data={order.products}>
            <TableBody>
              <DataTableCell getContent={(x) => x.product.title} />
              <DataTableCell getContent={(x) => x.price} />
              <DataTableCell getContent={(x) => x.count} />
            </TableBody>
          </Table>
          <Text style={styles.summary}>
            ລາຄາລວມ {new Intl.NumberFormat().format(order.cartTotal)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
