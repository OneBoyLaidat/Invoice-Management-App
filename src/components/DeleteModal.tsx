import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface DeleteModalProps {
  isOpen: boolean;
  invoiceId: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteModal({ isOpen, invoiceId, onConfirm, onCancel }: DeleteModalProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      cancelRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-desc"
    >
      <div className="w-full max-w-[480px] rounded-lg bg-white p-8 shadow-xl dark:bg-invoice-card-dark md:p-12">
        <h2
          id="delete-modal-title"
          className="mb-3 text-2xl font-bold text-invoice-text-light dark:text-white"
        >
          Confirm Deletion
        </h2>
        <p
          id="delete-modal-desc"
          className="mb-4 text-sm leading-relaxed text-invoice-textMuted dark:text-[#DFE3FA]"
        >
          Are you sure you want to delete invoice{' '}
          <span className="font-bold text-invoice-text-light dark:text-white">
            #{invoiceId}
          </span>
          ? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <Button
            ref={cancelRef}
            onClick={onCancel}
            variant="secondary"
            className="rounded-full bg-[#F9FAFE] px-6 py-3 text-sm font-bold text-invoice-textMuted hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139]"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="rounded-full bg-destructive px-6 py-3 text-sm font-bold text-white hover:bg-destructive-hover"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
