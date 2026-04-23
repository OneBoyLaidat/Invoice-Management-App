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
      navigate(-1);
    } else {
      addInvoice(data, status);
      navigate(-1);
    }
  };

  const handleDiscard = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity md:block animate-fade-in"
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
      <div className="relative z-10 flex h-full w-full flex-col bg-white dark:bg-invoice-bg-dark md:w-[720px] md:pl-[103px] md:rounded-r-2xl lg:w-[780px] animate-slide-in">
        <InvoiceForm
          invoice={invoice}
          onSave={handleSave}
          onDiscard={handleDiscard}
        />
      </div>
    </div>
  );
}
