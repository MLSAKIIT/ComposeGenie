import React, { useEffect, useMemo, useState } from 'react';
import { mockDockerImages, mockCategories, type DockerImage } from '../mockdata';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import '../styles/catalogue.css';

type SelectedService = { name: string; tag: string };
const STORAGE_KEY = 'composer:selectedServices';

function loadSelections(): SelectedService[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveSelections(items: SelectedService[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function toTitleCase(s: string) {
  return s
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Prefix 'v' for version-like tags (e.g., 1.25.3 -> v1.25.3). Leave non-version tags (e.g., latest) unchanged.
function formatVersionTag(tag?: string) {
  if (!tag) return '';
  if (/^v/i.test(tag)) return tag;
  if (/^\d/.test(tag)) return `v${tag}`;
  return tag;
}

const Catalog = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [loading, setLoading] = useState(false);
  const [addedMap, setAddedMap] = useState<Record<string, boolean>>({});
  const debouncedQuery = useDebouncedValue(query, 350);

  // initialize added state from localStorage
  useEffect(() => {
    const saved = loadSelections();
    const map: Record<string, boolean> = {};
    saved.forEach((s) => (map[`${s.name}:${s.tag}`] = true));
    setAddedMap(map);
  }, []);

  // compute filtered results from mock data (name/description/tags + category)
  const filtered: DockerImage[] = useMemo(() => {
    let list = mockDockerImages.slice();
    if (category !== 'All') {
      list = list.filter((i) => i.category === category);
    }
    const q = debouncedQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((i) => {
        const inName = i.name.toLowerCase().includes(q);
        const inDesc = i.description.toLowerCase().includes(q);
        const inTags = Array.isArray(i.tags) && i.tags.some((t) => t.toLowerCase().includes(q));
        return inName || inDesc || inTags;
      });
    }
    // sort by popularity (stars desc, pulls desc)
    list.sort((a, b) => b.stars - a.stars || b.pulls - a.pulls || a.name.localeCompare(b.name));
    return list;
  }, [category, debouncedQuery]);

  // simulate loading state on every query/category change for skeleton UX
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, [debouncedQuery, category]);

  const onAdd = (img: DockerImage) => {
    const entry: SelectedService = { name: img.name, tag: img.latestTag };
    const existing = loadSelections();
    const key = `${entry.name}:${entry.tag}`;
    if (!existing.some((e) => e.name === entry.name && e.tag === entry.tag)) {
      const next = [...existing, entry];
      saveSelections(next);
      setAddedMap((prev) => ({ ...prev, [key]: true }));
      window.dispatchEvent(new CustomEvent('composer:addService', { detail: entry }));
    }
  };

  const onRemove = (img: DockerImage) => {
    const key = `${img.name}:${img.latestTag}`;
    const existing = loadSelections().filter((e) => !(e.name === img.name && e.tag === img.latestTag));
    saveSelections(existing);
    setAddedMap((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    window.dispatchEvent(new CustomEvent('composer:removeService', { detail: { name: img.name, tag: img.latestTag } }));
  };

  const headerText = loading
    ? 'Searching Docker images...'
    : debouncedQuery
    ? `Results for "${debouncedQuery}"`
    : 'Browse available services and add them to your compose.';

  const placeholderLogo =
    'https://static-00.iconduck.com/assets.00/docker-icon-512x512-yx9lqv3o.png';

  return (
    <div className="catalogue-page max-w-7xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">Catalog</h1>
        <p className="text-gray-300 mt-1">{headerText}</p>
      </header>

      {/* Search on top, categories below for better UI */}
      <div className="mb-6 space-y-3">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
              <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search images (e.g. nginx, postgres, redis)"
            className="w-full rounded-xl bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 pl-10 pr-9 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search Docker images"
          />
          {query && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              title="Clear"
            >
              ×
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-2 flex-wrap">
            {mockCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-sm border transition
                  ${
                    category === cat
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700'
                  }`}
                aria-pressed={category === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="grid items-stretch gap-5 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-full rounded-xl border border-gray-700 bg-gray-800 p-4 animate-pulse flex flex-col">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-md bg-gray-700" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 bg-gray-700 rounded" />
                    <div className="h-3 w-3/4 bg-gray-700 rounded" />
                  </div>
                </div>
                <div className="mt-4 flex gap-3">
                  <div className="h-3 w-16 bg-gray-700 rounded" />
                  <div className="h-3 w-16 bg-gray-700 rounded" />
                  <div className="h-3 w-24 bg-gray-700 rounded" />
                </div>
                <div className="mt-auto pt-4 h-9 w-full bg-gray-700 rounded" />
              </div>
            ))
          : filtered.map((img) => {
              const key = `${img.name}:${img.latestTag}`;
              const added = !!addedMap[key];
              const displayName = toTitleCase(img.name);
              const imgUrl = (img as any).logo || (img as any).imageUrl || placeholderLogo;

              return (
                <article
                  key={img.id}
                  className="catalogue-card group h-full rounded-xl border border-gray-700 bg-gray-800/80 hover:bg-gray-800 transition-colors shadow-sm p-4 flex flex-col"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={imgUrl}
                      alt={displayName}
                      className="catalogue-card-logo"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-2">
                        <h3 className="service-title text-base md:text-lg font-semibold text-white">
                          {displayName}
                        </h3>
                        <div className="ml-auto flex items-center gap-1 shrink-0">
                          {img.latestTag && (
                            <span className="text-xs text-gray-300 bg-gray-700 rounded px-2 py-0.5">
                              {formatVersionTag(img.latestTag)}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="catalogue-desc mt-1 text-sm text-gray-300">
                        {img.description}
                      </p>
                    </div>
                  </div>

                  <div className="catalogue-card-footer mt-auto pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="catalogue-stats flex items-center gap-4 text-sm text-gray-300">
                        <div className="flex items-center gap-1">
                          <span aria-hidden className="text-yellow-400">★</span>
                          <span>
                            {img.stars >= 1_000_000_000
                              ? (img.stars / 1_000_000_000).toFixed(1) + 'B'
                              : img.stars >= 1_000_000
                              ? (img.stars / 1_000_000).toFixed(1) + 'M'
                              : img.stars >= 1_000
                              ? (img.stars / 1_000).toFixed(1) + 'K'
                              : String(img.stars)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span aria-hidden className="text-blue-400">⬇</span>
                          <span>
                            {img.pulls >= 1_000_000_000
                              ? (img.pulls / 1_000_000_000).toFixed(1) + 'B'
                              : img.pulls >= 1_000_000
                              ? (img.pulls / 1_000_000).toFixed(1) + 'M'
                              : img.pulls >= 1_000
                              ? (img.pulls / 1_000).toFixed(1) + 'K'
                              : String(img.pulls)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {added ? (
                          <button
                            onClick={() => onRemove(img)}
                            className="rounded-lg px-3 py-2 text-sm font-medium bg-red-600 hover:bg-red-500 text-white"
                            aria-label={`Remove ${displayName}`}
                            title="Remove from Composer"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            onClick={() => onAdd(img)}
                            className="catalogue-btn-add bg-blue-600 hover:bg-blue-500 text-white shrink-0 font-medium"
                            aria-label={`Add ${displayName}`}
                            title="Add to Composer"
                          >
                            Add to Composer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
      </section>

      {/* Fixed CTA in bottom-right */}
      <a href="/composer" className="catalogue-composer-fab" aria-label="Open Composer">
        Open Composer
      </a>
    </div>
  );
};

export default Catalog;
