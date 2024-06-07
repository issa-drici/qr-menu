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

function CategoryComponent({ category, setIsOpenDialogMore, isMoving, setIsMoving }) {
  const [categories, setCategories] = useState(category);
  const [isLoading, setIsloading] = useState(false);

  const { user } = useUserContext();
  const { pushWithLoading } = useLoadingContext();
  

  const supabaseClient = useSupabaseClient<Database>();

  const inputRef = useRef(null);
  const router = useRouter()

  async function onSubmit() {
    try {
      // setIsloading(true);

      const newCategories = Array.from(categories);

      const { data: dataUpdated, error } = await supabaseClient
        .from("category")
        .upsert(newCategories, {
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
    // setIsloading(false);
  }

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newCategories = Array.from(categories);
    const [reorderedItem] = newCategories.splice(result.source.index, 1);
    newCategories.splice(result.destination.index, 0, reorderedItem);

    for (let i = 0; i < newCategories.length; i++) {
      newCategories[i].order = `${i + 1}`;
    }

    setCategories(newCategories);

    onSubmit()
  };

  const handleEditClick = (index) => {
    const newCategories = [...categories];
    newCategories[index].displayInput = true;
    setCategories(newCategories);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleEditBlur = (index) => {
    const newCategories = [...categories];
    newCategories[index].displayInput = false;
    setCategories(newCategories);
  };

  const handleChangeInput = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].name.fr = value;
    newCategories[index].need_translation = true;
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    const newCategories = [...categories];
    newCategories.push({
      id: v4(),
      order: `${categories.length + 1}`,
      created_at: new Date(),
      profile_id: user?.id,
      name: { fr: "Nouvelle Catégorie" },
      is_active: true,
      need_translation: true
    });

    setCategories(newCategories);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleRemoveCategory = (index) => {
    const newCategories = categories.filter((_, i) => i !== index);

    setCategories(newCategories);
  };

  const handleCardClick = (e, category) => {
    if (!e.defaultPrevented && !isMoving) {
      
      pushWithLoading(`/admin/category/${category?.id}/items`);
    }
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <h1 className="text-xl font-semibold">Créez votre menu</h1>

        <p className="text-xs mt-1 mb-4 text-slate-400">Vous pouvez créer, modifier, réorganiser et supprimer les sections
          de votre menu sur cette page.</p>

        {(!isLoading && category?.length > 0) ? (
          <Droppable droppableId="droppable-categories">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {categories?.map((category, index) => (
                  <Draggable
                    key={category.id}
                    draggableId={category.id}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...(isMoving ? provided.dragHandleProps : {})}
                        className="shadow-none mb-2 border-slate-200 px-4 py-2 cursor-pointer"
                        onClick={(e) => handleCardClick(e, category)}
                      >
                        <div className="flex items-center max-h-14 gap-2 ">
                          {isMoving ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="cursor-grab text-slate-400 hover:bg-transparent w-fit h-fit"
                            >
                              <Equal size={16} />
                            </Button>
                          ) : null}
                          <CardHeader className="w-full p-0">
                            <CardTitle className="text-left text-sm font-normal leading-6">
                              {category?.name?.fr}
                            </CardTitle>
                          </CardHeader>

                          {!isMoving ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsOpenDialogMore(category);
                              }}
                              className="text-slate-400 hover:bg-transparent w-fit h-fit"
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
    </DragDropContext >
  );
}

const Category = dynamic(() => Promise.resolve(CategoryComponent), {
  ssr: false,
});

export default Category;
