"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import type { Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
type Species = Database["public"]["Tables"]["species"]["Row"];

export default function DeleteSpeciesDialog({ species }: { species: Species }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  // bug: species is not being deleted from table
  const deleteSpecies = async () => {
    const supabase = createClientComponentClient<Database>();

    // this shows that species.id exists and is fetching the right data
    const { data: fetchData, error: fetchError } = await supabase
    .from('species')
    .select('*')
    .eq('id', species.id);
    // eslint-disable-next-line no-console
    console.log('Fetch data response:', { fetchData, fetchError });

    // this should delete species
    const { data, error, status } = await supabase.from("species").delete().eq("id", species.id);

    // this shows null
    // eslint-disable-next-line no-console
    console.log(data);

    // this shows null so there isn't an error
    // eslint-disable-next-line no-console
    console.log(error);

    // status is 204 so theoretically deletion should have been successful
    // eslint-disable-next-line no-console
    console.log(status);

    if (error) {
      return toast({
        title: "Something went wrong.",
        description: error.message,
        variant: "destructive",
      });
    }

    setOpen(false);

    // page should refresh and reflect deletion but as stated above, deletion is not working
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Icons.trash className="h-5 w-5 text-gray-500 hover:text-red-600" onClick={() => setOpen(true)} />
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Delete {species.common_name}? </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this species? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex">
          <Button className="ml-1 mr-1 flex-auto bg-red-500 hover:bg-red-500/90" onClick={() => void deleteSpecies()}>
            Confirm
          </Button>
          <Button type="button" className="ml-1 mr-1 flex-auto" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
