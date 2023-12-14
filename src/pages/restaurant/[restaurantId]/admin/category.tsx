// @ts-ignore
'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import dynamic from "next/dynamic"
import { ChevronRightIcon, DragHandleHorizontalIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"

function CategoryComponent() {
    const [categories, setCategories] = useState([]);

    const inputRef = useRef(null);

    function onSubmit() {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 bg-slate-500">
                    <code className="text-white">{JSON.stringify(categories, null, 2)}</code>
                </pre>
            ),
        })
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
        newCategories[index].title = value;
        setCategories(newCategories);
    };

    const handleAddCategory = () => {
        const newCategories = [...categories];
        newCategories.push({ order: `${categories.length + 1}`, title: 'Nouvelle Catégorie', displayInput: true })

        setCategories(newCategories);

        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    const handleRemoveCategory = (index) => {
        const newCategories = categories.filter((_, i) => i !== index);

        setCategories(newCategories);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex justify-center p-10 gap-x-5">
                <Card className="w-1/2">
                    <CardHeader>
                        <CardTitle>Gérer les différentes sections du menu</CardTitle>
                        <CardDescription>Vous pouvez créer, modifier, réorganiser et supprimer les sections de votre menu sur cette page.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Droppable droppableId="droppable-categories">
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef} >
                                    {categories.map((category, index) => (
                                        <Draggable key={category.order} draggableId={category.order} index={index}>
                                            {(provided) => (
                                                <Card
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    className="shadow-none mb-2">
                                                    <div className="flex items-center max-h-14">
                                                        <CardHeader className="w-full">
                                                            {category.displayInput ?
                                                                <Input ref={inputRef} value={category.title} onChange={e => handleChangeInput(index, e.target.value)} onBlur={() => handleEditBlur(index)} />
                                                                :
                                                                <CardTitle className="text-left">{category.title}</CardTitle>}
                                                        </CardHeader>
                                                        <div className="flex space-x-1 mr-3">
                                                            <Button variant="default" size="icon" onClick={() => handleEditClick(index)}>
                                                                <Pencil1Icon className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="destructive" size="icon" onClick={() => handleRemoveCategory(index)}>
                                                                <TrashIcon className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="outline" size="icon" {...provided.dragHandleProps} className="cursor-grab">
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
                        <Card className="group border-dashed shadow-none border-gray-300 opacity-90 hover:border-gray-400 hover:cursor-pointer" onClick={handleAddCategory}>
                            <div className="flex items-center">
                                <CardHeader className="w-full ">
                                    <CardTitle className="text-center font-normal text-gray-400 opacity-90 group-hover:text-gray-700">Ajouter une nouvelle catégorie +</CardTitle>
                                </CardHeader>
                            </div>
                        </Card>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type="submit" onClick={onSubmit}>Enregistrer</Button>
                    </CardFooter>
                </Card>
            </div>
        </DragDropContext >
    )
}

const Category = dynamic(() => Promise.resolve(CategoryComponent), {
    ssr: false,
});

export default Category;