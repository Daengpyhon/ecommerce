import React from "react";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { font } from "./PhetsarathOT-normal";
const InvoicejsPDF = ({order}) => {

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.addFileToVFS("MyFont.ttf", font);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    let width = doc.internal.pageSize.getWidth();
    doc.text("ແດງ ພັດທະນາ", width/2, 10, {align:'center'});
    doc.text("ວັນທີ່ xxxx", width/2, 20, {align:'center'});

    let data = order.products.map((p,i)=>[p.product.title, p.price, p.count])

    let content = {
      startY : 25,
      head :  [['ລາຍການສີນຄ້າ', 'ລາຄາ', 'ຈຳນວນ']],
      body : data,
      styles : {
        font : 'MyFont'
      }
    }
 
    doc.autoTable(content)
    doc.text("ລາຄາລວມ : " + new Intl.NumberFormat().format(order.cartTotal) , 190, 90, {align:'right'});
    doc.save("a4.pdf");
  };
  return (
    <div>
      <button onClick={handlePDF} className="btn btn-success btn-sm">
        JS PDF
      </button>
    </div>
  );
};

export default InvoicejsPDF;
