// @ts-ignore
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
import { DragHandleHorizontalIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import Layout from "@/layout/layout";
import { useUserContext } from "@/context/user";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/database.types";
import { Skeleton } from "@/components/ui/skeleton";

import { v4 } from "uuid";

function CategoryComponent({ category }) {
  const [categories, setCategories] = useState(category);
  const [isLoading, setIsloading] = useState(false);

  const { user } = useUserContext();

  const supabaseClient = useSupabaseClient<Database>();

  const inputRef = useRef(null);

  async function translate(categories) {
    const newCategories = categories;

    // Créez un tableau de promesses pour stocker toutes les requêtes API
    const translationPromises = newCategories.map(async (newCat, index) => {
      if (newCat.need_translation) {

        const result = await fetch('/api/gpt-prompt', {
          method: 'POST',
          body: JSON.stringify({ prompt: JSON.stringify({ fr: newCat?.name?.fr }) }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const json = await result.json();

        newCategories[index].name = JSON.parse(json.response);
        newCategories[index].need_translation = false;
      }
    });

    // Utilisez Promise.all pour attendre que toutes les promesses se résolvent
    await Promise.all(translationPromises);

    return newCategories;
  }

  async function onSubmit() {
    try {
      setIsloading(true);

      const newCategories = Array.from(categories);

      const translatedArray = await translate(newCategories)

      for (let i = 0; i < translatedArray.length; i++) {
        if (translatedArray[i].hasOwnProperty("displayInput")) {
          delete translatedArray[i].displayInput;
        }

        if (translatedArray[i].hasOwnProperty("need_translation")) {
          delete translatedArray[i].need_translation;
        }
      }

      const { data: dataUpdated, error } = await supabaseClient
        .from("category")
        .upsert(translatedArray, {
          onConflict: "id",
          merge: ["created_at", "name", "order"],
        })
        .select();

      toast({
        title: "Enregistrement réussi",
        description: "Les informations ont été mises à jour.",
        className: "bg-green-500 border-green-500 text-white",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description:
          "Un problème est survenu lors de la mise à jour des informations.",
        variant: "destructive",
      });
    }
    setIsloading(false);
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card className="w-full flex flex-col">
        <CardHeader>
          <CardTitle>Gérer les différentes sections du menu</CardTitle>
          <CardDescription>
            Vous pouvez créer, modifier, réorganiser et supprimer les sections
            de votre menu sur cette page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto">
          {!isLoading ? (
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
                          className="shadow-none mb-2"
                        >
                          <div className="flex items-center max-h-14">
                          <div className="flex space-x-1 ml-3">
                              <Button
                                variant="ghost"
                                size="icon"
                                {...provided.dragHandleProps}
                                className="cursor-grab"
                              >
                                <DragHandleHorizontalIcon className="h-5 w-5" />
                              </Button>
                            </div>
                            <CardHeader className="w-full">
                              {category.displayInput ? (
                                <Input
                                  ref={inputRef}
                                  value={category?.name?.fr}
                                  onChange={(e) =>
                                    handleChangeInput(index, e.target.value)
                                  }
                                  onBlur={() => handleEditBlur(index)}
                                />
                              ) : (
                                <CardTitle className="text-left">
                                  {category?.name?.fr}
                                </CardTitle>
                              )}
                            </CardHeader>
                            <div className="flex space-x-1 mr-3">
                              <Button
                                variant="default"
                                size="icon"
                                onClick={() => handleEditClick(index)}
                              >
                                <Pencil1Icon className="h-4 w-4" />
                              </Button>
                            </div>
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
            <div className="flex flex-col space-y-2">
              <Skeleton className="w-full h-[40px] rounded" />
              <Skeleton className="w-full h-[40px] rounded" />
              <Skeleton className="w-full h-[40px] rounded" />
            </div>
          )}
          <Card
            className="group border-dashed shadow-none border-gray-300 opacity-90 hover:border-gray-400 hover:cursor-pointer"
            onClick={handleAddCategory}
          >
            <div className="flex items-center">
              <CardHeader className="w-full ">
                <CardTitle className="text-center font-normal text-gray-400 opacity-90 group-hover:text-gray-700">
                  Ajouter une nouvelle catégorie +
                </CardTitle>
              </CardHeader>
            </div>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" onClick={onSubmit}>
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </DragDropContext>
  );
}

const Category = dynamic(() => Promise.resolve(CategoryComponent), {
  ssr: false,
});

export default Category;
