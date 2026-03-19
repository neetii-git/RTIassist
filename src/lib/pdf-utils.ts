import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const exportToPdf = async (content: string, filename: string = "RTI_Application.pdf") => {
  // Create a temporary element to render the RTI draft
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "794px"; 
  container.style.padding = "60px";
  container.style.backgroundColor = "white";
  container.style.color = "#1e293b";
  container.style.fontFamily = "'Inter', 'Segoe UI', sans-serif";
  container.style.lineHeight = "1.8";

  container.innerHTML = `
    <div style="border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 style="color: #2563eb; font-size: 28px; font-weight: 900; margin: 0;">RTIAssist</h1>
        <p style="color: #64748b; font-size: 12px; margin: 5px 0 0 0;">Generated AI RTI Draft - Legal Format</p>
      </div>
      <div style="text-align: right; color: #94a3b8; font-size: 10px;">
        Date: ${new Date().toLocaleDateString()}
      </div>
    </div>
    <div style="white-space: pre-wrap; font-size: 16px; min-height: 1000px; color: #1e293b;">${content}</div>
    <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between;">
      <span>Disclaimer: This is an AI-generated draft. Please verify before official submission.</span>
      <span>rtiaassist.in</span>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "white"
    });

    const imgData = canvas.toDataURL("image/png");
    
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Calculate content dimensions
    const imgProps = pdf.getImageProperties(imgData);
    const ratio = imgProps.width / imgProps.height;
    const canvasHeightInPdf = pdfWidth / ratio;
    
    let heightLeft = canvasHeightInPdf;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPdf);
    heightLeft -= pdfHeight;

    // Remaining pages
    while (heightLeft > 0) {
      position = heightLeft - canvasHeightInPdf;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPdf);
      heightLeft -= pdfHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error("PDF Export failed:", error);
  } finally {
    document.body.removeChild(container);
  }
};
