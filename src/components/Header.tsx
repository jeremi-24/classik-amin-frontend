// components/Header.tsx
"use client";
import { Bell } from "lucide-react";
import { SearchBar } from "./Searchbar";
import Avatar from "./Avatar"; // Assurez-vous que le chemin est correct

export const Header = () => {
  const handleSearch = (query: string) => {
    console.log("Recherche:", query);
  };

  return (
    <header className="flex items-center justify-between border-b p-4 bg-white">
      <h1 className="text-xl font-bold text-primary">Tableau de bord</h1>
      <div className="flex-1 flex justify-center px-4">
        <SearchBar placeholder="Tapez une recherche" iconPosition="left" onSearch={handleSearch} className="max-w-xl" />
      </div>

      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-[var(--type-light)] cursor-pointer" />
        <Avatar alt="bobo" />
      </div>
    </header>
  );
};