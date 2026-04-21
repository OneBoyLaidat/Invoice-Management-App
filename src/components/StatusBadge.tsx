import type { InvoiceStatus } from '@/types/invoice';

interface StatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
}

const statusConfig = {
  paid: {
    bg: 'bg-[#33D69F]/10',
    text: 'text-[#33D69F]',
    dot: 'bg-[#33D69F]',
    label: 'Paid',
  },
  pending: {
    bg: 'bg-[#FF8F00]/10',
    text: 'text-[#FF8F00]',
    dot: 'bg-[#FF8F00]',
    label: 'Pending',
  },
  draft: {
    bg: 'bg-[#373B53]/10',
    text: 'text-[#373B53]',
    dot: 'bg-[#373B53]',
    label: 'Draft',
  },
};

const darkStatusConfig = {
  paid: {
    bg: 'dark:bg-[#33D69F]/10',
    text: 'dark:text-[#33D69F]',
    dot: 'dark:bg-[#33D69F]',
  },
  pending: {
    bg: 'dark:bg-[#FF8F00]/10',
    text: 'dark:text-[#FF8F00]',
    dot: 'dark:bg-[#FF8F00]',
  },
  draft: {
    bg: 'dark:bg-[#DFE3FA]/10',
    text: 'dark:text-[#DFE3FA]',
    dot: 'dark:bg-[#DFE3FA]',
  },
};

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status];
  const darkConfig = darkStatusConfig[status];

  return (
    <span
      className={`inline-flex  items-center justify-center w-[104px] gap-2 rounded-md px-4 py-2 text-sm font-bold capitalize ${config.bg} ${darkConfig.bg} ${config.text} ${darkConfig.text} ${className}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${config.dot} ${darkConfig.dot}`}
      />
      {config.label}
    </span>
  );
}
