import { useNavigate, useParams } from 'react-router-dom';
import { useInvoices } from '@/hooks/useInvoices';
import { InvoiceForm } from '@/components/InvoiceForm';
import type { InvoiceStatus } from '@/types/invoice';

interface InvoiceFormPageProps {
  invoicesHook: ReturnType<typeof useInvoices>;
}

export function InvoiceFormPage({ invoicesHook }: InvoiceFormPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getInvoice, addInvoice, updateInvoice } = invoicesHook;

  const isEdit = !!id;
  const invoice = isEdit ? getInvoice(id) : null;

  const handleSave = (data: any, status: InvoiceStatus) => {
    if (isEdit && invoice) {
      updateInvoice(invoice.id, {
        ...data,
        status,
      });
      navigate(`/invoice/${invoice.id}`);
    } else {
      const newInvoice = addInvoice(data, status);
      navigate(`/invoice/${newInvoice.id}`);
    }
  };

  const handleDiscard = () => {
    if (isEdit && invoice) {
      navigate(`/invoice/${invoice.id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex animate-slide-in">
      {/* Backdrop */}
      <div
        className="hidden bg-black/50 md:block md:flex-1"
        onClick={handleDiscard}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleDiscard();
          }
        }}
        aria-label="Close form"
      />
      {/* Form Panel */}
      <div className="flex left-0 h-full w-full flex-col bg-white dark:bg-invoice-bg-dark md:w-[720px] md:rounded-r-2xl lg:w-[780px]">
        <InvoiceForm
          invoice={invoice}
          onSave={handleSave}
          onDiscard={handleDiscard}
        />
      </div>
    </div>
  );
}
