"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

import { Select } from "../../components/Select";
import { Button } from "../../components/Button";
import { SearchBar } from "../../components/Searchbar";
import { InputField } from "../../components/Input";
import { Tabs } from "../../components/Tabs";
import { RadioGroup } from "../../components/RadioGroup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/Card";
import { List } from "../../components/List";
import { Badge } from "../../components/Badge";

const options = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

const tabs = [
  { label: "Profil", value: "profile", content: <div>Contenu du profil utilisateur</div> },
  { label: "Paramètres", value: "settings", content: <div>Préférences et paramètres</div> },
  { label: "Sécurité", value: "security", content: <div>Options de sécurité et confidentialité</div> },
];

const data = [
  {
    id: 1,
    label: "EKOUE JEREMIE",
    actionLabel: "Voir le livret",
    onClick: () => alert("Voir le livret de Jeremie"),
  },
  {
    id: 2,
    label: "EKOUE JEREMIE",
    actionLabel: "Voir le livret",
    onClick: () => alert("Voir le livret de Jeremie"),
  },
];

export default function Demo() {
  const [value, setValue] = useState("");

  const handleSearch = (val: string) => {
    console.log("Recherche:", val);
  };

  return (
    <main className="p-12 space-y-16 bg-green-500  ">
      <section>
        <h2 className="text-xl font-semibold mb-2">🔽 Select</h2>
        <p className="text-xl font-bold text-muted mb-4">Composant de sélection avec options dynamiques.</p>
        <Select options={options} value={value} onChange={setValue} placeholder="Choisis une option" />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🔘 Boutons</h2>
        <p className="text-xl font-bold text-muted mb-4">Boutons avec différentes variantes et icônes.</p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Envoyer</Button>
          <Button variant="primary" icon={<Mail />} iconPosition="right">Envoyer le mail</Button>
          <Button variant="dashed">Envoyer</Button>
          <Button variant="secondary">Envoyer</Button>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🔍 Barre de recherche</h2>
        <p className="text-xl font-bold text-muted mb-4">Composant de recherche avec icône personnalisable.</p>
        <SearchBar placeholder="Tape une recherche" iconPosition="right" focused onSearch={handleSearch} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🏷️ Badge</h2>
        <p className="text-xl font-bold text-muted mb-4">Labels pour indiquer un statut.</p>
        <div className="flex gap-4">
          <Badge text="En cours" variant="orange" />
          <Badge text="Validé" variant="green" />
          <Badge text="Erreur" variant="red" />
          <Badge text="Par défaut" />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🧾 Carte</h2>
        <p className="text-xl font-bold text-muted mb-4">Exemple de carte utilisée dans un formulaire.</p>
        <Card>
          <CardHeader>
            <CardTitle>Créer un compte</CardTitle>
            <CardDescription>Remplissez les champs ci-dessous.</CardDescription>
          </CardHeader>
          <CardContent>
            <InputField
              label="Email"
              type="email"
              placeholder="email@example.com"
              icon={<Mail className="w-4 h-4" />}
              iconPosition="left"
              labelPosition="top"
            />
          </CardContent>
          <CardFooter onCancel={() => console.log("Annulé")} onSubmit={() => console.log("Soumis")} />
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">✍️ Champs de saisie</h2>
        <p className="text-xl font-bold text-muted mb-4">Composants pour la saisie de texte avec options d’icône et label.</p>
        <div className="flex flex-col gap-6 max-w-md">
          <InputField
            label="Email"
            type="email"
            placeholder="email@example.com"
            icon={<Mail className="w-4 h-4" />}
            iconPosition="left"
            labelPosition="top"
          />
          <InputField
            label="Nom"
            placeholder="Votre nom"
            labelPosition="infield"
            icon={<Mail className="w-4 h-4" />}
            iconPosition="right"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📑 Onglets (Tabs)</h2>
        <p className="text-xl font-bold text-muted mb-4">Navigation entre plusieurs sections.</p>
        <Tabs tabs={tabs} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">🔘 Groupe de radio</h2>
        <p className="text-xl font-bold text-muted mb-4">Sélection d’une seule option parmi plusieurs.</p>
        <RadioGroup
          name="fruit"
          defaultValue="apple"
          options={[
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Orange", value: "orange", disabled: true },
          ]}
          onChange={(val) => console.log("Selected:", val)}
          orientation="horizontal"
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📋 Liste avec actions</h2>
        <p className="text-xl font-bold text-muted mb-4">Affiche des éléments avec un bouton d’action pour chacun.</p>
        <List items={data} />
      </section>
    </main>
  );
}
