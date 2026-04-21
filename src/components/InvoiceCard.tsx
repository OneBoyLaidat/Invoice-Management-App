import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { Invoice } from '@/types/invoice';
import { StatusBadge } from './StatusBadge';
import { format } from 'date-fns';

interface InvoiceCardProps {
  invoice: Invoice;
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  const formattedDate = format(new Date(invoice.paymentDue), 'dd MMM yyyy');

  return (
    <Link
      to={`/invoice/${invoice.id}`}
      className="group block rounded-lg border border-transparent bg-white p-6 shadow-card transition-all hover:border-primary dark:bg-invoice-card-dark dark:shadow-none md:px-8"
      aria-label={`Invoice ${invoice.id} for ${invoice.clientName}, amount ${invoice.total.toFixed(2)}`}
    >
      {/* Mobile Layout */}
      <div className="flex flex-col gap-6 md:hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">
            <span className="text-invoice-textMuted-dark">#</span>
            <span className="text-invoice-text-light dark:text-invoice-text-dark">
              {invoice.id}
            </span>
          </span>
          <span className="text-sm text-invoice-textMuted-light dark:text-invoice-textMuted-dark">
            {invoice.clientName}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-sm  text-invoice-textMuted-light dark:text-invoice-textMuted-dark">
              Due {formattedDate}
            </span>
            <span className="text-base font-bold text-invoice-text-light dark:text-invoice-text-dark">
              &pound; {invoice.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <StatusBadge status={invoice.status} />
        </div>
      </div>

      {/* Desktop/Tablet Layout */}
      <div className="hidden items-center md:flex">
        <div className="flex w-[100px] items-center">
          <span className="text-base font-bold">
            <span className="text-[#7E88C3] ">#</span>
            <span className="text-invoice-text-light dark:text-invoice-text-dark">
              {invoice.id}
            </span>
          </span>
        </div>

        <div className="flex flex-1 items-center">
          <span className="w-[160px] text-sm  text-invoice-textMuted-light dark:text-invoice-textMuted-dark">
            Due {formattedDate}
          </span>
          <span className="flex-1 text-sm  text-invoice-textMuted-light dark:text-invoice-textMuted-dark">
            {invoice.clientName}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <span className="w-[140px] text-right text-base font-bold text-invoice-text-light dark:text-invoice-text-dark">
            &pound; {invoice.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <StatusBadge status={invoice.status} />
          <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
