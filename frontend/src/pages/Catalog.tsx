import React, { useEffect, useMemo, useState } from 'react';
import { mockDockerImages, mockCategories, searchImages, type DockerImage } from '../mockdata';
import ServiceCard from '../components/ServiceCard';
import SkeletonCard from '../components/SkeletonCard';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

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

  // compute filtered results from mock data
  const filtered: DockerImage[] = useMemo(() => {
    let list = mockDockerImages.slice();
    if (category !== 'All') {
      list = list.filter((i) => i.category === category);
    }
    if (debouncedQuery.trim()) {
      const lower = debouncedQuery.toLowerCase();
      // use helper search and then apply category
      const searched = searchImages(debouncedQuery);
      list = searched.filter((i) => (category === 'All' ? true : i.category === category));
      // ensure deterministic order if helper expands later
      list = list.filter(Boolean);
      // Fallback simple filter to include more matches
      if (list.length === 0) {
        list = mockDockerImages.filter(
          (i) =>
            (category === 'All' ? true : i.category === category) &&
            (i.name.toLowerCase().includes(lower) || i.description.toLowerCase().includes(lower))
        );
      }
    }
    // sort by popularity (stars desc, pulls desc)
    list.sort((a, b) => b.stars - a.stars || b.pulls - a.pulls || a.name.localeCompare(b.name));
    return list;
  }, [category, debouncedQuery]);

  // simulate loading state on every query/category change for skeleton UX
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
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
      // Notify other parts of the app (Composer) if listening
      window.dispatchEvent(new CustomEvent('composer:addService', { detail: entry }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white">Catalog</h1>
        <p className="text-gray-300 mt-1">
          {loading
            ? 'Searching Docker images...'
            : debouncedQuery
            ? `Results for "${debouncedQuery}"`
            : 'Browse available services and add them to your compose.'}
        </p>
      </header>

      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {/* simple search icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
                <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((img) => {
              const key = `${img.name}:${img.latestTag}`;
              return (
                <ServiceCard
                  key={img.id}
                  name={img.name}
                  description={img.description}
                  stars={img.stars}
                  pulls={img.pulls}
                  latestTag={img.latestTag}
                  official={img.official}
                  verified={img.verified}
                  logo={img.logo}
                  added={!!addedMap[key]}
                  onAdd={() => onAdd(img)}
                />
              );
            })}
      </section>

      <div className="mt-8 flex items-center justify-end gap-3">
        <a
          href="/composer"
          className="rounded-lg px-4 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white"
        >
          Open Composer
        </a>
      </div>
    </div>
  );
};

export default Catalog;
