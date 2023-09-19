"use client";

import type { Database } from "@/lib/schema";
import Image from "next/image";
import AddSpeciesDialog from "./add-species-dialog";
import DeleteSpeciesDialog from "./delete-species-dialog";
import LearnMoreDialog from "./learn-more-dialog";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard({
  species,
  userId,
}: {
  species: Species;
  userId: string;
}) {

  return (
    <div className="min-w-72 m-4 flex w-72 flex-none flex-col rounded border-2 p-3 shadow">
      {userId === species.author ? (
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">{species.common_name}</h3>
          <div className="flex justify-end gap-2">
            <AddSpeciesDialog key={new Date().getTime()} userId={userId} action={"edit"} species={species} />
            <DeleteSpeciesDialog species={species} />
          </div>
        </div>
      ) : (
        <h3 className="text-2xl font-semibold">{species.common_name}</h3>
      )}
      <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
      {species.image && (
        <div className="relative my-4 h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <p className="flex-grow">{species.description ? species.description.slice(0, 90).trim() + "..." : ""}</p>
      <LearnMoreDialog species={species} />
    </div>
  );
}
