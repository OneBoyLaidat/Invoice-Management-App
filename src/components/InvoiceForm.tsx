import { useState, useEffect, useCallback } from 'react';
import { Trash2, Plus, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Invoice, InvoiceStatus, InvoiceItem } from '@/types/invoice';
import { v4 as uuidv4 } from 'uuid';

interface InvoiceFormProps {
  invoice?: Invoice | null;
  onSave: (data: any, status: InvoiceStatus) => void;
  onDiscard: () => void;
}

interface FormErrors {
  [key: string]: string;
}

const paymentTermsOptions = [
  { value: 1, label: 'Net 1 Day' },
  { value: 7, label: 'Net 7 Days' },
  { value: 14, label: 'Net 14 Days' },
  { value: 30, label: 'Net 30 Days' },
];

function createEmptyItem(): InvoiceItem {
  return {
    id: uuidv4(),
    name: '',
    quantity: 1,
    price: 0,
    total: 0,
  };
}

export function InvoiceForm({ invoice, onSave, onDiscard }: InvoiceFormProps) {
  const isEdit = !!invoice;

  const [senderStreet, setSenderStreet] = useState('');
  const [senderCity, setSenderCity] = useState('');
  const [senderPostCode, setSenderPostCode] = useState('');
  const [senderCountry, setSenderCountry] = useState('');

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientStreet, setClientStreet] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [clientPostCode, setClientPostCode] = useState('');
  const [clientCountry, setClientCountry] = useState('');

  const [invoiceDate, setInvoiceDate] = useState('');
  const [paymentTerms, setPaymentTerms] = useState(30);
  const [description, setDescription] = useState('');

  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (invoice) {
      setSenderStreet(invoice.senderAddress.street);
      setSenderCity(invoice.senderAddress.city);
      setSenderPostCode(invoice.senderAddress.postCode);
      setSenderCountry(invoice.senderAddress.country);

      setClientName(invoice.clientName);
      setClientEmail(invoice.clientEmail);
      setClientStreet(invoice.clientAddress.street);
      setClientCity(invoice.clientAddress.city);
      setClientPostCode(invoice.clientAddress.postCode);
      setClientCountry(invoice.clientAddress.country);

      setInvoiceDate(invoice.createdAt);
      setPaymentTerms(invoice.paymentTerms);
      setDescription(invoice.description);
      setItems(invoice.items.map((item) => ({ ...item, id: item.id || uuidv4() })));
    } else {
      setInvoiceDate(new Date().toISOString().split('T')[0]);
      setItems([]);
    }
  }, [invoice]);

  const addItem = () => {
    setItems((prev) => [...prev, createEmptyItem()]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          if (field === 'quantity' || field === 'price') {
            updated.total = updated.quantity * updated.price;
          }
          return updated;
        }
        return item;
      })
    );
  };

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let hasEmptyFields = false;

    if (!senderStreet.trim()) { newErrors.senderStreet = "can't be empty"; hasEmptyFields = true; }
    if (!senderCity.trim()) { newErrors.senderCity = "can't be empty"; hasEmptyFields = true; }
    if (!senderPostCode.trim()) { newErrors.senderPostCode = "can't be empty"; hasEmptyFields = true; }
    if (!senderCountry.trim()) { newErrors.senderCountry = "can't be empty"; hasEmptyFields = true; }

    if (!clientName.trim()) { newErrors.clientName = "can't be empty"; hasEmptyFields = true; }
    if (!clientEmail.trim()) {
      newErrors.clientEmail = "can't be empty";
      hasEmptyFields = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail)) {
      newErrors.clientEmail = 'invalid email';
    }
    if (!clientStreet.trim()) { newErrors.clientStreet = "can't be empty"; hasEmptyFields = true; }
    if (!clientCity.trim()) { newErrors.clientCity = "can't be empty"; hasEmptyFields = true; }
    if (!clientPostCode.trim()) { newErrors.clientPostCode = "can't be empty"; hasEmptyFields = true; }
    if (!clientCountry.trim()) { newErrors.clientCountry = "can't be empty"; hasEmptyFields = true; }

    if (!invoiceDate) { newErrors.invoiceDate = "can't be empty"; hasEmptyFields = true; }
    if (!description.trim()) { newErrors.description = "can't be empty"; hasEmptyFields = true; }

    if (items.length === 0) {
      newErrors.items = '- An item must be added';
    } else {
      items.forEach((item, index) => {
        if (!item.name.trim()) { newErrors[`itemName_${index}`] = "can't be empty"; hasEmptyFields = true; }
        if (item.quantity <= 0) { newErrors[`itemQty_${index}`] = "can't be empty"; hasEmptyFields = true; }
        if (item.price < 0) { newErrors[`itemPrice_${index}`] = "can't be empty"; hasEmptyFields = true; }
      });
    }

    if (hasEmptyFields) {
      newErrors.general = '- All fields must be added';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [senderStreet, senderCity, senderPostCode, senderCountry, clientName, clientEmail, clientStreet, clientCity, clientPostCode, clientCountry, invoiceDate, description, items]);

  const handleSubmit = (status: InvoiceStatus) => {
    if (status === 'draft') {
      saveInvoice(status);
    } else {
      if (validate()) {
        saveInvoice(status);
      }
    }
  };

  const saveInvoice = (status: InvoiceStatus) => {
    const formData = {
      senderAddress: {
        street: senderStreet,
        city: senderCity,
        postCode: senderPostCode,
        country: senderCountry,
      },
      clientName,
      clientEmail,
      clientAddress: {
        street: clientStreet,
        city: clientCity,
        postCode: clientPostCode,
        country: clientCountry,
      },
      createdAt: invoiceDate,
      paymentTerms,
      description,
      items: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.quantity * item.price,
      })),
    };

    onSave(formData, status);
  };

  const inputClass = (error?: string) =>
    `w-full rounded-md border px-5 h-[48px] text-sm font-bold text-invoice-text-light transition-colors outline-none dark:bg-[#1E2139] dark:text-white ${
      error ? 'border-destructive focus:border-destructive' : 'border-[#DFE3FA] hover:border-primary focus:border-primary dark:border-[#252945] dark:hover:border-primary dark:focus:border-primary'
    }`;

  const labelClass = 'text-xs text-invoice-textSecondary dark:text-[#DFE3FA]';

  const Field = ({ label, error, children }: { label: string, error?: string, children: React.ReactNode }) => (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <label className={`text-xs ${error ? 'text-destructive dark:text-destructive' : 'text-invoice-textSecondary dark:text-[#DFE3FA]'}`}>{label}</label>
        {error && <span className="text-[10px] font-semibold text-destructive">{error}</span>}
      </div>
      {children}
    </div>
  );

  return (
    <div className="flex h-full flex-col">
      {/* Scrollable Content */}
      <div className="scrollbar-thin flex-1 overflow-y-auto px-6 py-8 md:px-14 md:py-14">
        <button
          onClick={onDiscard}
          className="mb-8 flex items-center gap-6 text-sm font-bold text-invoice-text-light transition-colors hover:text-invoice-textSecondary dark:text-white dark:hover:text-[#DFE3FA] md:hidden"
        >
          <svg width="7" height="10" viewBox="0 0 7 10" fill="none">
            <path d="M6.34223 1.55736L2.5286 5.37099L6.34223 9.18461" stroke="#7C5DFA" strokeWidth="2" />
          </svg>
          Go back
        </button>

        <h1 className="mb-12 text-2xl font-bold text-invoice-text-light dark:text-white md:text-3xl">
          {isEdit ? (
            <>
              Edit <span className="text-invoice-textSecondary">#</span>
              {invoice?.id}
            </>
          ) : (
            'New Invoice'
          )}
        </h1>

        {/* Bill From */}
        <section className="mb-12">
          <h2 className="mb-6 text-sm font-bold text-primary">Bill From</h2>
          <div className="space-y-6">
            <Field label="Street Address" error={errors.senderStreet}>
              <input
                type="text"
                value={senderStreet}
                onChange={(e) => setSenderStreet(e.target.value)}
                className={inputClass(errors.senderStreet)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              <Field label="City" error={errors.senderCity}>
                <input
                  type="text"
                  value={senderCity}
                  onChange={(e) => setSenderCity(e.target.value)}
                  className={inputClass(errors.senderCity)}
                />
              </Field>
              <Field label="Post Code" error={errors.senderPostCode}>
                <input
                  type="text"
                  value={senderPostCode}
                  onChange={(e) => setSenderPostCode(e.target.value)}
                  className={inputClass(errors.senderPostCode)}
                />
              </Field>
              <div className="col-span-2 md:col-span-1">
                <Field label="Country" error={errors.senderCountry}>
                  <input
                    type="text"
                    value={senderCountry}
                    onChange={(e) => setSenderCountry(e.target.value)}
                    className={inputClass(errors.senderCountry)}
                  />
                </Field>
              </div>
            </div>
          </div>
        </section>

        {/* Bill To */}
        <section className="mb-12">
          <h2 className="mb-6 text-sm font-bold text-primary">Bill To</h2>
          <div className="space-y-6">
            <Field label="Client's Name" error={errors.clientName}>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className={inputClass(errors.clientName)}
              />
            </Field>
            <Field label="Client's Email" error={errors.clientEmail}>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                placeholder="e.g. email@example.com"
                className={inputClass(errors.clientEmail)}
              />
            </Field>
            <Field label="Street Address" error={errors.clientStreet}>
              <input
                type="text"
                value={clientStreet}
                onChange={(e) => setClientStreet(e.target.value)}
                className={inputClass(errors.clientStreet)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
              <Field label="City" error={errors.clientCity}>
                <input
                  type="text"
                  value={clientCity}
                  onChange={(e) => setClientCity(e.target.value)}
                  className={inputClass(errors.clientCity)}
                />
              </Field>
              <Field label="Post Code" error={errors.clientPostCode}>
                <input
                  type="text"
                  value={clientPostCode}
                  onChange={(e) => setClientPostCode(e.target.value)}
                  className={inputClass(errors.clientPostCode)}
                />
              </Field>
              <div className="col-span-2 md:col-span-1">
                <Field label="Country" error={errors.clientCountry}>
                  <input
                    type="text"
                    value={clientCountry}
                    onChange={(e) => setClientCountry(e.target.value)}
                    className={inputClass(errors.clientCountry)}
                  />
                </Field>
              </div>
            </div>
          </div>
        </section>

        {/* Invoice Details */}
        <section className="mb-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Field label="Invoice Date" error={errors.invoiceDate}>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn(inputClass(errors.invoiceDate), "text-left flex items-center justify-between")}>
                    {invoiceDate ? format(new Date(invoiceDate), "dd MMM yyyy") : "Pick a date"}
                    <CalendarIcon className="h-4 w-4 text-primary opacity-100" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white dark:bg-[#252945] border-none shadow-xl">
                  <Calendar
                    mode="single"
                    selected={invoiceDate ? new Date(invoiceDate) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        setInvoiceDate(format(date, "yyyy-MM-dd"));
                      }
                    }}
                    initialFocus
                    className="p-4 w-full"
                    classNames={{
                      root: "w-full",
                      months: "w-full flex flex-col relative",
                      month: "w-full flex flex-col gap-4",
                      table: "w-full border-collapse",
                      head_row: "flex w-full justify-between",
                      row: "flex w-full justify-between mt-2"
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field label="Payment Terms" error={errors.paymentTerms}>
              <Select value={String(paymentTerms)} onValueChange={(val) => setPaymentTerms(Number(val))}>
                <SelectTrigger className={cn(inputClass(errors.paymentTerms), "flex items-center justify-between [&>svg]:text-primary [&>svg]:opacity-100")}>
                  <SelectValue placeholder="Select Payment Terms" />
                </SelectTrigger>
                <SelectContent position="popper" className="w-[var(--radix-select-trigger-width)] bg-white dark:bg-[#252945] rounded-lg border-none shadow-card z-50">
                  {paymentTermsOptions.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={String(opt.value)}
                      className="font-bold text-invoice-text-light dark:text-[#DFE3FA] focus:text-primary dark:focus:text-primary border-b border-[#DFE3FA] dark:border-[#1E2139] last:border-0 cursor-pointer px-6 py-4"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="mt-6">
            <Field label="Project Description" error={errors.description}>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Graphic Design Service"
                className={inputClass(errors.description)}
              />
            </Field>
          </div>
        </section>

        {/* Item List */}
        <section className="mb-8">
          <h2 className="mb-6 text-lg font-bold text-[#777F98]">Item List</h2>

          {/* Desktop Headers */}
          <div className="mb-4 hidden grid-cols-[1fr_60px_120px_80px_40px] gap-4 md:grid">
            <span className="text-xs text-invoice-textSecondary-light dark:text-invoice-textSecondary-dark">Item Name</span>
            <span className="text-xs text-invoice-textSecondary-light dark:text-invoice-textSecondary-dark">Qty.</span>
            <span className="text-xs text-invoice-textSecondary-light dark:text-invoice-textSecondary-dark">Price</span>
            <span className="text-xs text-invoice-textSecondary-light dark:text-invoice-textSecondary-dark">Total</span>
            <span />
          </div>

          {items.map((item, index) => (
            <div key={item.id} className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_60px_120px_80px_40px] md:items-center">
              
              {/* Name Input */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2 md:hidden">
                  <label className={errors[`itemName_${index}`] ? 'text-xs text-destructive' : labelClass}>Item Name</label>
                  {errors[`itemName_${index}`] && <span className="text-[10px] font-semibold text-destructive">{errors[`itemName_${index}`]}</span>}
                </div>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                  className={inputClass(errors[`itemName_${index}`])}
                />
              </div>

              {/* Grouped for mobile line, un-grouped for desktop grid using md:contents */}
              <div className="flex items-center gap-4 md:contents">
                
                {/* Qty Input */}
                <div className="flex w-[60px] flex-col md:w-auto">
                  <div className="flex items-center justify-between mb-2 md:hidden">
                    <label className={errors[`itemQty_${index}`] ? 'text-xs text-destructive' : labelClass}>Qty.</label>
                    {errors[`itemQty_${index}`] && <span className="text-[10px] font-semibold text-destructive">{errors[`itemQty_${index}`]}</span>}
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', Math.max(1, parseInt(e.target.value) || 0))}
                    className={inputClass(errors[`itemQty_${index}`])}
                  />
                </div>

                {/* Price Input */}
                <div className="flex flex-1 flex-col md:w-auto">
                  <div className="flex items-center justify-between mb-2 md:hidden">
                    <label className={errors[`itemPrice_${index}`] ? 'text-xs text-destructive' : labelClass}>Price</label>
                    {errors[`itemPrice_${index}`] && <span className="text-[10px] font-semibold text-destructive">{errors[`itemPrice_${index}`]}</span>}
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => updateItem(item.id, 'price', Math.max(0, parseFloat(e.target.value) || 0))}
                    className={inputClass(errors[`itemPrice_${index}`])}
                  />
                </div>

                {/* Total */}
                <div className="flex w-[80px] flex-col md:w-auto">
                  <label className={`${labelClass} md:hidden`}>Total</label>
                  <p className="pt-3 text-sm font-bold text-invoice-textMuted-light dark:text-[#DFE3FA] md:pt-0">
                    {item.total.toFixed(2)}
                  </p>
                </div>

                {/* Delete Button */}
                <div className="flex flex-col pt-6 md:w-auto md:pt-0">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-[#888EB0] transition-colors hover:text-destructive"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>  
              </div>
            </div>
          ))}

          <Button
            onClick={addItem}
            variant="secondary"
            className="mt-4 w-full rounded-full bg-[#F9FAFE] py-3 text-sm font-bold text-invoice-textMuted transition-colors hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139]"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>

          {(errors.general || errors.items) && (
            <div className="mt-8 flex flex-col items-start gap-1">
              {errors.general && <p className="text-[10px] font-semibold text-destructive">{errors.general}</p>}
              {errors.items && <p className="text-[10px] font-semibold text-destructive">{errors.items}</p>}
            </div>
          )}
        </section>
      </div>

      {/* Fixed Footer Buttons */}
      <div className="shrink-0 rounded-t-2xl md:rounded-none border-t border-transparent bg-white px-6 py-6 dark:bg-invoice-card-dark md:px-14" style={{boxShadow: '0 -10px 10px -10px rgba(0, 0, 0, 0.1)'}}>
        <div className="flex items-center justify-between gap-2 md:gap-3">
          {isEdit ? (
            <>
              <Button
                onClick={onDiscard}
                variant="secondary"
                className="rounded-full bg-[#F9FAFE] px-6 py-3 text-sm font-bold text-invoice-textMuted hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139]"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmit('pending')}
                className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-light"
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={onDiscard}
                variant="secondary"
                className="rounded-full bg-[#F9FAFE] px-4 py-3 text-sm font-bold text-invoice-textMuted hover:bg-[#DFE3FA] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139] md:px-6"
              >
                Discard
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSubmit('draft')}
                  variant="secondary"
                  className="rounded-full bg-[#373B53] px-4 py-3 text-sm font-bold text-[#888EB0] hover:bg-[#0C0E16] dark:bg-[#373B53] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139] md:px-6"
                >
                  Save as Draft
                </Button>
                <Button
                  onClick={() => handleSubmit('pending')}
                  className="rounded-full bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-light md:px-6"
                >
                  Save & Send
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}