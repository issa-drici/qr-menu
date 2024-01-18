import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/context/user";
import { ExitIcon, ExternalLinkIcon, PersonIcon, QuestionMarkCircledIcon, StarIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";



export const NavUser = ({ onClickItem }) => {
  const router = useRouter()

  const { user } = useUserContext()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full p-0 drop-shadow-lg ml-5"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://www.w3schools.com/w3images/avatar2.png"
              alt="@shadcn"
            />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[60]" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            {/* <p className="text-sm font-medium leading-none">{`${user?.prenom} ${user?.nom}`}</p> */}
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          router.push('/admin/account/info')
          onClickItem()
        }}>
          <PersonIcon className="mr-2" />
          Mon compte
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          router.push("/admin/account/subscription")
          onClickItem()
        }}>
          <StarIcon className="mr-2" />
          Passer Cuisinier
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          router.push(`mailto:contact@eatsup.com?body=%0A%0A%0A%0A${user?.name}%20-%20${user?.email}`)
          onClickItem()
        }}>
          <QuestionMarkCircledIcon className="mr-2" />
          Support
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          Gérer mon abonnement
          <DropdownMenuShortcut><ExternalLinkIcon /></DropdownMenuShortcut>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          router.push('/logout')
          onClickItem()
        }}>
          <ExitIcon className="mr-2" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
