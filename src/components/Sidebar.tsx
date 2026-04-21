import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-20 w-full flex-row items-center justify-between bg-sidebar md:h-screen md:w-[103px] md:flex-col md:rounded-r-[20px]">
      {/* Logo */}
      <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-r-[20px] bg-primary md:h-[103px] md:w-[103px]">
        <svg
          width="40"
          height="40"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          <path
            d="M0 0H52C63.0457 0 72 8.95431 72 20V52C72 63.0457 63.0457 72 52 72H0V0Z"
            fill="#7C5DFA"
          />
          <mask
            id="mask0"
            style={{ maskType: 'luminance' } as React.CSSProperties}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="72"
            height="72"
          >
            <path
              d="M0 0H52C63.0457 0 72 8.95431 72 20V52C72 63.0457 63.0457 72 52 72H0V0Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0)">
            <path
              d="M72 36.3496H20C8.95431 36.3496 0 45.3039 0 56.3496V88.3496C0 99.3953 8.95431 108.35 20 108.35H72V36.3496Z"
              fill="#9277FF"
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.0461 23.2385C24.8361 25.6164 22 30.087 22 35.21C22 42.8261 28.268 49.0002 36 49.0002C43.732 49.0002 50 42.8261 50 35.21C50 30.087 47.1639 25.6164 42.9539 23.2385L36.4463 36.1249L36 37.0087L35.5537 36.1249L29.0461 23.2385ZM29.9339 22.778C31.7691 21.9076 33.8267 21.4198 36 21.4198C38.1733 21.4198 40.2309 21.9076 42.0661 22.778L36 34.7903L29.9339 22.778Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Theme Toggle & Avatar */}
      <div className="flex items-center gap-6 px-6 md:flex-col md:gap-8 md:px-0 md:pb-6">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-[#858BB2] transition-colors group-hover:text-white" />
          ) : (
            <Moon className="h-5 w-5 text-[#858BB2] transition-colors group-hover:text-white" />
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
