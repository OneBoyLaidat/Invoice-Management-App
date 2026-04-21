import { useState, useEffect, useCallback } from 'react';
import type { Invoice, InvoiceStatus } from '@/types/invoice';
import { seedInvoices } from '@/data/seedData';

const STORAGE_KEY = 'invoice-app-data';

function loadInvoices(): Invoice[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore parse errors
  }
  // Seed with initial data on first load
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedInvoices));
  return seedInvoices;
}

function saveInvoices(invoices: Invoice[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
}

function generateId(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter1 = letters[Math.floor(Math.random() * 26)];
  const letter2 = letters[Math.floor(Math.random() * 26)];
  const numbers = Math.floor(1000 + Math.random() * 9000);
  return `${letter1}${letter2}${numbers}`;
}

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(loadInvoices);

  useEffect(() => {
    saveInvoices(invoices);
  }, [invoices]);

  const getInvoice = useCallback(
    (id: string): Invoice | undefined => {
      return invoices.find((inv) => inv.id === id);
    },
    [invoices]
  );

  const addInvoice = useCallback(
    (
      data: Omit<Invoice, 'id' | 'total' | 'paymentDue'>,
      status: InvoiceStatus
    ): Invoice => {
      const id = generateId();
      const total = data.items.reduce((sum, item) => sum + item.total, 0);

      // Calculate payment due date
      const createdDate = new Date(data.createdAt);
      const paymentDue = new Date(createdDate);
      paymentDue.setDate(paymentDue.getDate() + data.paymentTerms);

      const newInvoice: Invoice = {
        ...data,
        id,
        status,
        total,
        paymentDue: paymentDue.toISOString().split('T')[0],
      };

      setInvoices((prev) => [newInvoice, ...prev]);
      return newInvoice;
    },
    []
  );

  const updateInvoice = useCallback(
    (id: string, data: Partial<Invoice>): Invoice | null => {
      let updated: Invoice | null = null;
      setInvoices((prev) =>
        prev.map((inv) => {
          if (inv.id === id) {
            const newItems = data.items || inv.items;
            const total = newItems.reduce((sum, item) => sum + item.total, 0);

            // Recalculate payment due if createdAt or paymentTerms changed
            let paymentDue = inv.paymentDue;
            if (data.createdAt || data.paymentTerms) {
              const createdDate = new Date(
                data.createdAt || inv.createdAt
              );
              const dueDate = new Date(createdDate);
              dueDate.setDate(
                dueDate.getDate() + (data.paymentTerms || inv.paymentTerms)
              );
              paymentDue = dueDate.toISOString().split('T')[0];
            }

            updated = {
              ...inv,
              ...data,
              items: newItems,
              total,
              paymentDue,
            };
            return updated;
          }
          return inv;
        })
      );
      return updated;
    },
    []
  );

  const deleteInvoice = useCallback((id: string): boolean => {
    let found = false;
    setInvoices((prev) =>
      prev.filter((inv) => {
        if (inv.id === id) {
          found = true;
          return false;
        }
        return true;
      })
    );
    return found;
  }, []);

  const markAsPaid = useCallback((id: string): boolean => {
    let found = false;
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id && inv.status === 'pending') {
          found = true;
          return { ...inv, status: 'paid' as InvoiceStatus };
        }
        return inv;
      })
    );
    return found;
  }, []);

  const getFilteredInvoices = useCallback(
    (statusFilter: string): Invoice[] => {
      if (statusFilter === 'all') return invoices;
      return invoices.filter((inv) => inv.status === statusFilter);
    },
    [invoices]
  );

  return {
    invoices,
    getInvoice,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    markAsPaid,
    getFilteredInvoices,
  };
}
