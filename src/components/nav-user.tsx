import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/context/user";
import Logout from "@/pages/logout";
import { ExitIcon, ExternalLinkIcon } from "@radix-ui/react-icons";



export const NavUser = () => {
  const { logout } = useUserContext();

  
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
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Restaurant Del Arte</p>
            {/* <p className="text-sm font-medium leading-none">{`${user?.prenom} ${user?.nom}`}</p> */}
            <p className="text-xs leading-none text-muted-foreground">
              info@delarte.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Gérer mon abonnement
          <DropdownMenuShortcut><ExternalLinkIcon /></DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onClick={() => Logout()}> */}
        <DropdownMenuItem>
          Se déconnecter
          <DropdownMenuShortcut><ExitIcon /></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
