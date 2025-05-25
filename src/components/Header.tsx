"use client";
import { Bell, Menu } from "lucide-react";
import { SearchBar } from "./Searchbar";
import Avatar from "./Avatar";
import { usePathname } from "next/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const handleSearch = (query: string) => {
    console.log("Recherche:", query);
  };

  const pathname = usePathname();

  const getPageTitle = (path: string): string => {
    if (path === '/dashboard') {
      return 'Tableau de bord';
    }
    if (path.startsWith('/primary')) {
      if (path === '/primary/students') {
        return 'Liste des élèves';
      }
      if (path === '/levels/college') {
        return 'Niveau Collège';
      }
      if (path === '/levels/lycee') {
        return 'Niveau Lycée';
      }
      if (path === '/primary/notes') {
        return 'Notes';
      }
      return 'Détail Niveau';
    }
    if (path === '/settings') {
      return 'Paramètres';
    }
    if (path === '/login') {
      return 'Connexion';
    }
    return 'Mon Application';
  };

  const currentTitle = getPageTitle(pathname);

  return (
    <header className="flex items-center justify-between border-b p-4 bg-white">
      <div className="md:hidden">
        <button onClick={onMenuClick} className="text-type-dark">
          <Menu size={24} />
        </button>
      </div>

      <h1 className="text-xl font-bold text-primary hidden md:block">{currentTitle}</h1>

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