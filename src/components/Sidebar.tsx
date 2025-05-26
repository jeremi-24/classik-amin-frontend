"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home, DollarSign, Settings,
  ChevronDown, ChevronUp, FileDigit,
  PlusCircle, Wallet, Paperclip,
  UserPlus, ArrowUp01, NotepadText,
  Users
} from 'lucide-react';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>({});

  const sidebarLinks = [
    { name: 'Tableau de bord', href: '/dashboard', icon: Home, tooltip: 'Accéder au tableau de bord principal' },
    { name: 'Master', href: '/master', icon: Home, tooltip: 'Accéder au tableau de bord principal' },
    {
      name: 'Gestion des élèves',
      href: '/students',
      icon: Users,
      tooltip: 'Gérer les informations des élèves',
      subLinks: [
        { name: 'Ajouter des élèves', href: '/addstudents', icon: UserPlus, tooltip: 'Inscrire de nouveaux élèves' },
        { name: 'Liste des élèves', href: '/students', icon: Paperclip, tooltip: 'Voir la liste complète des élèves' },
      ],
    },
    {
      name: 'Notes & Bulletins',
      href: '/notes',
      icon: FileDigit,
      tooltip: 'Gérer les notes et les bulletins scolaires',
      subLinks: [
        { name: 'Saisi de notes', href: '/notes', icon: ArrowUp01, tooltip: 'Saisir les notes des élèves' },
        { name: 'Bulletins', href: '/bulletins', icon: NotepadText, tooltip: 'Générer et consulter les bulletins' },
      ],
    },
    {
      name: 'Paiements',
      href: '#',
      icon: DollarSign,
      tooltip: 'Gérer les paiements et transactions',
      subLinks: [
        { name: 'Paiements reçus', href: '/payments', icon: Wallet, tooltip: 'Voir l\'historique des paiements reçus' },
        { name: 'Nouveau paiement', href: '/payments/', icon: PlusCircle, tooltip: 'Enregistrer un nouveau paiement' },
      ],
    },
    { name: 'Paramètres', href: '/settings', icon: Settings, tooltip: 'Configurer les paramètres de l\'application' },
  ];

  useEffect(() => {
    const initialOpenState: { [key: string]: boolean } = {};
    sidebarLinks.forEach(link => {
      if (link.subLinks) {
        const isSubActive = link.subLinks.some(sub => pathname.startsWith(sub.href));
        initialOpenState[link.name] = isSubActive;
      }
    });
    setOpenSubMenus(initialOpenState);
  }, [pathname]);

  const toggleSubMenu = (name: string) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const submenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md flex flex-col border-r transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="flex items-center justify-center p-[15.5px] border-b">
        <Image src="/logo/logo.png" alt="Classiq Logo" width={120} height={30} />
      </div>

      <nav className="flex-1 overflow-y-auto p-4 ">
        <ul className="space-y-2">
          {sidebarLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const isSubActive = link.subLinks?.some(sub => pathname.startsWith(sub.href));
            return (
              <li key={link.name}>
                {link.subLinks ? (
                  <div>
                    <button
                      onClick={() => toggleSubMenu(link.name)}
                      className={`flex items-center w-full px-3 py-2 rounded-lg text-left transition-colors ${
                        isSubActive
                          ? 'bg-primary-1 text-primary font-medium'
                          : 'text-type-light hover:bg-gray-100'
                      }`}
                      title={link.tooltip}
                    >
                      {link.icon && <link.icon className="w-5 h-5 mr-3" />}
                      <span className="flex-1">{link.name}</span>
                      {openSubMenus[link.name] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    <AnimatePresence>
                      {openSubMenus[link.name] && (
                        <motion.ul
                          className="ml-6 mt-2 space-y-1"
                          variants={submenuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                        >
                          {link.subLinks.map((subLink) => {
                            const subIsActive = pathname.startsWith(subLink.href);
                            return (
                              <li key={subLink.name}>
                                <Link href={subLink.href} passHref onClick={() => setIsSidebarOpen(false)}>
                                  <span
                                    className={`flex items-center px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                                      subIsActive
                                        ? 'underline text-primary font-medium'
                                        : 'text-type-dark hover:bg-gray-100'
                                    }`}
                                    title={subLink.tooltip}
                                  >
                                    {subLink.icon && <subLink.icon className="w-4 h-4 mr-2" />}
                                    {subLink.name}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link href={link.href} passHref onClick={() => setIsSidebarOpen(false)}>
                    <span
                      className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        isActive
                          ? 'bg-primary-1 text-primary font-medium'
                          : 'text-type-dark hover:bg-gray-100'
                      }`}
                      title={link.tooltip}
                    >
                      {link.icon && <link.icon className="w-5 h-5 mr-3" />}
                      {link.name}
                    </span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className='bg-primary-1 p-4 rounded-lg' >
          <p className="font-semibold text-type-dark">EPL REDAMPTEUR</p>
          <p className="text-sm text-type-light">secretariat@redampteur.com</p>
        </div>
      </div>
    </aside>
  );
}