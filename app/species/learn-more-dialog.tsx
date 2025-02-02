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
import Image from "next/image";
import { useState } from "react";
import type { Database } from "@/lib/schema";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function LearnMoreDialog({ species }: { species: Species }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="mt-3 w-full" onClick={() => setOpen(true)}>
            Learn More
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">{species.common_name}</DialogTitle>
            <DialogDescription>
              <div className="pb-4 text-lg font-light italic">{species.scientific_name}</div>
              <div className="text-lg">Kingdom: {species.kingdom}</div>
              {species.total_population && <div className="text-lg">Total Population: {species.total_population}</div>}
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
  );
}
