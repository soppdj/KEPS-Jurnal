/**
 * PDF Generation Service for KEPS Journal v2.0
 * Produces Daily Summary Cards and Milestone Executive Reports
 */

export const pdfService = {
  /**
   * Export an HTML element by ID to PDF with executive print styles
   */
  exportElementToPdf: async (elementId, filename, options = {}) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`[KEPS PDF] Element #${elementId} not found`);
      throw new Error(`Elemen laporan #${elementId} tidak ditemukan.`);
    }

    try {
      // Dynamic import to keep initial bundle lightweight and prevent static build stalls
      const html2pdfModule = await import('html2pdf.js');
      const html2pdf = html2pdfModule.default || html2pdfModule;

      const defaultOptions = {
        margin: [10, 10, 10, 10], // mm
        filename: filename || 'keps-laporan-kepemimpinan.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          backgroundColor: '#FFFFFF',
          logging: false
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: options.orientation || 'portrait'
        }
      };

      const finalOptions = { ...defaultOptions, ...options };
      await html2pdf().set(finalOptions).from(element).save();
      return { success: true };
    } catch (err) {
      console.warn('[KEPS PDF] Dynamic html2pdf failed, falling back to native print dialog:', err);
      window.print();
      return { success: true, fallback: true };
    }
  }
};
