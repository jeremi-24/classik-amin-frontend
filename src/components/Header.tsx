"use client";
import { Bell, Menu } from "lucide-react";
import { SearchBar } from "./Searchbar";
import Avatar from "./Avatar";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const handleSearch = (query: string) => {
    console.log("Recherche:", query);
  };

  return (
    <header className="flex items-center justify-between border-b p-4 bg-white">
      {/* Bouton de menu visible uniquement sur les petits écrans */}
      <div className="md:hidden">
        <button onClick={onMenuClick} className="text-type-dark">
          <Menu size={24} />
        </button>
      </div>

      <h1 className="text-xl font-bold text-primary hidden md:block">Tableau de bord</h1>
      {/* Sur mobile, le titre disparaît au profit du bouton de menu */}

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