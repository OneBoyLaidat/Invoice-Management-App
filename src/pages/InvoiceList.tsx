import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useInvoices } from '@/hooks/useInvoices';
import type { StatusFilter } from '@/types/invoice';
import { InvoiceCard } from '@/components/InvoiceCard';
import { FilterDropdown } from '@/components/FilterDropdown';
import { EmptyState } from '@/components/EmptyState';

interface InvoiceListProps {
  invoicesHook: ReturnType<typeof useInvoices>;
}

export function InvoiceList({ invoicesHook }: InvoiceListProps) {
  const { invoices } = invoicesHook;
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredInvoices = useMemo(() => {
    if (statusFilter === 'all') return invoices;
    return invoices.filter((inv) => inv.status === statusFilter);
  }, [invoices, statusFilter]);

  const invoiceCount = filteredInvoices.length;
  const totalCount = invoices.length;

  return (
    <div className="mx-auto w-full max-w-[730px] px-6 pb-16 pt-8 md:pt-16 lg:pt-20">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between md:mb-12">
        <div>
          <h1 className="text-2xl font-bold text-invoice-text-light dark:text-white md:text-4xl">
            Invoices
          </h1>
          <p className="mt-1 text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
            {totalCount === 0 ? (
              'No invoices'
            ) : (
              <>
                <span className="hidden md:inline">There are </span>
                <span className="md:hidden">{invoiceCount} </span>
                {statusFilter !== 'all' && (
                  <span className="hidden md:inline">{statusFilter} </span>
                )}
                <span className="hidden md:inline">{totalCount} total </span>
                invoice{totalCount !== 1 ? 's' : ''}
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-5 md:gap-10">
          <FilterDropdown value={statusFilter} onChange={setStatusFilter} />

          <Link
            to="/invoice/new"
            className="group flex items-center gap-2 rounded-full bg-primary py-2 pl-2 pr-4 text-sm font-bold text-white transition-colors hover:bg-primary-light md:gap-4 md:pl-2 md:pr-6"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <Plus className="h-4 w-4 text-primary" strokeWidth={3} />
            </span>
            <span className="hidden md:inline">New Invoice</span>
            <span className="md:hidden">New</span>
          </Link>
        </div>
      </div>

      {/* Invoice List */}
      {invoiceCount === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-4">
          {filteredInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      )}
    </div>
  );
}
