// apps/frontend/src/utils/pdfGenerator.ts
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // <-- CHANGE: Import the function directly
import { useAuthStore } from '@/store/auth.store';
import dayjs from 'dayjs';

// No longer need the interface `jsPDFWithAutoTable`

export const generateResultSlip = (performanceData: any[], formativeData: any[]) => {
  const doc = new jsPDF(); // <-- CHANGE: Create a standard jsPDF instance
  const user = useAuthStore.getState().user;

  // --- Document Header ---
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('NAIROBI PRIMARY SCHOOL', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('P.O. Box 3000, Nairobi | Tel: 020-123456', doc.internal.pageSize.getWidth() / 2, 27, { align: 'center' });
  doc.setLineWidth(0.5);
  doc.line(20, 30, 190, 30);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('END OF TERM 1, 2023 REPORT FORM', doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

  // --- Student Details ---
  // --- CHANGE: Call autoTable as a function, passing the doc instance ---
  autoTable(doc, {
    startY: 45,
    body: [
      ['Student Name:', `${user?.firstName} ${user?.lastName}`, 'Student ID:', `${user?.userNumber}`],
      ['Class:', 'Grade 6', 'Term Average:', '85.6%'],
    ],
    theme: 'plain',
    styles: { fontSize: 10, cellPadding: 1 },
    didDrawPage: (data) => {
        // This is a hook that runs after the table is drawn
    }
  });

  // --- Summative Performance Table ---
  autoTable(doc, {
    head: [['Subject', 'Assessment Type', 'Score', 'Grade', 'Teacher\'s Remarks']],
    body: performanceData.map(item => [item.subject, item.type, `${item.score} / ${item.outOf}`, item.grade, 'Good effort!']),
    // The startY now needs to be calculated from the previous table's end position
    startY: (doc as any).lastAutoTable.finalY + 5,
    headStyles: { fillColor: [0, 82, 155] }, // OLP Blue
  });
  
  // --- Formative Performance Remarks ---
  let finalY = (doc as any).lastAutoTable.finalY;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Formative Assessment Highlights', 14, finalY + 15);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  formativeData.forEach((item, index) => {
      const text = `• In ${item.subject}, the student ${item.level.toLowerCase()} for the skill: "${item.indicator}".`;
      // Use splitTextToSize to handle long lines automatically
      const splitText = doc.splitTextToSize(text, 175); // 175 is the width of the text area
      doc.text(splitText, 14, finalY + 22 + (index * 10));
  });
  
  // --- Footer Remarks ---
  finalY = doc.internal.pageSize.getHeight() - 40;
  doc.setLineWidth(0.2);
  doc.line(14, finalY, 196, finalY);
  doc.text('Class Teacher\'s Remarks: Excellent progress this term. Keep up the great work!', 14, finalY + 7);
  doc.text('Headteacher\'s Remarks: A remarkable performance. Well done.', 14, finalY + 14);

  // --- Save the PDF ---
  doc.save(`Result_Slip_${user?.firstName}_${user?.lastName}_Term1_2023.pdf`);
};

// ADD this new function to apps/frontend/src/utils/pdfGenerator.ts

export const generatePaymentHistoryReport = (paymentData: any[], schoolName: string) => {
  const doc = new jsPDF();
  const user = useAuthStore.getState().user;

  // --- Document Header ---
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`${schoolName.toUpperCase()}`, doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
  doc.setFontSize(14);
  doc.text('Subscription Payment History', doc.internal.pageSize.getWidth() / 2, 28, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Report generated on: ${dayjs().format('MMMM D, YYYY')}`, doc.internal.pageSize.getWidth() / 2, 34, { align: 'center' });
  
  // --- Payment History Table ---
  autoTable(doc, {
    startY: 45,
    head: [['Payment Date', 'Amount (KES)', 'Payment Method', 'Transaction ID', 'Status']],
    body: paymentData.map(item => [
        item.date,
        item.amount.toLocaleString(),
        item.method,
        item.transactionId,
        item.status,
    ]),
    headStyles: { fillColor: [0, 82, 155] }, // OLP Blue
    didDrawPage: (data) => {
        // Footer
        const pageCount = doc.internal.pages.length;
        doc.setFontSize(10);
        doc.text(`Page ${String(data.pageNumber)} of ${pageCount}`, data.settings.margin.left, doc.internal.pageSize.getHeight() - 10);
    }
  });

  // --- Save the PDF ---
  doc.save(`Payment_History_Report_${schoolName.replace(/\s+/g, '_')}.pdf`);
};