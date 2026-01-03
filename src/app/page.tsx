"use client";

import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import type { ParseResult } from "papaparse";

// GANTI DENGAN LINK CSV PUBLISH TO WEB KAMU:
// Kolom yang dibaca: Label, URL, IsActive, Category (opsional)
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQnSfWYYb6UYzNSAD8ydmA7ahdkGJGiehNDLOSq6ZVj8CsxjoiJGYSd1rUDziOQ8JcHKeWri6jffV2N/pub?gid=0&single=true&output=csv";

type SheetRow = {
  Label?: string;
  URL?: string;
  IsActive?: string;
  Category?: string;
};

type LinkItem = {
  label: string;
  url: string;
  category: string;
};

export default function Home() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();

        Papa.parse<SheetRow>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: ParseResult<SheetRow>) => {
            const normalized = results.data
              .map<LinkItem | null>((row) => {
                const label = row.Label?.trim();
                const url = row.URL?.trim();
                const isActive = (row.IsActive || "").toLowerCase() === "true";
                if (!label || !url || !isActive) return null;
                return {
                  label,
                  url,
                  category: row.Category?.trim() || "Umum",
                };
              })
              .filter((item): item is LinkItem => Boolean(item));

            setLinks(normalized);
            setLoading(false);
          },
          error: (error: Error) => {
            console.error("Papa parse error", error);
            setError("Gagal parsing CSV. Cek struktur kolom.");
            setLoading(false);
          },
        });
      } catch (_error) {
        console.error("Gagal mengambil data:", _error);
        setError("Gagal mengambil data. Pastikan link publish to web benar.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const grouped = useMemo(() => {
    return links.reduce<Record<string, LinkItem[]>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [links]);

  return (
    <main className="min-h-screen relative overflow-hidden text-dune-text flex flex-col items-center py-14 px-6 font-garet">
      
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/bg-dune-dark.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
        }}
      ></div>

      {/* Dark Overlay for contrast */}
      <div className="absolute inset-0 z-[1] bg-black/60"></div>

      {/* Texture layers */}
      <div className="bg-grain z-10" aria-hidden></div>
      <div className="absolute inset-0 opacity-10 bg-halftone from-dune-text to-transparent bg-size-[16px_16px] pointer-events-none z-10" aria-hidden></div>
      <div className="absolute -top-30 left-1/2 -translate-x-1/2 w-130 h-130 bg-dune-accent blur-[150px] opacity-30 rounded-full pointer-events-none z-10" aria-hidden></div>

      {/* Content */}
      <div className="z-20 w-full max-w-3xl flex flex-col gap-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <p className="dune-heading text-[11px] uppercase text-dune-accent">
            Pusat Tautan Panitia Pemilu
          </p>
          <h1 className="dune-heading text-glow uppercase text-4xl md:text-5xl text-dune-primary whitespace-nowrap">
            HIMAFI ITB 2026/2027
          </h1>
          <p className="font-garet text-sm md:text-base opacity-80 max-w-xl mx-auto leading-relaxed">
            Hub terpusat untuk dokumen dan link penting Pemilu. Diperbarui secara otomatis dari Google Sheet.
          </p>
        </div>

        {/* Status / Tips */}
        <div className="flex flex-col gap-3 rounded-2xl border border-dune-primary/25 bg-white/5 p-4 backdrop-blur">
          <div className="flex items-center gap-3 text-sm text-dune-text/80 font-garet font-semibold">
            <span className="inline-flex h-2 w-2 rounded-full bg-dune-primary shadow-[0_0_0_6px_rgba(235,162,102,0.25)]" />
            <span>Sinkronisasi otomatis dengan database Panitia Pemilu</span>
          </div>
          <div className="text-xs text-dune-text/60 leading-relaxed font-garet">
            Link baru akan muncul otomatis setelah diaktifkan oleh admin di Google Sheet.
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6">
          {loading && (
            <div className="grid gap-3 font-garet">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 w-full rounded-xl bg-dune-primary/10 border border-dune-primary/20 animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl border border-dune-accent/40 bg-dune-accent/10 p-4 text-sm text-dune-text font-garet">
              {error}
            </div>
          )}

          {!loading && !error && links.length === 0 && (
            <div className="rounded-xl border border-dune-text/20 bg-white/5 p-4 text-sm text-dune-text/80 font-garet">
              Belum ada link aktif. Isi kolom IsActive = TRUE pada Google Sheet untuk menampilkan tombol.
            </div>
          )}

          {!loading && !error && links.length > 0 && (
            <div className="space-y-5">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="space-y-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-dune-text/70 font-dune text-glow">
                    <span className="h-[1px] w-6 bg-dune-primary/60" aria-hidden />
                    <span>{category}</span>
                  </div>

                  <div className="grid gap-3">
                    {items.map((link) => (
                      <a
                        key={`${category}-${link.label}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative block w-full overflow-hidden rounded-xl border border-dune-primary/30 bg-dune-bg/60 px-6 py-4 text-center uppercase tracking-widest shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:border-dune-primary hover:bg-dune-primary hover:text-dune-bg font-garet font-normal"
                      >
                        <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-dune-primary group-hover:border-dune-bg transition-colors" aria-hidden />
                        <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-dune-primary group-hover:border-dune-bg transition-colors" aria-hidden />
                        <span className="relative z-10">{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-[10px] font-garet font-black opacity-40 text-center tracking-[0.3em]">
          DIPERSEMBAHKAN OLEH PANITIA PEMILU HIMAFI ITB 2026/2027
        </footer>
      </div>
    </main>
  );
}