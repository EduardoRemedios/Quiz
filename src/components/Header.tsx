'use client';

export function Header() {
  return (
    <header className="w-full px-4 py-3 bg-bg-primary/80 backdrop-blur-xl border-b border-border-default/30 flex-shrink-0">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-accent-green shadow-sm"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-accent-white border border-accent-green shadow-sm"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-accent-red shadow-sm"></div>
          </div>
          <h1 className="text-base font-semibold text-accent-green tracking-tight">Symphony Quiz</h1>
        </div>
        <p className="text-xs text-text-primary/50 font-medium hidden sm:block">
          Designed & Developed by Eduardo Remedios
        </p>
        <p className="text-xs text-text-primary/50 font-medium sm:hidden">
          By Eduardo Remedios
        </p>
      </div>
    </header>
  );
}
