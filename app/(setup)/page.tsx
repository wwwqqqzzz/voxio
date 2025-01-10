import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { InitialModal } from "@/components/modals/initial-modal";


const SetUpPage = async() => {
    const profile = await initialProfile();

    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        }
    });

    if (server) {
        return redirect(`/server/${server.id}`);
    }

    return <InitialModal />;
}

export default SetUpPage;