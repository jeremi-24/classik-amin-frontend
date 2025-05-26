"use client";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { InputField } from "@/components/Input";
import { Select } from "@/components/Select";
import { useState } from "react";

const options = [
  { label: "ADMIN", value: "ADMIN" },
  { label: "SECRETAIRE", value: "SECRETAIRE" },
 
];

export default function LoginPage() {

  const [value, setValue] = useState("");


  
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-[var(--background)] p-4">
      <div className=" p-6 flex h-auto w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-[var(--white)] shadow-lg md:flex-row">
        <div className="w-full p-10 md:w-1/2 items-start flex flex-col  ">
          <h1 className="text-3xl font-bold mb-2 text-[var(--type-dark)]">Connectez-vous</h1>
          <p className=" text-lg mb-8 text-[var(--type-light)]">pour accéder à votre espace de travail</p>

          <form className="space-y-4 w-full">
           <Select className="w-full" options={options} value={value} onChange={setValue} placeholder="Choisis un role" />

           <InputField
              label="Email"
              type="email"
              placeholder="Entrer votre email"
              icon={<Mail className="h-4 w-4" />}
            />
            <InputField
              label="Mot de passe"
              type="password"
              placeholder="Entrer votre mot de passe"
              icon={<Lock className="h-4 w-4" />}
            />

            <Link href="#" className="block text-right text-sm text-[var(--primary)] hover:underline">
              Mot de passe oublié
            </Link>
            <Button type="submit" className="w-full">
              Se Connecter
            </Button>
            <div className="flex items-center justify-center">
              <span className="h-px w-full bg-[var(--border)]"></span>
              <span className="px-2 text-[var(--type-light)]">ou</span>
              <span className="h-px w-full bg-[var(--border)]"></span>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--type-dark)]">
            Vous n&apos;avez pas de compte?{" "}
            <Link href="#" className="text-[var(--primary)] hover:underline">
              S&apos;inscrire
            </Link>
          </p>
        </div>

        <div className="relative hidden w-full rounded-lg md:block md:w-1/2">
          <Image
            src="/images/logo.png"
            alt="Illustration of a person working"
            layout="fill"
            objectFit="cover"
            priority
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}