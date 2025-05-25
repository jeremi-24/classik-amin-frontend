'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Header } from '@/components/Header';

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // Ce div est maintenant le conteneur flex principal
    <div className="flex flex-1"> {/* Ajout de 'flex' et 'flex-1' ici */}
      {/* Sidebar - Visible par défaut sur md et plus, caché/déplaçable sur les petits écrans */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Contenu principal - Prend tout l'espace restant, avec une marge sur md et plus */}
      <div className="flex-1 flex flex-col "> {/* md:ml-64 reste pour compenser la largeur sur desktop */}
        {/* Header - Contient le bouton de bascule de la sidebar pour mobile */}
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className={`h-full flex flex-col `}>
      <div className="bg-white rounded-lg border shadow-sm p-6 m-2 flex-grow">
        {children}
      </div>
    </div>
      </div>

      {/* Overlay pour mobile lorsque la sidebar est ouverte */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}