import Link from "next/link";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "@/types/database.types";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import FieldInput from "@/components/field-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useUserContext } from "@/context/user";
import { useLoadingContext } from "@/context/loading";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string(),
  password: z.string().min(6, "Message"),
  name: z.string({
    required_error: "Le nom du restaurant est requis pour s'inscrire.",
  }),
});

export default function RegisterPage() {
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { user } = useUserContext();
  const { pushWithLoading } = useLoadingContext();

  if (!!user) {
    pushWithLoading('/admin')
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    try {
      const { email, password, name } = data;

      const { data: dataSignup, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: "https://eatsup.vercel.app/",
        },
      });

      const { data: dataUpdatedWithName } = await supabaseClient
        .from("profile")
        .update({
          name: name,
        })
        .eq("id", dataSignup?.user?.id);

      if (dataSignup?.user) {
        pushWithLoading('/admin')
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de l'inscription.",
        variant: "destructive",
      });
    }
    setIsLoading(false)
  }

  return (
    <div className="flex w-screen h-screen bg-white p-5 gap-x-5">
      <div className="hidden md:flex w-full md:max-w-[50%] p-3 bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 text-white rounded-xl flex flex-col justify-center items-center">
        <p className="text-lg md:text-3xl font-bold">
          Boostez votre Chiffre d&apos;Affaire avec votre menu en ligne. Nous
          sommes là pour vous aider à le faire.
        </p>
      </div>
      <div className="flex flex-col w-full md:max-w-[50%]">
        <Link href={`/login`} legacyBehavior>
          <a className="text-slate-800 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium ml-auto mt-7 z-10">
            Se connecter
          </a>
        </Link>
        <div className="flex flex-col justify-center items-center h-full translate-y-[-4rem] md:px-20 max-w-lg m-auto">
          <Link href={`/`} legacyBehavior>
            <img
              src="/assets/images/logo/logo.png"
              className="h-12 object-contain mb-2 cursor-pointer"
            />
          </Link>
          <p className="text-center text-2xl font-semibold mb-3">
            Créer un compte
          </p>
          <p className="text-slate-400 text-sm mb-7 text-center">
            Entre ton adresse e-mail ci-dessous pour créer ton compte
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2 flex flex-col"
            >
              <FieldInput
                form={form}
                name="email"
                placeholder="hello@gmail.com"
              />
              <FieldInput
                form={form}
                name="password"
                placeholder="Mot de passe"
                type="password"
              />
              <FieldInput
                form={form}
                name="name"
                placeholder="Nom du restaurant"
              />
              <Button loading={isLoading} type="submit">Créer un compte</Button>
            </form>
          </Form>
          <p className="mt-5 text-center text-slate-400 text-sm">
            En cliquant sur Continuer, tu acceptes nos{" "}
            <span className="underline">Conditions d&apos;utilisation</span> et{" "}
            <span className="underline">Politique de confidentialité</span>.
          </p>
        </div>
      </div>

      {/* <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/examples/authentication"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            zynk
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Créer un compte
              </h1>
              <p className="text-sm text-muted-foreground">
              Entre ton adresse e-mail ci-dessous pour créer ton compte
              </p>
            </div>
            <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} providers={[]} view="sign_in" localization={{
              variables: {
                sign_up: {
                  email_label: "Adresse email",
                  password_label: "Créer un mot de passe",
                  email_input_placeholder: "Votre adresse email",
                  password_input_placeholder: "Votre mot de passe",
                  button_label: "S'inscrire",
                  loading_button_label: "Inscription en cours ...",
                  social_provider_text: "Se connecter avec {{provider}}",
                  link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                  confirmation_text: "Vérifiez votre email pour le lien de confirmation",
                },
                sign_in: {
                  email_label: "Adresse email",
                  password_label: "Votre mot de passe",
                  email_input_placeholder: "Votre adresse email",
                  password_input_placeholder: "Votre mot de passe",
                  button_label: "Se connecter",
                  loading_button_label: "Connexion en cours ...",
                  social_provider_text: "Se connecter avec {{provider}}",
                  link_text: "Vous avez déjà un compte ? Connectez-vous"
                },
                magic_link: {
                  email_input_label: "Adresse email",
                  email_input_placeholder: "Votre adresse email",
                  button_label: "Envoyer le lien magique",
                  loading_button_label: "Envoi du lien magique en cours ...",
                  link_text: "Envoyer un email avec le lien magique",
                  confirmation_text: "Vérifiez votre email pour le lien magique"
                },
                forgotten_password: {
                  email_label: "Adresse email",
                  password_label: "Votre mot de passe",
                  email_input_placeholder: "Votre adresse email",
                  button_label: "Envoyer les instructions de réinitialisation de mot de passe",
                  loading_button_label: "Envoi des instructions de réinitialisation ...",
                  link_text: "Mot de passe oublié ?",
                  confirmation_text: "Vérifiez votre email pour le lien de réinitialisation du mot de passe"
                },
                update_password: {
                  password_label: "Nouveau mot de passe",
                  password_input_placeholder: "Votre nouveau mot de passe",
                  button_label: "Mettre à jour le mot de passe",
                  loading_button_label: "Mise à jour du mot de passe en cours ...",
                  confirmation_text: "Votre mot de passe a été mis à jour"
                },
                verify_otp: {
                  email_input_label: "Adresse email",
                  email_input_placeholder: "Votre adresse email",
                  phone_input_label: "Numéro de téléphone",
                  phone_input_placeholder: "Votre numéro de téléphone",
                  token_input_label: "Jeton",
                  token_input_placeholder: "Votre jeton Otp",
                  button_label: "Vérifier le jeton",
                  loading_button_label: "Connexion en cours ..."
                }
              },
            }} />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
