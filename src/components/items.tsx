// @ts-ignore
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "@/context/user";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/database.types";
import { Skeleton } from "@/components/ui/skeleton";
import { Ellipsis, Equal } from 'lucide-react';
import { v4 } from "uuid";
import { useRouter } from "next/router";
import { useLoadingContext } from "@/context/loading";

function ItemsComponent({ items, setIsOpenDialogMore, isMoving, setIsMoving }) {
  const [itemsList, setItemsList] = useState(items);
  const [isLoading, setIsloading] = useState(false);

  const { user } = useUserContext();
  const { pushWithLoading } = useLoadingContext();


  const supabaseClient = useSupabaseClient<Database>();

  const inputRef = useRef(null);
  const router = useRouter()

  async function onSubmit() {
    try {
      const newItems = Array.from(itemsList);

      const { data: dataUpdated, error } = await supabaseClient
        .from("items")
        .upsert(newItems, {
          onConflict: "id",
          merge: ["order"],
        })
        .select();

      toast({
        title: "Enregistrement réussi",
        description: "Les informations ont été mises à jour.",
        className: "bg-green-500 border-green-500 text-white",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Un problème est survenu lors de la mise à jour des informations.",
        variant: "destructive",
      });
    }
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(itemsList);
    const [reorderedItems] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItems);

    for (let i = 0; i < newItems.length; i++) {
      newItems[i].order = `${i + 1}`;
    }

    setItemsList(newItems);

    onSubmit()
  };

  const handleCardClick = (e, category) => {
    if (!e.defaultPrevented && !isMoving) {

      pushWithLoading(`/admin/category/${category?.id}/items`);
    }
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>

        {(!isLoading && items?.length > 0) ? (
          <Droppable droppableId="droppable-categories">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-3 mb-14">
                {itemsList?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...(isMoving ? provided.dragHandleProps : {})}
                        className="overflow-hidden flex p-0"
                        // onClick={(e) => handleCardClick(e, item)}
                      >
                        {isMoving ? (
                          <div className="px-4 flex justify-center items-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cursor-grab text-slate-400 hover:bg-transparent w-fit h-fit"
                            >
                              <Equal size={16} />
                            </Button>
                          </div>
                        ) : null}
                        {item?.image_url ? (
                          <img src={item?.image_url} alt="imagePlat" className="w-2/5 object-cover" />
                        ) : null}
                        <div className="flex flex-1 p-4">
                          <div className="flex flex-col flex-1 gap-1">
                            <div>
                              <p className="text-sm font-medium text-slate-900">{item?.name?.fr}</p>
                            </div>
                            <p className="text-sm text-[#64748B]">
                              {item?.description?.fr.slice(0, item?.image_url ? 30 : 75) + '...'}
                            </p>
                            <p className="text-sm text-[#64748B]">{item?.price} €</p>
                          </div>
                          {!isMoving ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsOpenDialogMore(item);
                              }}
                              className="text-slate-400 self-end hover:bg-transparent ml-2 w-fit h-fit"
                            >
                              <Ellipsis size={16} />
                            </Button>
                          ) : null}
                        </div>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : (
          <img src="/assets/images/background-menu.png" className="w-full object-contain mb-2" />
        )}
      </div>
    </DragDropContext>
  );

}

const Items = dynamic(() => Promise.resolve(ItemsComponent), {
  ssr: false,
});

export default Items;


{/* {itemsList?.length === 0 ? <img src="/assets/images/background-menu.png" className="w-full object-contain mb-2" /> : (
          <div className="flex flex-col gap-3 mb-14"> */}