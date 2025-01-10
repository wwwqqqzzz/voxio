import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export const initialProfile = async () => {
    const user = await currentUser();

    if (!user) {
        redirect("/sign-in");
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    // If profile exists, return it
    if (profile) {
        return profile;            
    }

    // If no profile exists, create a new one
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });
    return newProfile;
}