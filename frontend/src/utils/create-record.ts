import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const createRecord = async (idChart: string, recordName: string) => {
  const input = document.getElementById(idChart);
  await html2canvas(input!).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
    });

    const width = pdf.internal.pageSize.getWidth()
    const heigth = (canvas.height * width) / canvas.width

    pdf.addImage(imgData, "JPEG", 0, 0, width, heigth);
    pdf.save(`${recordName}.pdf`);
  });
};
