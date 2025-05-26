"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const levels = [
  {
    name: "Primaire",
    description: "CP1 à CM2",
    image: "/images/primary.png",
    id: "primary",
  },
  {
    name: "Collège",
    description: "6ème en 3ème",
    image: "/images/college.png",
    id: "college", 
  },
  {
    name: "Lycée",
    description: "2nd en Terminal",
    image: "/images/lycee.png",
    id: "lycee", 
  },
];

export default function NiveauPage() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 md:px-6 bg-[var(--color-background)]">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-10 ">
        Choisissez le niveau à gérer !
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {levels.map((level) => (
          <Link 
            href={`/${level.id}/dashboard`} 
            key={level.name}
          >
            <div
              className={cn(
                "flex flex-col items-center p-4 space-y-4 cursor-pointer transition-all duration-300 hover:scale-105",
                "h-[374px] w-[296px] rounded-2xl shadow-md border bg-[var(--color-white)]",
                
                pathname.startsWith(`/${level.id}`) && "border-4 border-[var(--color-primary)]"
              )}
            >
              <Image
                src={level.image}
                alt={level.name}
                width={271}
                height={258}
                className="rounded-xl object-cover"
              />
              <div className=" flex flex-col gap-2 " >
                <h2 className="text-2xl text-center font-semibold text-[var(--color-type-dark)]">
                  {level.name}
                </h2>
                <p className="text-[var(--color-type-light)] text-xl ">
                  {level.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}