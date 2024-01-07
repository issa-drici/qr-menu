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

function CategoryComponent() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  const { user } = useUserContext();

  const supabaseClient = useSupabaseClient<Database>();

  const inputRef = useRef(null);

  async function getCategory() {
    setIsloading(true);

    const { data: category } = await supabaseClient
      .from("category")
      .select("*")
      .eq("profile_id", user?.id);

    setCategories(category);

    setIsloading(false);
  }

  async function onSubmit() {
    function removeDisplayInputFromArray(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].hasOwnProperty("displayInput")) {
          delete arr[i].displayInput;
        }
      }
      return arr;
    }

    try {
      setIsloading(true);

      const newCategories = Array.from(categories);

      for (let i = 0; i < newCategories.length; i++) {
        if (newCategories[i].hasOwnProperty("displayInput")) {
          delete newCategories[i].displayInput;
        }
      }

      const { data: dataUpdated, error } = await supabaseClient
        .from("category")
        .upsert(newCategories, {
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
    newCategories[index].name = value;
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    const newCategories = [...categories];
    newCategories.push({
      id: v4(),
      order: `${categories.length + 1}`,
      created_at: new Date(),
      profile_id: user?.id,
      name: "Nouvelle Catégorie",
      is_active: true,
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

  useEffect(() => {
    if (!isLoading) {
      getCategory();
    }
  }, [user]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Layout withAuth>
        <Card className="w-1/2 flex flex-col">
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
                              <CardHeader className="w-full">
                                {category.displayInput ? (
                                  <Input
                                    ref={inputRef}
                                    value={category.name}
                                    onChange={(e) =>
                                      handleChangeInput(index, e.target.value)
                                    }
                                    onBlur={() => handleEditBlur(index)}
                                  />
                                ) : (
                                  <CardTitle className="text-left">
                                    {category.name}
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
                                {/* <Button variant="destructive" size="icon" onClick={() => handleRemoveCategory(index)}>
                                                                    <TrashIcon className="h-4 w-4" />
                                                                </Button> */}
                                <Button
                                  variant="outline"
                                  size="icon"
                                  {...provided.dragHandleProps}
                                  className="cursor-grab"
                                >
                                  <DragHandleHorizontalIcon className="h-5 w-5" />
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
      </Layout>
    </DragDropContext>
  );
}

const Category = dynamic(() => Promise.resolve(CategoryComponent), {
  ssr: false,
});

export default Category;
