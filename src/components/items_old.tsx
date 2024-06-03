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

import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TrashIcon } from "@radix-ui/react-icons";
import { useUserContext } from "@/context/user";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/database.types";
import { Skeleton } from "@/components/ui/skeleton";
import { v4 } from "uuid";
import Dropzone from "./dropzone";
import FieldInput from "./field-input";
import { useRouter } from "next/router";

function ItemsComponent({ category, item }) {
  const router = useRouter()

  const [items, setItems] = useState(item);

  const [isClear, setIsClear] = useState(true);
  const [activeCategory, setActiveCategory] = useState(category[0]?.id);
  const [isLoading, setIsloading] = useState(false);

  const { user } = useUserContext();

  const supabaseClient = useSupabaseClient<Database>();

  async function getFileWithPath(path: string) {
    const { data } = await supabaseClient.storage
      .from("images")
      .getPublicUrl(path);

    return data?.publicUrl;
  }

  const inputRef = useRef(null);

  const form = useForm();


  async function translate(items) {
    let newItems = items;

    // Créez un tableau de promesses pour stocker toutes les requêtes API
    const translationPromises = newItems.map(async (newIt, index) => {

      if (newIt.need_name_translation) {
        const resultName = await fetch('/api/gpt-prompt', {
          method: 'POST',
          body: JSON.stringify({ prompt: JSON.stringify({ fr: newIt?.name?.fr }) }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const jsonName = await resultName.json();
        newItems[index].name = JSON.parse(jsonName.response);
        newItems[index].need_name_translation = false;
      }

      if (newIt.need_description_translation) {
        const resultDescription = await fetch('/api/gpt-prompt', {
          method: 'POST',
          body: JSON.stringify({ prompt: JSON.stringify({ fr: newIt?.description?.fr }) }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const jsonDescription = await resultDescription.json();
        newItems[index].description = JSON.parse(jsonDescription.response);
        newItems[index].need_description_translation = false;
      }
    });

    // Utilisez Promise.all pour attendre que toutes les promesses se résolvent
    await Promise.all(translationPromises);

    return newItems;
  }

  async function onSubmit() {
    try {
      setIsloading(true);

      const newItems = Array.from(items);
      const translatedArray = await translate(newItems);


      // Process images
      const processedItems = await Promise.all(translatedArray.map(async (item) => {
        if (!item?.image) {
          return item;
        }

        const fileName = item?.image_path ? item?.image_path : `images_${Date.now()}.png`;
        const { data: fileUpdated, error: fileError } = await supabaseClient.storage
          .from("images")
          .upload(fileName, item?.image, {
            upsert: item?.image_path ? true : false,
          });

        if (fileError) {
          throw fileError;
        }

        const path = await getFileWithPath(fileUpdated?.path);
        return { ...item, image_url: path, image_path: fileUpdated?.path };
      }));

      for (let i = 0; i < processedItems.length; i++) {

        if (processedItems[i].hasOwnProperty("image")) {
          delete processedItems[i].image;
        }

        if (processedItems[i].hasOwnProperty("need_name_translation")) {
          delete processedItems[i].need_name_translation;
        }
        if (processedItems[i].hasOwnProperty("need_description_translation")) {
          delete processedItems[i].need_description_translation;
        }
      }
      // Update database
      const { data: dataUpdated, error } = await supabaseClient
        .from("items")
        .upsert(processedItems, {
          onConflict: "id",
          merge: ["created_at", "name", "description", "image_url", "image_path", "price", "order"],
        })
        .select();

      if (error) {
        throw error;
      }

      setItems(dataUpdated)

      toast({
        title: "Enregistrement réussi",
        description: "Les informations ont été mises à jour.",
        className: "bg-green-500 border-green-500 text-white",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la mise à jour des informations.",
        variant: "destructive",
      });
    } finally {
      setIsClear(true);
      setIsloading(false);
      router?.reload()
    }
  }

  const handleAddItem = () => {
    const newItems = [...items];
    newItems.push({
      id: v4(),
      profile_id: user?.id,
      category_id: activeCategory,
      order: `${items.length + 1}`,
      name: { fr: "Nouvel élément" },
      description: { fr: "Description de l'élément" },
      price: 0.0,
      created_at: new Date(),
    });

    setItems(newItems);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleChangeNameItem = (index, value) => {
    setIsClear(false);

    const newItems = [...items];
    newItems[index].name.fr = value;
    newItems[index].need_name_translation = true;
    setItems(newItems);
  };

  const handleChangeDescriptionItem = (index, value) => {
    setIsClear(false);

    const newItems = [...items];
    newItems[index].description.fr = value;
    newItems[index].need_description_translation = true;
    setItems(newItems);
  };

  const handleChangePriceItem = (index, value) => {
    setIsClear(false);

    const newItems = [...items];
    newItems[index].price = value;
    setItems(newItems);
  };

  const handleChangeCategory = (value) => {
    if (!isClear) {
      alert(
        "Des changements sont en cours, merci de sauvegarder avant de changer de catégorie"
      );

      return;
    }
    // else {
    //   const itemsFinded = items?.filter((it) => {
    //     return (
    //       it.name.fr === "Nouvel élément" &&
    //       it.description.fr === "Description de l'élément" &&
    //       it.price === 0
    //     );
    //   });

    //   if (itemsFinded?.length) {
    //     alert(
    //       "Des changements sont en cours, merci de sauvegarder avant de changer de catégorie"
    //     );

    //     return;
    //   }

    setActiveCategory(value);

    setIsClear(true);
    // }
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => {
      return i !== index;
    });

    setItems(newItems);

    if (newItems.length < 1) {
      setIsClear(true);
    }
  };

  const onImageChange = (index, event) => {
    const newItems = [...items];

    if (event.target.files && event.target.files[0]) {
      newItems[index].image_url = URL.createObjectURL(event.target.files[0]);
      newItems[index].image = event.target.files[0];
      setItems(newItems);
    } else {
      newItems[index].image_url = null;
      newItems[index].image = null
      setItems(newItems);
    }
  };

  const displayPreviewImage = (item) => {
    if (item?.image) {
      console.log(1)
      return item?.image_url
    }

    if (!!!item?.image && item?.image_url) {
      console.log(2)
      return `${item?.image_url}?v=${new Date()}`
    }
    console.log(3)

    return null
  }

  useEffect(() => {
    setItems(item?.filter((i) => i.category_id === activeCategory))
  }, [activeCategory]);


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gérer les articles du restaurant</CardTitle>
        <CardDescription>
          Vous pouvez ajouter / modifier / supprimer les articles de vos
          sections à cet endroit.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-2 flex-grow h-full overflow-hidden">
        <div className="w-full md:w-1/3 flex flex-col space-y-3 overflow-y-auto">
          {category?.map((cat) => {
            return (
              <Button
                key={cat.id}
                className="px-2 py-1 h-fit"
                variant={activeCategory === cat.id ? "default" : "secondary"}
                onClick={() => handleChangeCategory(cat.id)}>
                {cat.name.fr}
              </Button>
            )
          })}
        </div>
        <Separator orientation="vertical" />
        <div className="w-full md:w-2/3 flex flex-col gap-y-3 overflow-y-auto">
          <Form {...form}>
            <form
              // onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 flex flex-col h-full"
            >
              {!isLoading ? (
                items?.map((item, index) => {
                  return (
                    <div
                      className="border rounded shadow p-5 flex flex-col gap-4"
                      key={index}
                    >
                      {/* <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button> */}
                      <FieldInput
                        form={form}
                        type="file"
                        name={`image_${item?.id}`}
                        label={<Dropzone
                          fileSrc={displayPreviewImage(item)}
                          className="w-full h-44 object-cover"
                          label="Image"
                        />
                        }
                        onChange={(e) => onImageChange(index, e)}
                      />
                      <div className="flex gap-4">
                        <FormItem className="w-full">
                          <FormLabel>Nom</FormLabel>
                          <FormControl
                            onChange={(e) =>
                              handleChangeNameItem(index, e.target.value)
                            }
                          >
                            <Input
                              ref={inputRef}
                              value={item.name?.fr}
                              placeholder="Nom de l'élément"
                            />
                          </FormControl>
                        </FormItem>
                        <FormItem className="w-1/2">
                          <FormLabel>Prix</FormLabel>
                          <FormControl
                            onChange={(e) =>
                              handleChangePriceItem(index, e.target.value)
                            }
                          >
                            <Input
                              value={item.price}
                              type="number"
                              placeholder="Description de l'élément"
                              step="0.01"
                            />
                          </FormControl>
                        </FormItem>
                      </div>
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl
                          onChange={(e) =>
                            handleChangeDescriptionItem(index, e.target.value)
                          }
                        >
                          <Textarea
                            value={item.description?.fr}
                            placeholder="Description de l'élément"
                          />
                        </FormControl>
                      </FormItem>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col space-y-2">
                  <Skeleton className="w-full h-[40px] rounded" />
                  <Skeleton className="w-full h-[40px] rounded" />
                  <Skeleton className="w-full h-[40px] rounded" />
                </div>
              )}
            </form>
          </Form>
          <Card
            className="group border-dashed shadow-none border-gray-300 opacity-90 hover:border-gray-400 hover:cursor-pointer"
            onClick={handleAddItem}
          >
            <div className="flex items-center">
              <CardHeader className="w-full ">
                <CardTitle className="text-center font-normal text-gray-400 opacity-90 group-hover:text-gray-700">
                  Ajouter une nouvel élément +
                </CardTitle>
              </CardHeader>
            </div>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={() => onSubmit()}>Enregistrer</Button>
      </CardFooter>

    </Card>
  );
}

const Items = dynamic(() => Promise.resolve(ItemsComponent), {
  ssr: false,
});

export default Items;



// import Phone from "@/components/phone";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { toast } from "@/components/ui/use-toast";
// import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
// import dynamic from "next/dynamic";
// import { useEffect, useRef, useState } from "react";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import FieldInput from "@/components/field-input";
// import FieldTextarea from "@/components/field-textarea";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { TrashIcon } from "@radix-ui/react-icons";
// import Layout from "@/layout/layout";
// import { useUserContext } from "@/context/user";
// import { useSupabaseClient } from "@supabase/auth-helpers-react";
// import { Database } from "@/types/database.types";
// import { Skeleton } from "@/components/ui/skeleton";
// import { v4 } from "uuid";

// function ItemsComponent({ category, item }) {
//   const [categories, setCategories] = useState(category);
//   const [items, setItems] = useState(item);

//   const [isClear, setIsClear] = useState(true);
//   const [activeCategory, setActiveCategory] = useState();
//   const [isLoading, setIsloading] = useState(false);

//   const { user } = useUserContext();

//   const supabaseClient = useSupabaseClient<Database>();

//   const inputRef = useRef(null);

//   const form = useForm();


//   async function onSubmit() {
//     try {
//       setIsloading(true);

//       const { data: dataUpdated, error } = await supabaseClient
//         .from("items")
//         .upsert(items, {
//           onConflict: "id",
//           merge: ["created_at", "name", "description", "price", "order"],
//         })
//         .select();

//       toast({
//         title: "Enregistrement réussi",
//         description: "Les informations ont été mises à jour.",
//         className: "bg-green-500 border-green-500 text-white",
//       });
//     } catch (error) {
//       console.error("Erreur:", error);
//       toast({
//         title: "Erreur",
//         description:
//           "Un problème est survenu lors de la mise à jour des informations.",
//         variant: "destructive",
//       });
//     }
//     setIsClear(true);
//     setIsloading(false);
//   }

//   const handleAddItem = () => {
//     const newItems = [...items];
//     newItems.push({
//       id: v4(),
//       profile_id: user?.id,
//       category_id: activeCategory,
//       order: `${items.length + 1}`,
//       name: { fr: "Nouvel élément" },
//       description: { fr: "Description de l'élément" },
//       price: 0.0,
//       created_at: new Date(),
//     });

//     setItems(newItems);

//     setTimeout(() => {
//       inputRef.current?.focus();
//     }, 0);
//   };

//   const handleChangeNameItem = (index, value) => {
//     setIsClear(false);

//     const newItems = [...items];
//     newItems[index].name.fr = value;
//     setItems(newItems);
//   };

//   const handleChangeDescriptionItem = (index, value) => {
//     setIsClear(false);

//     const newItems = [...items];
//     newItems[index].description.fr = value;
//     setItems(newItems);
//   };

//   const handleChangePriceItem = (index, value) => {
//     setIsClear(false);

//     const newItems = [...items];
//     newItems[index].price = value;
//     setItems(newItems);
//   };

//   const handleChangeCategory = (value) => {
//     if (!isClear) {
//       alert(
//         "Des changements sont en cours, merci de sauvegarder avant de changer de catégorie"
//       );

//       return;
//     } else {
//       const itemsFinded = items?.filter((it) => {
//         return (
//           it.name.fr === "Nouvel élément" &&
//           it.description.fr === "Description de l'élément" &&
//           it.price === 0
//         );
//       });

//       if (itemsFinded?.length) {
//         alert(
//           "Des changements sont en cours, merci de sauvegarder avant de changer de catégorie"
//         );

//         return;
//       }

//       setActiveCategory(value);

//       setIsClear(true);
//     }
//   };

//   const handleRemoveItem = (index) => {
//     const newItems = items.filter((_, i) => {
//       return i !== index;
//     });

//     setItems(newItems);

//     if (newItems.length < 1) {
//       setIsClear(true);
//     }
//   };

//   const onImageChange = (index, event) => {
//     const newItems = [...items];

//     if (event.target.files && event.target.files[0]) {
//       newItems[index].image = URL.createObjectURL(event.target.files[0]);
//       setItems(newItems);
//     } else {
//       newItems[index].image = null;
//       setItems(newItems);
//     }
//   };

//   const PreviewBanner = () => {
//     let imageLink = "/assets/images/marketing_offer.png";

//     if (user?.banner_url) {
//       imageLink = `${user?.banner_url}?v=${new Date()}`;
//     }

//     return (
//       <img
//         src={imageLink}
//         alt="marketingOffer"
//         className="w-full h-[80px] object-cover"
//       />
//     );
//   };

//   const PreviewLogo = () => {
//     let imageLink = "/assets/images/logo.png";

//     if (user?.logo_url) {
//       imageLink = `${user?.logo_url}?v=${new Date()}`;
//     }

//     return (
//       <img
//         src={imageLink}
//         alt="language"
//         className="object-cover w-5"
//         style={{ width: `${user?.width_logo}%` }}
//       />
//     );
//   };

//   useEffect(() => {
//     if (!isLoading) {
//       getCategory();
//       getItems();
//       if (categories?.length > 0) {
//         setActiveCategory(categories[0]?.id);
//       }
//     }
//   }, [user]);

//   useEffect(() => {
//     if (categories?.length > 0) {
//       setActiveCategory(categories[0]?.id);
//     }
//   }, [categories]);

//   return (
//     <Layout withAuth>
//       <Card className="w-2/3 flex flex-col">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="w-full space-y-6 flex flex-col h-full"
//           >
//             <CardHeader>
//               <CardTitle>Gérer les articles du restaurant</CardTitle>
//               <CardDescription>
//                 Vous pouvez ajouter / modifier / supprimer les articles de vos
//                 sections à cet endroit.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="flex gap-x-2 flex-grow h-full overflow-hidden">
//               <div className="w-1/3 flex flex-col space-y-3 overflow-y-auto">
//                 {!isLoading ? (
//                   categories?.map((category) => {
//                     return (
//                       <Button
//                         key={category.id}
//                         variant={
//                           activeCategory === category.id
//                             ? "default"
//                             : "secondary"
//                         }
//                         onClick={() => handleChangeCategory(category.id)}
//                       >
//                         {category.name}
//                       </Button>
//                     );
//                   })
//                 ) : (
//                   <div className="flex flex-col space-y-2">
//                     <Skeleton className="w-full h-[40px] rounded" />
//                     <Skeleton className="w-full h-[40px] rounded" />
//                     <Skeleton className="w-full h-[40px] rounded" />
//                   </div>
//                 )}
//               </div>
//               <Separator orientation="vertical" />
//               <div className="w-2/3 flex flex-col gap-y-3 overflow-y-auto">
//                 {!isLoading ? (
//                   items?.map((item, index) => {
//                     return (
//                       <div
//                         className="border p-5 flex flex-col gap-4"
//                         key={index}
//                       >
//                         <Button
//                           variant="destructive"
//                           size="icon"
//                           onClick={() => handleRemoveItem(index)}
//                         >
//                           <TrashIcon className="h-4 w-4" />
//                         </Button>
//                         <div className="flex gap-4">
//                           <FormItem className="w-full">
//                             <FormLabel>Nom</FormLabel>
//                             <FormControl
//                               onChange={(e) =>
//                                 handleChangeNameItem(index, e.target.value)
//                               }
//                             >
//                               <Input
//                                 ref={inputRef}
//                                 value={item.name?.fr}
//                                 placeholder="Nom de l'élément"
//                               />
//                             </FormControl>
//                           </FormItem>
//                           <FormItem className="w-1/2">
//                             <FormLabel>Prix</FormLabel>
//                             <FormControl
//                               onChange={(e) =>
//                                 handleChangePriceItem(index, e.target.value)
//                               }
//                             >
//                               <Input
//                                 value={item.price}
//                                 type="number"
//                                 placeholder="Description de l'élément"
//                                 step="0.01"
//                               />
//                             </FormControl>
//                           </FormItem>
//                         </div>
//                         <FormItem>
//                           <FormLabel>Description</FormLabel>
//                           <FormControl
//                             onChange={(e) =>
//                               handleChangeDescriptionItem(index, e.target.value)
//                             }
//                           >
//                             <Textarea
//                               value={item.description?.fr}
//                               placeholder="Description de l'élément"
//                             />
//                           </FormControl>
//                         </FormItem>
//                         <FormItem>
//                           <FormLabel>Image</FormLabel>
//                           <FormControl
//                             onChange={(e) => onImageChange(index, e)}
//                           >
//                             <Input
//                               type="file"
//                               className="file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
//                             />
//                           </FormControl>
//                         </FormItem>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div className="flex flex-col space-y-2">
//                     <Skeleton className="w-full h-[40px] rounded" />
//                     <Skeleton className="w-full h-[40px] rounded" />
//                     <Skeleton className="w-full h-[40px] rounded" />
//                   </div>
//                 )}
//                 <Card
//                   className="group border-dashed shadow-none border-gray-300 opacity-90 hover:border-gray-400 hover:cursor-pointer"
//                   onClick={handleAddItem}
//                 >
//                   <div className="flex items-center">
//                     <CardHeader className="w-full ">
//                       <CardTitle className="text-center font-normal text-gray-400 opacity-90 group-hover:text-gray-700">
//                         Ajouter une nouvel élément +
//                       </CardTitle>
//                     </CardHeader>
//                   </div>
//                 </Card>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-end">
//               <Button type="submit">Enregistrer</Button>
//             </CardFooter>
//           </form>
//         </Form>
//       </Card>
//       <Card className="flex-1">
//         <CardHeader>
//           <CardTitle>Aperçu du menu</CardTitle>
//           <CardDescription>
//             Voici une prévisualisation de la présentation de votre menu en
//             ligne.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="flex justify-center">
//           <Phone>
//             <div className="text-xs">
//               <div>
//                 <div className="flex justify-between py-1 pl-2 pr-3">
//                   <div className="flex items-center gap-x-0.5">
//                     <PreviewLogo />
//                     {!user?.hide_name ? (
//                       <p className="text-[10px] font-bold">
//                         {user?.name ? user?.name : "Mon restaurant"}
//                       </p>
//                     ) : null}
//                   </div>
//                 </div>
//                 {/* Image Marketing Restaurant */}
//                 <PreviewBanner />
//               </div>
//               <div className="flex px-3 py-3 gap-x-0.5">
//                 {!isLoading ? (
//                   categories?.map((category) => (
//                     <Button
//                       key={category.id}
//                       variant={
//                         activeCategory === category.id ? "default" : "outline"
//                       }
//                       className={cn(
//                         "text-[8px] px-1 h-2 border",
//                         activeCategory === category.id && "border-primary"
//                       )}
//                     >
//                       {category.name}
//                     </Button>
//                   ))
//                 ) : (
//                   <div className="flex space-x-2">
//                     <Skeleton className="w-8 h-[10px] rounded" />
//                     <Skeleton className="w-8 h-[10px] rounded" />
//                     <Skeleton className="w-8 h-[10px] rounded" />
//                   </div>
//                 )}
//               </div>
//               <div className="flex flex-col px-3 gap-y-2">
//                 {items?.length > 0 ? (
//                   items?.map((item) => {
//                     return (
//                       <Card
//                         className="overflow-hidden p-0"
//                         key={item.idTemp ? item.idTemp : item.id}
//                       >
//                         <img
//                           src={
//                             item.image
//                               ? item.image
//                               : "/assets/images/sample_image_item.png"
//                           }
//                           alt="imagePlat"
//                           className="w-full h-[70px] object-cover"
//                         />
//                         <div className="px-2 py-1">
//                           <div className="flex justify-between">
//                             <p className="font-semibold text-[10px]">
//                               {item ? item?.name?.fr : "Élément brouillon"}
//                             </p>
//                             <p className="font-semibold text-[10px]">
//                               {item?.price} €
//                             </p>
//                           </div>
//                           <p className="text-[8px] leading-3 text-gray-500">
//                             {item ? item?.description?.fr : "Élément brouillon"}
//                           </p>
//                         </div>
//                       </Card>
//                     );
//                   })
//                 ) : (
//                   <Card className="border-dashed shadow-none border-gray-300 opacity-90">
//                     <div className="flex items-center">
//                       <CardHeader className="w-full ">
//                         <CardTitle className="text-center font-normal text-gray-400 opacity-90">
//                           Aucun élément
//                         </CardTitle>
//                       </CardHeader>
//                     </div>
//                   </Card>
//                 )}
//               </div>
//             </div>
//           </Phone>
//         </CardContent>
//       </Card>
//     </Layout>
//   );
// }

// const Items = dynamic(() => Promise.resolve(ItemsComponent), {
//   ssr: false,
// });

// export default Items;
