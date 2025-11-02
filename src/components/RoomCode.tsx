'use client';

import { cn } from '@/lib/utils';

interface RoomCodeProps {
  code: string;
  roomUrl?: string;
}

export function RoomCode({ code, roomUrl }: RoomCodeProps) {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleCopyLink = () => {
    if (roomUrl) navigator.clipboard.writeText(roomUrl);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-bg-card rounded-lg border-2 border-border-default">
      <div className="text-center">
        <h3 className="text-sm font-semibold text-text-primary opacity-75 mb-2">
          Room Code
        </h3>
        <div className="text-5xl font-bold text-accent-green tracking-wider">
          {code}
        </div>
        <button
          onClick={handleCopyCode}
          className={cn(
            'mt-3 text-xs font-medium text-accent-green opacity-75 hover:opacity-100 transition-opacity',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green'
          )}
        >
          Copy Code
        </button>
      </div>

      {roomUrl && (
        <div className="flex flex-col items-center gap-2 w-full">
          <h3 className="text-sm font-semibold text-text-primary opacity-75">
            Share Link
          </h3>
          <div className="w-full p-3 bg-bg-primary rounded-lg text-center text-xs text-text-primary break-all">
            {roomUrl}
          </div>
          <button
            onClick={handleCopyLink}
            className={cn(
              'text-xs font-medium text-accent-green opacity-75 hover:opacity-100 transition-opacity',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green'
            )}
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}
