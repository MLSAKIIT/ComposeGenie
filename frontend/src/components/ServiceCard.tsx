import React from 'react';

interface ServiceCardProps {
  name: string;
  description: string;
  stars: number;
  pulls: number;
  latestTag: string;
  official: boolean;
  verified: boolean;
  logo?: string;
  added?: boolean;
  onAdd: () => void;
}

function formatNum(n: number) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B';
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return String(n);
}

export default function ServiceCard({
  name,
  description,
  stars,
  pulls,
  latestTag,
  official,
  verified,
  logo,
  added = false,
  onAdd,
}: ServiceCardProps) {
  return (
    <article className="group h-full rounded-xl border border-gray-700 bg-gray-800/80 hover:bg-gray-800 transition-colors shadow-sm p-4 flex flex-col">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-md bg-gray-700 flex items-center justify-center overflow-hidden shrink-0">
          {logo ? (
            <img src={logo} alt={name} className="h-10 w-10 object-contain" />
          ) : (
            <span className="text-gray-300 text-sm">IMG</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <h3 className="text-base md:text-lg font-semibold text-white truncate">{name}</h3>
            <div className="ml-auto flex items-center gap-1 shrink-0">
              {official && (
                <span className="text-[10px] uppercase tracking-wide bg-blue-600/20 text-blue-300 border border-blue-600/40 px-1.5 py-0.5 rounded">
                  Official
                </span>
              )}
              {verified && (
                <span className="text-[10px] uppercase tracking-wide bg-emerald-600/20 text-emerald-300 border border-emerald-600/40 px-1.5 py-0.5 rounded">
                  Verified
                </span>
              )}
              {latestTag && (
                <span className="text-xs text-gray-300 bg-gray-700 rounded px-2 py-0.5">
                  {latestTag}
                </span>
              )}
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-300 min-h-[48px] overflow-hidden">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-sm text-gray-300">
        <div className="flex items-center gap-1">
          <span aria-hidden className="text-yellow-400">★</span>
          <span>{formatNum(stars)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span aria-hidden className="text-blue-400">⬇</span>
          <span>{formatNum(pulls)}</span>
        </div>
        <div className="truncate text-xs text-gray-400 ml-auto">docker.io/{name}:{latestTag}</div>
      </div>

      <div className="mt-auto pt-4">
        <button
          onClick={onAdd}
          disabled={added}
          className={`w-full rounded-lg px-3 py-2 text-sm font-medium transition
            ${added ? 'bg-gray-700 text-gray-300 cursor-default' : 'bg-blue-600 hover:bg-blue-500 text-white'}
          `}
          aria-label={added ? 'Added to Composer' : 'Add to Composer'}
        >
          {added ? 'Added' : 'Add to Composer'}
        </button>
      </div>
    </article>
  );
}