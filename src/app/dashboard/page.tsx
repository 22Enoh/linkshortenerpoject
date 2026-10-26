import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLinksByUserId } from "@/data/links";
import { CreateLinkDialog } from "./create-link-dialog";
import { DeleteLinkDialog } from "./delete-link-dialog";
import { EditLinkDialog } from "./edit-link-dialog";

async function DashboardContent() {
  const { userId } = await auth();

  if (!userId) redirect("/");

  const userLinks = await getLinksByUserId(userId);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10 sm:px-10">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Your links
        </h1>
        <CreateLinkDialog />
      </div>
      {userLinks.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No links yet</CardTitle>
            <CardDescription>
              Links you create will show up here.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <ul className="grid gap-4">
          {userLinks.map((link) => (
            <li key={link.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="truncate">/{link.shortCode}</CardTitle>
                  <CardDescription className="break-all">
                    {link.url}
                  </CardDescription>
                  <CardAction className="flex gap-2">
                    <EditLinkDialog
                      id={link.id}
                      initialUrl={link.url}
                      initialShortCode={link.shortCode}
                    />
                    <DeleteLinkDialog id={link.id} shortCode={link.shortCode} />
                  </CardAction>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Created {link.createdAt.toLocaleDateString("en-US")}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardContent />
    </Suspense>
  );
}
