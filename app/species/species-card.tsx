"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react";
import AddSpeciesDialog from "./add-species-dialog";
import DeleteSpeciesDialog from "./delete-species-dialog";
type Species = Database["public"]["Tables"]["species"]["Row"];

// type SpeciesWithProfile = Species & {
//   profile: {
//     display_name: string;
//   };
// };

// type TablesData = SpeciesWithProfile[] | null;

export default function SpeciesCard({
  species,
  userId,
}: {
  species: Species;
  userId: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

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
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="mt-3 w-full" onClick={() => setOpen(true)}>
              Learn More
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
            <DialogHeader>
              <div className="flex justify-between">
                <DialogTitle className="text-2xl font-semibold">{species.common_name}</DialogTitle>
                <div>Added By:</div>
              </div>
              <DialogDescription>
                <div className="pb-4 text-lg font-light italic">{species.scientific_name}</div>
                <div className="text-lg">Kingdom: {species.kingdom}</div>
                {species.total_population && (
                  <div className="text-lg">Total Population: {species.total_population}</div>
                )}
                {species.image && (
                  <div className="relative my-4 h-80 w-full">
                    <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
                  </div>
                )}
                <div className="text-lg">{species.description}</div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
