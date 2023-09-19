import { TabContent, TabList, TabTrigger, Tabs } from "@/components/ui/tabs";
import { createServerSupabaseClient } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesCard from "./species-card";

export default async function SpeciesList() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  // const { data: joinedData } = await supabase
  // .from("species")
  // .select("id, profiles:author (display_name)")

  // const authorDataMap = {};
  // joinedData.forEach((item) => {
  //   authorDataMap[item.id] = item.profiles?.display_name;
  // });

  const { data: species } = await supabase.from("species").select("*");

  return (
    <>
      <Tabs defaultValue="species">
        <TabList aria-label="species tabs" className="flex justify-between">
          <div className="flex justify-start gap-6">
            <TabTrigger value="species"> Species List</TabTrigger>
            <TabTrigger value="my-species">My Species</TabTrigger>
          </div>
          <div className="mb-2">
            <AddSpeciesDialog key={new Date().getTime()} userId={session.user.id} action={"add"} />
          </div>
        </TabList>
        <TabContent value="species">
          <div className="flex flex-wrap justify-center">
            {species?.map((species) => (
              <SpeciesCard key={species.id} species={species} userId={session.user.id} />
            ))}
          </div>
        </TabContent>
        <TabContent value="my-species">
          <div className="flex flex-wrap justify-center">
            {species
              ?.filter((species) => species.author === session.user.id)
              .map((species) => (
                <SpeciesCard key={species.id} species={species} userId={session.user.id} />
              ))}
          </div>
        </TabContent>
      </Tabs>
    </>
  );
}
