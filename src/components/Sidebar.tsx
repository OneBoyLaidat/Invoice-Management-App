import { useTheme } from '@/context/ThemeContext';

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-20 w-full flex-row items-center justify-between bg-sidebar md:h-screen md:w-[103px] md:flex-col md:rounded-r-[20px]">
      {/* Logo */}
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-r-[20px] bg-primary md:h-[103px] md:w-[103px]">
        {/* Lighter purple bottom half */}
        <div className="absolute bottom-0 left-0 h-1/2 w-full rounded-tl-[20px] bg-[#9277FF]" />
        {/* White center icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26" className="relative z-10 w-7 h-[26px] md:w-10 md:h-[37px]">
          <path fill="#FFF" fillRule="evenodd" d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"/>
        </svg>
      </div>

      {/* Theme Toggle & Avatar */}
      <div className="flex items-center gap-6 px-6 md:flex-col md:gap-8 md:px-0 md:pb-6">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="text-[#858BB2] transition-colors group-hover:text-[#DFE3FA]"><path d="M9.805 12.441a2.636 2.636 0 1 1 0-5.272 2.636 2.636 0 0 1 0 5.272ZM9.516.484V3.12a.633.633 0 0 0 1.266 0V.484a.633.633 0 1 0-1.266 0Zm6.56 1.834-1.864 1.864a.633.633 0 1 0 .895.895l1.865-1.865a.633.633 0 1 0-.895-.895ZM19.126 9.172h-2.637a.633.633 0 1 0 0 1.265h2.637a.633.633 0 0 0 0-1.265Zm-3.048 6.56-1.865-1.864a.633.633 0 1 0-.895.895l1.865 1.865a.633.633 0 1 0 .895-.895ZM10.782 18.834v-2.637a.633.633 0 1 0-1.266 0v2.637a.633.633 0 1 0 1.266 0Zm-6.56-1.834 1.864-1.865a.633.633 0 1 0-.895-.895l-1.865 1.865a.633.633 0 1 0 .895.895ZM.484 10.437h2.637a.633.633 0 1 0 0-1.265H.484a.633.633 0 1 0 0 1.265Zm3.048-6.56 1.865 1.864a.633.633 0 1 0 .895-.895l-1.865-1.865a.633.633 0 1 0-.895.895Z" fill="currentColor" fillRule="nonzero"/></svg>
          ) : (
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" className="text-[#858BB2] transition-colors group-hover:text-[#858BB2] md:group-hover:text-[#7C5DFA]"><path d="M19.502 11.342a.703.703 0 0 0-.588.128 7.499 7.499 0 0 1-2.275 1.33 7.123 7.123 0 0 1-2.585.46A7.516 7.516 0 0 1 6.54 5.745c0-1.045.206-2.073.6-3.051A.706.706 0 0 0 6.627 1.6 8.945 8.945 0 0 0 .498 9.593a8.945 8.945 0 0 0 8.946 8.946 8.945 8.945 0 0 0 8.945-8.946c0-.52-.046-1.04-.14-1.549a.704.704 0 0 0-.747-.585Z" fill="currentColor" fillRule="nonzero"/></svg>
          )}
        </button>

        {/* Divider */}
        <div className="hidden h-px w-full bg-[#494E6E] md:block" />
        <div className="h-8 w-px bg-[#494E6E] md:hidden" />

        {/* Avatar */}
        <div className="h-8 w-8 overflow-hidden rounded-full md:h-10 md:w-10">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
            alt="User avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </aside>
  );
}
