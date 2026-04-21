export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-24">
      {/* Illustration */}
      <div className="mb-12">
        <svg
          width="242"
          height="200"
          viewBox="0 0 242 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          {/* Main circle */}
          <circle cx="136" cy="82" r="62" fill="#F9FAFE" />
          
          {/* Envelope */}
          <rect x="74" y="50" width="124" height="89" rx="4" fill="white" stroke="#DFE3FA" strokeWidth="2"/>
          
          {/* Envelope flap */}
          <path d="M74 54L136 95L198 54" stroke="#DFE3FA" strokeWidth="2" fill="none"/>
          <path d="M74 54L136 95L198 54" fill="white"/>
          
          {/* Envelope lines */}
          <path d="M78 135L106 107" stroke="#DFE3FA" strokeWidth="2" strokeLinecap="round"/>
          <path d="M194 135L166 107" stroke="#DFE3FA" strokeWidth="2" strokeLinecap="round"/>
          
          {/* Person illustration */}
          <circle cx="136" cy="72" r="18" fill="#7C5DFA"/>
          <path d="M118 72C118 62.059 126.059 54 136 54C145.941 54 154 62.059 154 72" stroke="#9277FF" strokeWidth="2"/>
          <circle cx="130" cy="70" r="2" fill="white"/>
          <circle cx="142" cy="70" r="2" fill="white"/>
          <path d="M132 76C134 78 138 78 140 76" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          
          {/* Body */}
          <path d="M116 108C116 95.85 125.85 86 138 86H134C146.15 86 156 95.85 156 108V139H116V108Z" fill="#7C5DFA"/>
          
          {/* Arms holding envelope */}
          <path d="M116 100L106 108" stroke="#7C5DFA" strokeWidth="6" strokeLinecap="round"/>
          <path d="M156 100L166 108" stroke="#7C5DFA" strokeWidth="6" strokeLinecap="round"/>
          
          {/* Megaphone */}
          <path d="M168 62L184 54V90L168 82V62Z" fill="#9277FF"/>
          <rect x="162" y="64" width="8" height="16" rx="2" fill="#7C5DFA"/>
          
          {/* Sound waves */}
          <path d="M188 58C192 62 192 82 188 86" stroke="#DFE3FA" strokeWidth="2" strokeLinecap="round"/>
          <path d="M194 52C200 58 200 86 194 92" stroke="#DFE3FA" strokeWidth="2" strokeLinecap="round"/>
          
          {/* Paper plane */}
          <path d="M58 95L44 89L50 103L54 99L58 105L60 93L58 95Z" fill="#9277FF"/>
          <path d="M50 103L54 99L58 105L60 93" stroke="#7C5DFA" strokeWidth="1"/>
          
          {/* Decorative circles */}
          <circle cx="44" cy="58" r="6" fill="#F9FAFE"/>
          <circle cx="196" cy="100" r="4" fill="#F9FAFE"/>
          <circle cx="58" cy="120" r="3" fill="#F9FAFE"/>
          
          {/* Sparkles */}
          <path d="M52 44L54 48L58 50L54 52L52 56L50 52L46 50L50 48Z" fill="#DFE3FA"/>
          <path d="M182 44L183.5 47L186 48.5L183.5 50L182 53L180.5 50L178 48.5L180.5 47Z" fill="#DFE3FA"/>
        </svg>
      </div>

      <h2 className="mb-4 text-2xl font-bold text-invoice-text-light dark:text-white">
        There is nothing here
      </h2>
      <p className="max-w-[200px] text-center text-sm text-invoice-textMuted dark:text-[#DFE3FA]">
        Create an invoice by clicking the{' '}
        <span className="font-bold text-invoice-text-light dark:text-white">
          New Invoice
        </span>{' '}
        button and get started
      </p>
    </div>
  );
}
