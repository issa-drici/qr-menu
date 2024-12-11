import { Database } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FieldInput from "@/components/field-input";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { useLoadingContext } from "@/context/loading";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { translate } from "@/lib/translate";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir minimum 2 caractères.",
  })
});

export default function DialogEditCategory({ user, category, isOpen, setIsOpen, nbCategories, handleEditedCategory }) {
  const { setIsLoadingApp } = useLoadingContext()

  const [formKey, setFormKey] = useState(0);

  const supabaseClient = useSupabaseClient<Database>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ""
    }
  });



  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (data?.name !== category?.name?.fr) {
        setIsLoadingApp(true);


        let categoryToUpdate = {
          ...category,
        }

        categoryToUpdate.name = await translate(data?.name)


        const { data: updatedCategory, error } = await supabaseClient
          .from("category")
          .update(categoryToUpdate)
          .eq('id', category?.id)
          .select()
          .single();

        handleEditedCategory(updatedCategory)
        setIsLoadingApp(false);
      }
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description:
          "Un problème est survenu lors de la mise à jour des informations.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (category) {
      form.reset({ name: category?.name?.fr });
    }
  }, [category]);


  return (
    <Dialog open={!!isOpen} onOpenChange={(isOp) => {
      if (isOp === true) return;
      setIsOpen(false);
    }}>
      <DialogContent withoutButtonClose className="max-w-[328px] rounded-lg" >

        <DialogTitle>Modifier le nom</DialogTitle>
        <DialogDescription>Actuel : {category?.name?.fr}</DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full gap-4 flex flex-col h-full"
            key={formKey}
          >
            {category ? (

              <FieldInput
                form={form}
                name="name"
                label="Nom"
                placeholder="ex: Dessert..."
              />
            ) : null}
            <div className="flex flex-col justify-center items-center w-full gap-2">
              <Button type="submit" variant="default" className="w-full">Modifier</Button>
              <Button variant="outline" className="w-full" onClick={() => {
                setFormKey(prevKey => prevKey + 1)
                setIsOpen(false)
              }}>Annuler</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}