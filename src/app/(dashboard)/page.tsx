import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import Sadface from "@/components/icons/Sadface";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading Collections...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomeMsg() {
  const user = await currentUser();
  if (!user) {
    return <div>error</div>;
  }
  return (
    <div className="flex w-full mb-12">
      <h1 className=" text-4xl font-bold">
        Welcome, <br /> {user?.firstName}
      </h1>
    </div>
  );
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className=" text-4xl font-bold">
        <Skeleton className=" w-[150px] h-[36px]" />
        <Skeleton className=" w-[150px] h-[36px]" />
      </h1>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <Sadface />
          <AlertTitle>There are no collectins yet!</AlertTitle>
          <AlertDescription>Create a collectin to get started</AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );
  }
}
