"use client";

import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import {
  ChevronDown,
  ChevronUp,
  
  Pencil,
  Eye,
  MoreVertical,
  Plus,
  Download,
  Trash2,
} from "lucide-react";

export interface Column<T> {
  key: keyof T | "actions";
  header: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface ActionIcons<T> {
  edit?: (row: T) => void;
  delete?: (row: T) => void;
  view?: (row: T) => void;
  more?: (row: T) => void;
  plus?: (row: T) => void;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowsPerPage?: number;
  className?: string;
  actions?: ActionIcons<T>;
 showActions?: (keyof ActionIcons<T>)[];

}

function useDebouncedValue<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

export const DataTable = <T extends Record<string, unknown>>({
  data,
  columns,
  rowsPerPage = 10,
  className,
  actions,
  showActions = [],
}: DataTableProps<T>) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    if (!debouncedSearch) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [data, debouncedSearch]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      return (aVal > bVal ? 1 : -1) * (sortAsc ? 1 : -1);
    });
  }, [filtered, sortKey, sortAsc]);

  const totalPages = Math.ceil(sorted.length / rowsPerPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [sorted, page, rowsPerPage]);

  const handleSort = (key: keyof T) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
     <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
  <div className="flex items-center gap-2 w-full sm:w-auto">
    <input
      type="text"
      placeholder="Rechercher un élève..."
      className="px-3 py-2 border border-gray-300 rounded-md text-sm w-full sm:w-64"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
    />
    <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
      <option>Afficher par classe</option>
      {/* Exemple dynamique */}
      <option value="3em">3em</option>
    </select>
  </div>
  <Button variant="primary" icon={<Download/>} iconPosition="right" className="bg-primary-6 hover:bg-primary cursor-pointer text-white">
    Exporter en CSV
  </Button>
</div>


      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-primary-1 text-type-dark">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  className={cn("px-4 py-3 font-semibold whitespace-nowrap", col.className)}
                >
                  {col.key !== "actions" ? (
                    <button
                      onClick={() =>
                        col.sortable ? handleSort(col.key as keyof T) : null
                      }
                      className={cn(
                        "flex items-center gap-1",
                        col.sortable && "cursor-pointer"
                      )}
                    >
                      {col.header}
                      {col.sortable && sortKey === col.key && (
                        sortAsc ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginated.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={String(col.key)} className={cn("px-4 py-2", col.className)}>
                    {col.key === "actions" ? (
                      <div className="flex items-center gap-4">
                        {showActions.includes("edit") && actions?.edit && (
                          <Pencil
                            className="w-5 h-5 text-green-600 cursor-pointer  hover:scale-110 transition"
                            onClick={() => actions.edit?.(row)}
                          />
                        )}
                        {showActions.includes("delete") && actions?.delete && (
                          <Trash2
                            className="w-5 h-5 text-[#C00F0C] cursor-pointer  hover:scale-110 transition"
                            onClick={() => actions.delete?.(row)}
                          />
                        )}
                        {showActions.includes("view") && actions?.view && (
                          <Eye
                            className="w-5 h-5 text-blue-600 cursor-pointer hover:scale-110 transition"
                            onClick={() => actions.view?.(row)}
                          />
                        )}
                        {showActions.includes("more") && actions?.more && (
                          <MoreVertical
                            className="w-5 h-5 text-gray-600 cursor-pointer"
                            onClick={() => actions.more?.(row)}
                          />
                        )}
                        {showActions.includes("plus") && actions?.plus && (
                          <Plus
                            className="w-5 h-5 text-purple-600 cursor-pointer"
                            onClick={() => actions.plus?.(row)}
                          />
                        )}
                      </div>
                    ) : col.render ? (
                      col.render(row)
                    ) : (
                      String(row[col.key as keyof T] ?? "")
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-400"
                >
                  Aucun résultat trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
<div className="flex items-center justify-between mt-4">
  <Button
    variant="secondary"
    disabled={page === 1}
    onClick={() => setPage((p) => Math.max(p - 1, 1))}
  >
    Précédent
  </Button>

  <div className="flex items-center gap-2">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => setPage(i + 1)}
        className={cn(
          "w-8 h-8 text-sm rounded-md border",
          page === i + 1
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 border-gray-300"
        )}
      >
        {i + 1}
      </button>
    ))}
  </div>

  <Button
    variant="secondary"
    disabled={page === totalPages || totalPages === 0}
    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
  >
    Suivant
  </Button>
</div>

    </div>
  );
};
