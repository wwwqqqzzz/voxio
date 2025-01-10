import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
    const authResult = await auth();
    const userId = authResult.userId;
    
    if (!userId) throw new Error("Unauthorized");
    return { userId };
}


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            const auth = await handleAuth();
            return auth;
        })
        .onUploadComplete(() => {}),
    messageFile: f(["image", "pdf"])
        .middleware(async () => {
            const auth = await handleAuth();
            return auth;
        })
        .onUploadComplete(() => {})
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
