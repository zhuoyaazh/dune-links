import Papa from "papaparse";

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

self.onmessage = (event: MessageEvent<string>) => {
  const csvText = event.data;

  try {
    Papa.parse<SheetRow>(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
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

        self.postMessage({ success: true, data: normalized });
      },
      error: (error: Error) => {
        self.postMessage({ success: false, error: error.message });
      },
    });
  } catch (error) {
    self.postMessage({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
