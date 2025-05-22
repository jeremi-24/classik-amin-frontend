"use client";

import { Badge } from "../../components/Badge";
import { DataTable, Column } from "../../components/DataTable";

const students = [
  { nom: "AGLAN Yao", sexe: "M", classe: "3em", lieu: "GHANA, Tema", adresse: "Tokoin Wuiti", date: "6/7/2020" },
  { nom: "KOFFI Adjo", sexe: "F", classe: "4em", lieu: "TOGO, Lomé", adresse: "Bè Klikamé", date: "8/3/2021" },
  { nom: "AMENYO Kossi", sexe: "M", classe: "5em", lieu: "BENIN, Cotonou", adresse: "Adidogomé", date: "2/12/2019" },
  { nom: "DZIDZI Afi", sexe: "F", classe: "6em", lieu: "GHANA, Accra", adresse: "Agoè Zongo", date: "1/1/2022" },
  { nom: "TETTEH Kwaku", sexe: "M", classe: "3em", lieu: "GHANA, Kumasi", adresse: "Avédji", date: "10/10/2020" },
  { nom: "AYELE Sena", sexe: "F", classe: "5em", lieu: "TOGO, Kpalimé", adresse: "Lankouvi", date: "7/5/2021" },
  { nom: "AGBO Kodjo", sexe: "M", classe: "4em", lieu: "BENIN, Porto-Novo", adresse: "Hanoukopé", date: "3/9/2020" },
  { nom: "ESSO Edem", sexe: "M", classe: "6em", lieu: "TOGO, Sokodé", adresse: "Amadahomé", date: "11/11/2022" },
  { nom: "SEWA Elom", sexe: "F", classe: "3em", lieu: "GHANA, Tamale", adresse: "Adakpamé", date: "9/6/2019" },
  { nom: "AHOUA Mawuli", sexe: "M", classe: "4em", lieu: "COTE D'IVOIRE, Abidjan", adresse: "Kodjoviakopé", date: "4/7/2020" },
  { nom: "LOKE Mawunyo", sexe: "F", classe: "5em", lieu: "TOGO, Kara", adresse: "Baguida", date: "6/6/2021" },
  { nom: "GNON Sika", sexe: "F", classe: "6em", lieu: "GHANA, Ho", adresse: "Sagbado", date: "8/8/2022" },
  { nom: "YAO Eric", sexe: "M", classe: "3em", lieu: "TOGO, Atakpamé", adresse: "Hédzranawoé", date: "2/2/2020" },
  { nom: "KPANOU Léa", sexe: "F", classe: "4em", lieu: "BENIN, Parakou", adresse: "Ablogamé", date: "5/3/2023" },
  { nom: "FOLI Joel", sexe: "M", classe: "5em", lieu: "TOGO, Dapaong", adresse: "Totsi", date: "12/1/2021" },
  { nom: "ADANU Grace", sexe: "F", classe: "6em", lieu: "GHANA, Cape Coast", adresse: "Agbalépédogan", date: "7/7/2020" },
  { nom: "KOUASSI N'Dri", sexe: "M", classe: "3em", lieu: "COTE D'IVOIRE, Bouaké", adresse: "Zanguéra", date: "10/12/2022" },
  { nom: "ANANI Justine", sexe: "F", classe: "4em", lieu: "TOGO, Tsévié", adresse: "Lomnava", date: "11/11/2019" },
  { nom: "AGNON Paterne", sexe: "M", classe: "5em", lieu: "BENIN, Bohicon", adresse: "Agoè Nyivé", date: "9/9/2021" },
  { nom: "KAFUI Marie", sexe: "F", classe: "6em", lieu: "TOGO, Lomé", adresse: "Adidogomé", date: "3/3/2020" }
];


export default function StudentsPage() {
  const columns: Column<typeof students[0]>[] = [
    { key: "nom", header: "Nom", sortable: true },
    { key: "sexe", header: "Sexe", sortable: true },
    { key: "classe", header: "Classe", sortable: true, render: (row) => <Badge text={row.classe} variant="primary" />, },
    { key: "lieu", header: "Lieu", sortable: false },
    { key: "adresse", header: "Adresse", sortable: false },
    { key: "date", header: "Date d'inscription", sortable: true },
    { key: "actions", header: "Actions" },
  ];

  const actions = {
    edit: (row: typeof students[0]) => {
      console.log("Modifier :", row);
    },
    delete: (row: typeof students[0]) => {
      console.log("Supprimer :", row);
    },
    view: (row: typeof students[0]) => {
      console.log("Voir :", row);
    },
  };

  return (
    <div className="p-6 w-6/8  ">
      <h1 className="text-2xl font-bold mb-4">Liste des élèves</h1>
      <DataTable
        data={students}
        columns={columns}
        actions={actions}
        showActions={["edit", "delete", "view"]}
      />
    </div>
  );
}


