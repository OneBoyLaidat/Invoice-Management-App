import { useState } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { useInvoices } from '@/hooks/useInvoices';
import { StatusBadge } from '@/components/StatusBadge';
import { DeleteModal } from '@/components/DeleteModal';

interface InvoiceDetailProps {
  invoicesHook: ReturnType<typeof useInvoices>;
}

export function InvoiceDetail({ invoicesHook }: InvoiceDetailProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getInvoice, deleteInvoice, markAsPaid } = invoicesHook;
  const location = useLocation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const invoice = id ? getInvoice(id) : undefined;

  if (!invoice) {
    return (
      <div className="mx-auto flex max-w-[730px] flex-col items-center justify-center px-6 py-16">
        <p className="text-lg text-invoice-textMuted">Invoice not found</p>
        <Link
          to="/"
          className="mt-4 text-sm font-bold text-primary hover:underline"
        >
          Back to Invoices
        </Link>
      </div>
    );
  }

  const formattedDate = format(new Date(invoice.createdAt), 'dd MMM yyyy');
  const formattedDue = format(new Date(invoice.paymentDue), 'dd MMM yyyy');

  const handleDelete = () => {
    deleteInvoice(invoice.id);
    setShowDeleteModal(false);
    navigate('/');
  };

  const handleMarkAsPaid = () => {
    markAsPaid(invoice.id);
  };

  const canEdit = invoice.status !== 'paid';
  const canDelete = true;
  const canMarkAsPaid = invoice.status === 'pending';

  return (
    <div className="mx-auto w-full max-w-[730px] px-6 pb-32 pt-8 md:pb-16 md:pt-16 lg:pt-20">
      {/* Back Button */}
      <Link
        to="/"
        className="mb-8 flex items-center gap-6 text-sm font-bold text-invoice-text-light transition-colors hover:text-invoice-textSecondary dark:text-white dark:hover:text-[#DFE3FA]"
      >
        <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
          <path d="M6.34223 1.55736L2.5286 5.37099L6.34223 9.18461" stroke="#7C5DFA" strokeWidth="2" />
        </svg>
        Go back
      </Link>

      {/* Status Bar */}
      <div className="mb-6 flex items-center justify-between rounded-lg bg-white p-6 shadow-card dark:bg-invoice-card-dark dark:shadow-none md:px-8">
        <div className="flex w-full items-center justify-between md:w-auto md:gap-5">
          <span className="text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
            Status
          </span>
          <StatusBadge status={invoice.status} />
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          {canEdit && (
            <Link
              to={`/invoice/${invoice.id}/edit`}
              state={{ backgroundLocation: location }}
              className="rounded-full bg-[#F9FAFE] px-6 py-3 text-sm font-bold text-invoice-textMuted transition-colors hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139]"
            >
              Edit
            </Link>
          )}
          {canDelete && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="rounded-full bg-destructive px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-destructive-hover"
            >
              Delete
            </button>
          )}
          {canMarkAsPaid && (
            <button
              onClick={handleMarkAsPaid}
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-light"
            >
              Mark as Paid
            </button>
          )}
        </div>
      </div>

      {/* Invoice Details */}
      <div className="rounded-lg bg-white p-6 shadow-card dark:bg-invoice-card-dark dark:shadow-none md:p-12">
        {/* Header Info */}
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <h1 className="text-base font-bold text-invoice-text-light dark:text-white">
              <span className="text-invoice-textSecondary">#</span>
              {invoice.id}
            </h1>
            <p className="mt-1 text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              {invoice.description}
            </p>
          </div>
          <div className="text-right md:text-right">
            <p className="text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              {invoice.senderAddress.street}
            </p>
            <p className="text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              {invoice.senderAddress.city}
            </p>
            <p className="text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              {invoice.senderAddress.postCode}
            </p>
            <p className="text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              {invoice.senderAddress.country}
            </p>
          </div>
        </div>

        {/* Middle Info */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-3">
          {/* Invoice Date */}
          <div>
            <p className="mb-3 text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              Invoice Date
            </p>
            <p className="text-base font-bold text-invoice-text-light dark:text-white">
              {formattedDate}
            </p>
            <p className="mt-8 text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              Payment Due
            </p>
            <p className="mt-3 text-base font-bold text-invoice-text-light dark:text-white">
              {formattedDue}
            </p>
          </div>

          {/* Bill To */}
          <div>
            <p className="mb-3 text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              Bill To
            </p>
            <p className="text-base font-bold text-invoice-text-light dark:text-white">
              {invoice.clientName}
            </p>
            <p className="mt-2 text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              {invoice.clientAddress.street}
            </p>
            <p className="text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              {invoice.clientAddress.city}
            </p>
            <p className="text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              {invoice.clientAddress.postCode}
            </p>
            <p className="text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              {invoice.clientAddress.country}
            </p>
          </div>

          {/* Sent To */}
          <div className="col-span-2 md:col-span-1">
            <p className="mb-3 text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
              Sent to
            </p>
            <p className="text-base font-bold text-invoice-text-light dark:text-white">
              {invoice.clientEmail}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-hidden rounded-lg bg-[#F9FAFE] dark:bg-[#252945]">
          {/* Desktop Headers */}
          <div className="hidden px-8 pt-8 md:grid md:grid-cols-[1fr_40px_120px_120px]">
            <span className="text-xs text-invoice-textMuted dark:text-[#DFE3FA]">
              Item Name
            </span>
            <span className="text-right text-xs text-invoice-textMuted dark:text-[#DFE3FA]">
              QTY.
            </span>
            <span className="text-right text-xs text-invoice-textMuted dark:text-[#DFE3FA]">
              Price
            </span>
            <span className="text-right text-xs text-invoice-textMuted dark:text-[#DFE3FA]">
              Total
            </span>
          </div>

          <div className="p-6 md:px-8 md:pb-8 md:pt-4">
            {invoice.items.map((item) => (
              <div
                key={item.id}
                className="mb-6 grid grid-cols-2 items-center md:mb-4 md:grid-cols-[1fr_40px_120px_120px]"
              >
                <div>
                  <p className="text-sm font-bold text-invoice-text-light dark:text-[#DFE3FA]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm font-bold text-invoice-textMuted md:hidden">
                    {item.quantity} x &pound; {item.price.toFixed(2)}
                  </p>
                </div>
                <p className="hidden text-right text-sm font-bold text-invoice-textSecondary dark:text-[#DFE3FA] md:block">
                  {item.quantity}
                </p>
                <p className="hidden text-right text-sm font-bold text-invoice-textSecondary dark:text-[#DFE3FA] md:block">
                  &pound; {item.price.toFixed(2)}
                </p>
                <p className="text-right text-sm font-bold text-invoice-text-light dark:text-white">
                  &pound; {item.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Amount Due */}
          <div className="flex items-center justify-between bg-[#373B53] px-6 py-8 dark:bg-[#0C0E16] md:px-8">
            <span className="text-sm text-white">Amount Due</span>
            <span className="text-2xl font-bold text-white md:text-3xl">
              &pound; {invoice.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-2 bg-white p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] dark:bg-invoice-card-dark md:hidden">
        {canEdit && (
          <Link
            to={`/invoice/${invoice.id}/edit`}
            state={{ backgroundLocation: location }}
            className="rounded-full bg-[#F9FAFE] px-6 py-3 text-sm font-bold text-invoice-textMuted"
          >
            Edit
          </Link>
        )}
        {canDelete && (
          <button
            onClick={() => setShowDeleteModal(true)}
            className="rounded-full bg-destructive px-6 py-3 text-sm font-bold text-white"
          >
            Delete
          </button>
        )}
        {canMarkAsPaid && (
          <button
            onClick={handleMarkAsPaid}
            className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white"
          >
            Mark as Paid
          </button>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        invoiceId={invoice.id}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
