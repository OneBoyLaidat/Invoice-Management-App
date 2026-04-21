import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { StatusFilter } from '@/types/invoice';

interface FilterDropdownProps {
  value: StatusFilter;
  onChange: (value: StatusFilter) => void;
}

const options: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'draft', label: 'Draft' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
];

export function FilterDropdown({ value, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (selected: StatusFilter) => {
    onChange(selected);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 text-sm font-bold text-invoice-text-light transition-colors hover:text-invoice-textSecondary dark:text-white dark:hover:text-[#DFE3FA]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="hidden md:inline">Filter by status</span>
        <span className="md:hidden">Filter</span>
        <ChevronDown
          className={`h-4 w-4 text-primary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-4 w-48 rounded-lg bg-white p-4 shadow-lg dark:bg-invoice-card-dark dark:shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
          <ul role="listbox" className="flex flex-col gap-2">
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                className="cursor-pointer"
              >
                <button
                  onClick={() => handleSelect(option.value)}
                  className="flex w-full items-center gap-3 rounded px-2 py-1.5 text-left text-sm font-bold text-invoice-text-light transition-colors hover:bg-[#F9FAFE] dark:text-[#DFE3FA] dark:hover:bg-[#252945]"
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                      value === option.value
                        ? 'border-primary bg-primary'
                        : 'border-invoice-textSecondary dark:border-[#DFE3FA]'
                    }`}
                  >
                    {value === option.value && (
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    )}
                  </span>
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
