// apps/frontend/src/features/official/county/utils/actionUtils.ts
import { message, notification, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import React from 'react';

const { confirm } = Modal;

/**
 * Export data to Excel file
 * @param data Data to export
 * @param fileName File name without extension
 */
export const exportToExcel = (data: any[], fileName: string): void => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    
    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
    // Save file
    saveAs(fileData, `${fileName}-${new Date().toISOString().split('T')[0]}.xlsx`);
    
    message.success(`${fileName} exported successfully`);
  } catch (error) {
    console.error('Export failed:', error);
    message.error('Failed to export data');
  }
};

/**
 * Export data to PDF file (mock implementation)
 * @param data Data to export
 * @param fileName File name without extension
 */
export const exportToPdf = (data: any[], fileName: string): void => {
  // In a real implementation, you would use a library like jsPDF
  // This is a mock implementation
  message.success(`${fileName} would be exported as PDF (mock)`);
  console.log('Data to export:', data);
};

/**
 * Show details modal/drawer
 * @param id Item ID
 * @param title Modal title
 */
export const showDetailsModal = (id: number | string, title: string): void => {
  notification.info({
    message: 'View Details',
    description: `Viewing details for ${title} (ID: ${id})`,
    duration: 3,
  });
};

/**
 * Handle approval action
 * @param id Item ID
 * @param itemName Item name/description
 */
export const handleApprove = (id: number | string, itemName: string): void => {
  message.success(`${itemName} (ID: ${id}) has been approved`);
};

/**
 * Handle rejection action
 * @param id Item ID
 * @param itemName Item name/description
 */
export const handleReject = (id: number | string, itemName: string): void => {
  message.error(`${itemName} (ID: ${id}) has been rejected`);
};

/**
 * Handle edit action
 * @param id Item ID
 * @param itemName Item name/description
 */
export const handleEdit = (id: number | string, itemName: string): void => {
  message.info(`Editing ${itemName} (ID: ${id})`);
};

/**
 * Handle delete action with confirmation
 * @param id Item ID
 * @param itemName Item name/description
 * @param onConfirm Callback function to execute after confirmation
 */
export const handleDelete = (id: number | string, itemName: string, onConfirm?: () => void): void => {
  confirm({
    title: 'Are you sure you want to delete this item?',
    icon: React.createElement(ExclamationCircleOutlined),
    content: `You are about to delete ${itemName}. This action cannot be undone.`,
    okText: 'Yes, Delete',
    okType: 'danger',
    cancelText: 'Cancel',
    onOk() {
      message.warning(`${itemName} (ID: ${id}) has been deleted`);
      if (onConfirm) onConfirm();
    },
  });
};

/**
 * Handle task completion
 * @param taskId Task ID
 * @param taskName Task name/description
 */
export const handleCompleteTask = (_taskId: number | string, taskName: string): void => {
  message.success(`Task "${taskName}" marked as complete`);
};

/**
 * Handle task deadline extension
 * @param taskId Task ID
 * @param taskName Task name/description
 * @param newDeadline New deadline date string
 */
export const handleExtendDeadline = (_taskId: number | string, taskName: string, newDeadline: string): void => {
  message.info(`Deadline for "${taskName}" extended to ${newDeadline}`);
};

/**
 * Handle school report generation
 * @param schoolId School ID
 * @param schoolName School name
 * @param reportType Type of report
 */
export const generateSchoolReport = (_schoolId: number | string, schoolName: string, reportType: string): void => {
  message.loading({ content: `Generating ${reportType} report for ${schoolName}...`, key: 'reportGen' });
  
  // Simulate report generation delay
  setTimeout(() => {
    message.success({ content: `${reportType} report for ${schoolName} is ready!`, key: 'reportGen', duration: 2 });
  }, 1500);
};

/**
 * Handle sub-county report generation
 * @param subCountyId Sub-county ID
 * @param subCountyName Sub-county name
 * @param reportType Type of report
 */
export const generateSubCountyReport = (_subCountyId: number | string, subCountyName: string, reportType: string): void => {
  message.loading({ content: `Generating ${reportType} report for ${subCountyName} sub-county...`, key: 'reportGen' });
  
  // Simulate report generation delay
  setTimeout(() => {
    message.success({ content: `${reportType} report for ${subCountyName} sub-county is ready!`, key: 'reportGen', duration: 2 });
  }, 1500);
};
