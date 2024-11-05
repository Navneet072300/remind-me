"use client";

import { Collection } from "@prisma/client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CollectionColor, CollectionColors } from "@/lib/constants";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteCollection } from "@/actions/collections";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  collection: Collection;
}
const tasks: string[] = ["task 1", "Task 2"];

export default function CollectionCard({ collection }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      toast({
        title: "Success",
        description: "Collection deleted successfully",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex w-full justify-between p-6",
            isOpen && "rounded-b-none",
            CollectionColors[collection.color as CollectionColor]
          )}
        >
          <span className="text-white font-bold">{collection.name}</span>
          {!isOpen && <ChevronDown size={30} />}
          {isOpen && <ChevronUp size={30} />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex rounded-b-md flex-col dark:bg-neutral-900 shadow-lg">
        {tasks.length == 0 && <div>No tasks</div>}
        {tasks.length > 0 && (
          <>
            <Progress className="rounded-none" value={45} />
            <div className="p-4 gap-4 flex flex-col">
              {tasks.map((task) => (
                <div>Mocked task</div>
              ))}
            </div>
          </>
        )}
        <Separator />
        <footer className="h-[40px] px-4 p-[2px] text-xs text-neutral-500 flex items-center justify-between">
          <p>Created at {collection.createdAt.toDateString()}</p>
          <div className="flex items-center">
            <Button size={"icon"} variant={"ghost"}>
              <Plus size={30} />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                  <Trash2 size={30} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your collection and all tasks inside it.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      removeCollection();
                    }}
                  >
                    Proceed
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </footer>
      </CollapsibleContent>
    </Collapsible>
  );
}
