// apps/frontend/src/features/student/components/ResultSlipPDFGenerator.tsx
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { message } from 'antd';

class ResultSlipPDFGenerator {
  private studentInfo: any;
  private summativeData: any[];
  private formativeData: any[];
  private teacherComments: any;
  private termLabel: string;

  constructor(
    studentInfo: any,
    summativeData: any[],
    formativeData: any[],
    teacherComments: any,
    selectedTerm: string
  ) {
    this.studentInfo = studentInfo;
    this.summativeData = summativeData;
    this.formativeData = formativeData;
    this.teacherComments = teacherComments;
    
    // Convert term value to readable label
    const termMap: Record<string, string> = {
      'term1_2024': 'Term 1, 2024',
      'term2_2024': 'Term 2, 2024',
      'term3_2024': 'Term 3, 2024',
      'term1_2023': 'Term 1, 2023',
      'term2_2023': 'Term 2, 2023',
      'term3_2023': 'Term 3, 2023',
    };
    this.termLabel = termMap[selectedTerm] || 'Current Term';
  }

  public generate(): void {
    try {
      const doc = new jsPDF();
      
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
      doc.text(`END OF ${this.termLabel.toUpperCase()} REPORT FORM`, doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });

      // --- Student Details ---
      autoTable(doc, {
        startY: 45,
        body: [
          ['Student Name:', this.studentInfo.name, 'Admission No:', this.studentInfo.admissionNumber],
          ['Class:', this.studentInfo.class, 'Term Average:', this.studentInfo.termAverage],
          ['Attendance:', this.studentInfo.attendance, 'Term Rank:', this.studentInfo.termRank],
        ],
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 1 },
      });

      // --- Summative Performance Table ---
      autoTable(doc, {
        head: [['Subject', 'CAT 1', 'CAT 2', 'Mid-Term', 'End-Term', 'Average', 'Grade', 'Remarks']],
        body: this.summativeData.map(item => [
          item.subject,
          item.cat1,
          item.cat2,
          item.midTerm,
          item.endTerm,
          item.average,
          item.grade,
          item.remarks,
        ]),
        startY: (doc as any).lastAutoTable.finalY + 10,
        headStyles: { fillColor: [0, 82, 155] }, // OLP Blue
      });
      
      // --- Formative Performance Table ---
      autoTable(doc, {
        head: [['Subject', 'Strand', 'Sub-Strand', 'Level Achieved', 'Comments']],
        body: this.formativeData.map(item => [
          item.subject,
          item.strand,
          item.subStrand,
          item.level,
          item.comments,
        ]),
        startY: (doc as any).lastAutoTable.finalY + 10,
        headStyles: { fillColor: [0, 82, 155] }, // OLP Blue
      });
      
      // --- Footer Remarks ---
      let finalY = (doc as any).lastAutoTable.finalY + 10;
      
      // Check if we need a new page for comments
      if (finalY > doc.internal.pageSize.getHeight() - 60) {
        doc.addPage();
        finalY = 20;
      }
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Teacher Comments', 14, finalY);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      // Class Teacher's comments with text wrapping
      const classTeacherText = `Class Teacher: ${this.teacherComments.classTeacher}`;
      const classTeacherLines = doc.splitTextToSize(classTeacherText, 180);
      doc.text(classTeacherLines, 14, finalY + 10);
      
      // Head Teacher's comments with text wrapping
      const headTeacherText = `Head Teacher: ${this.teacherComments.headTeacher}`;
      const headTeacherLines = doc.splitTextToSize(headTeacherText, 180);
      doc.text(headTeacherLines, 14, finalY + 25);
      
      // --- School Stamp and Signatures ---
      finalY = finalY + 40;
      
      doc.setLineWidth(0.2);
      doc.line(14, finalY, 80, finalY);
      doc.line(120, finalY, 186, finalY);
      
      doc.setFontSize(8);
      doc.text('Class Teacher\'s Signature', 14, finalY + 5);
      doc.text('Head Teacher\'s Signature', 120, finalY + 5);
      
      // --- Add School Logo/Stamp placeholder ---
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.circle(100, finalY - 10, 15);
      doc.setFontSize(6);
      doc.text('SCHOOL STAMP', 100, finalY - 10, { align: 'center' });
      
      // --- Add AI Pathway Recommendation for Grade 9 Term 3 ---
      if (this.termLabel === 'Term 3, 2023') {
        // Check if we need a new page
        if (finalY > doc.internal.pageSize.getHeight() - 80) {
          doc.addPage();
          finalY = 20;
        } else {
          finalY += 20;
        }
        
        doc.setFillColor(240, 240, 240);
        doc.rect(14, finalY, 180, 40, 'F');
        
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 82, 155); // OLP Blue
        doc.text('AI-Powered Pathway Recommendation', 14, finalY + 10);
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0);
        doc.text('Based on your performance, the system recommends:', 14, finalY + 20);
        doc.setFont('helvetica', 'bold');
        doc.text('STEM Pathway (Science, Technology, Engineering, Mathematics)', 14, finalY + 30);
      }
      
      // --- Save the PDF ---
      const filename = `Result_Slip_${this.studentInfo.name.replace(/\s+/g, '_')}_${this.termLabel.replace(/\s+/g, '_')}.pdf`;
      doc.save(filename);
      
      message.success('Result slip PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      message.error('Failed to generate PDF. Please try again.');
    }
  }
}

export default ResultSlipPDFGenerator;
