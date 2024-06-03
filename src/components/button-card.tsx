import Layout from "@/layout/layout";
import { useLoadingContext } from "@/context/loading";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

export default function ButtonCard({title, onClick}) {

  return (
    <Card
      className="shadow-none border-slate-200 px-4 py-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center max-h-14 gap-2 ">
        <CardHeader className="w-full p-0">
          <CardTitle className="text-left text-sm font-normal leading-6">
            {title}
          </CardTitle>
        </CardHeader>

        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:bg-transparent w-fit h-fit"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </Card>
  );
}