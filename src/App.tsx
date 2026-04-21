import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { useInvoices } from '@/hooks/useInvoices';
import { Sidebar } from '@/components/Sidebar';
import { InvoiceList } from '@/pages/InvoiceList';
import { InvoiceDetail } from '@/pages/InvoiceDetail';
import { InvoiceFormPage } from '@/pages/InvoiceFormPage';

function App() {
  const invoicesHook = useInvoices();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-invoice-bg-light transition-colors dark:bg-invoice-bg-dark">
        <Sidebar />
        <main className="pt-20 md:pl-[103px] md:pt-0">
          <Routes>
            <Route
              path="/"
              element={<InvoiceList invoicesHook={invoicesHook} />}
            />
            <Route
              path="/invoice/:id"
              element={<InvoiceDetail invoicesHook={invoicesHook} />}
            />
            <Route
              path="/invoice/:id/edit"
              element={<InvoiceFormPage invoicesHook={invoicesHook} />}
            />
            <Route
              path="/invoice/new"
              element={<InvoiceFormPage invoicesHook={invoicesHook} />}
            />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
