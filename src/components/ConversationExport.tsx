import React, { useState } from 'react';
import { Download, Mail, Share2, FileText, X, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ConversationExportProps {
  messages: Message[];
  isVisible: boolean;
  onClose: () => void;
}

const ConversationExport: React.FC<ConversationExportProps> = ({
  messages,
  isVisible,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isVisible) return null;

  const formatConversation = (): string => {
    const header = `Mindful AI Chat Conversation\nExported: ${new Date().toLocaleString()}\n${'='.repeat(50)}\n\n`;
    
    const content = messages.map((msg) => {
      const sender = msg.isBot ? '🤖 Mindful AI' : '👤 You';
      const time = msg.timestamp.toLocaleTimeString();
      return `[${time}] ${sender}:\n${msg.text}\n`;
    }).join('\n');

    const footer = `\n${'='.repeat(50)}\nIf you need immediate support, call: 0800 456 789\nSouth African Crisis Hotline - Available 24/7`;

    return header + content + footer;
  };

  const downloadAsPdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let yPosition = 20;

    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Mindful AI Chat Conversation', margin, yPosition);
    yPosition += 10;

    // Export date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Exported: ${new Date().toLocaleString()}`, margin, yPosition);
    yPosition += 15;

    // Messages
    doc.setTextColor(0);
    messages.forEach((msg) => {
      const sender = msg.isBot ? 'Mindful AI' : 'You';
      const time = msg.timestamp.toLocaleTimeString();

      // Check if we need a new page
      if (yPosition > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage();
        yPosition = 20;
      }

      // Sender header
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(msg.isBot ? 59 : 100, msg.isBot ? 130 : 100, msg.isBot ? 246 : 100);
      doc.text(`[${time}] ${sender}:`, margin, yPosition);
      yPosition += 6;

      // Message content
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0);
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(msg.text, maxWidth);
      lines.forEach((line: string) => {
        if (yPosition > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(line, margin, yPosition);
        yPosition += 6;
      });
      yPosition += 8;
    });

    // Footer
    if (yPosition > doc.internal.pageSize.getHeight() - 30) {
      doc.addPage();
      yPosition = 20;
    }
    yPosition += 10;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('If you need immediate support, call: 0800 456 789', margin, yPosition);
    yPosition += 5;
    doc.text('South African Crisis Hotline - Available 24/7', margin, yPosition);

    doc.save(`mindful-chat-${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success('Conversation downloaded as PDF');
    onClose();
  };

  const copyToClipboard = async () => {
    const content = formatConversation();
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success('Conversation copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const shareViaEmail = () => {
    const content = formatConversation();
    const subject = encodeURIComponent('My Mindful AI Chat Conversation');
    const body = encodeURIComponent(content);
    window.open(`mailto:?subject=${subject}&body=${body}`);
    toast.success('Opening email client...');
    onClose();
  };

  const shareViaWhatsApp = () => {
    const content = formatConversation();
    const text = encodeURIComponent(content);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    toast.success('Opening WhatsApp...');
    onClose();
  };

  const shareNative = async () => {
    const content = formatConversation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Mindful AI Chat Conversation',
          text: content,
        });
        toast.success('Shared successfully');
        onClose();
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error('Failed to share');
        }
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-blue-100 dark:border-slate-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Export Conversation
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Choose how you'd like to save or share your conversation:
          </p>

          <button
            onClick={downloadAsPdf}
            className="w-full flex items-center gap-3 p-3 bg-blue-50 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-slate-600 rounded-lg transition-colors text-left"
          >
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Download as PDF</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Save to your device</div>
            </div>
          </button>

          <button
            onClick={copyToClipboard}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-lg transition-colors text-left"
          >
            <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
              {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Copy to Clipboard</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Paste anywhere you need</div>
            </div>
          </button>

          <button
            onClick={shareViaEmail}
            className="w-full flex items-center gap-3 p-3 bg-red-50 dark:bg-slate-700 hover:bg-red-100 dark:hover:bg-slate-600 rounded-lg transition-colors text-left"
          >
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Send via Email</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Open in your email app</div>
            </div>
          </button>

          <button
            onClick={shareViaWhatsApp}
            className="w-full flex items-center gap-3 p-3 bg-green-50 dark:bg-slate-700 hover:bg-green-100 dark:hover:bg-slate-600 rounded-lg transition-colors text-left"
          >
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">Share via WhatsApp</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Send to yourself or others</div>
            </div>
          </button>

          {navigator.share && (
            <button
              onClick={shareNative}
              className="w-full flex items-center gap-3 p-3 bg-purple-50 dark:bg-slate-700 hover:bg-purple-100 dark:hover:bg-slate-600 rounded-lg transition-colors text-left"
            >
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">More Options</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Use your device's share menu</div>
              </div>
            </button>
          )}
        </div>

        <div className="p-4 border-t border-blue-100 dark:border-slate-600 bg-blue-50/50 dark:bg-slate-700/50 rounded-b-2xl">
          <p className="text-xs text-center text-blue-600 dark:text-blue-300">
            Your conversation data stays private and is not stored on any server.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConversationExport;
