import React from 'react';

interface ServiceCardProps {
  name: string;                 // display name (can be title-cased by caller)
  description: string;
  stars: number;
  pulls: number;
  latestTag: string;
  official: boolean;
  verified: boolean;
  imageUrl?: string;            // new: image URL from mockdata.ts (future)
  logo?: string;                // backward-compat alias
  added?: boolean;
  onAdd: () => void;
  onRemove?: () => void;        // new: remove handler
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
  imageUrl,
  logo,
  added = false,
  onAdd,
  onRemove,
}: ServiceCardProps) {
  const imgSrc =
    imageUrl ??
    logo ??
    'https://static-00.iconduck.com/assets.00/docker-icon-512x512-yx9lqv3o.png';

  return (
    <article className="group h-full rounded-xl border border-gray-700 bg-gray-800/80 hover:bg-gray-800 transition-colors shadow-sm p-4 flex flex-col">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-md bg-gray-700 flex items-center justify-center overflow-hidden shrink-0">
          <img src={imgSrc} alt={name} className="h-10 w-10 object-contain" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            {/* Ensure full visibility, no truncation; allow wrapping */}
            <h3 className="text-base md:text-lg font-semibold text-white break-words leading-snug">
              {name}
            </h3>
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
          <p className="mt-1 text-sm text-gray-300">
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
        {latestTag && (
          <div className="truncate text-xs text-gray-400 ml-auto">
            :{latestTag}
          </div>
        )}
      </div>

      <div className="mt-auto pt-4">
        {added ? (
          <button
            onClick={onRemove}
            className="w-full rounded-lg px-3 py-2 text-sm font-medium transition bg-red-600 hover:bg-red-500 text-white"
            aria-label="Remove from Composer"
          >
            Remove from Composer
          </button>
        ) : (
          <button
            onClick={onAdd}
            className="w-full rounded-lg px-3 py-2 text-sm font-medium transition bg-blue-600 hover:bg-blue-500 text-white"
            aria-label="Add to Composer"
          >
            Add to Composer
          </button>
        )}
      </div>
    </article>
  );
}