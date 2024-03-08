import { cn } from "@/lib/utils"
import React from "react"

// TODO Rendre rendu cote server avec async

function TableSketch({ ordered }) {
    return (
        <div className="h-fit">
            <div className="flex justify-around w-6 px-1 pb-0.5">
                <div className={cn("w-1 h-1 rounded-lg border border-gray-500", ordered ? "border-blue-400" : null)}></div>
                <div className={cn("w-1 h-1 rounded-lg border border-gray-500", ordered ? "border-blue-400" : null)}></div>
            </div>
            <div className="flex justify-between items-center w-6">
                <div className={cn("w-1 h-1 rounded-lg border border-gray-500", ordered ? "border-blue-400" : null)}></div>
                <div className={cn("w-3 h-2 rounded-lg border border-gray-500", ordered ? "border-blue-400" : null)}></div>
                <div className={cn("w-1 h-1 rounded-lg border border-gray-500", ordered ? "border-blue-400" : null)}></div>

            </div>
            <div className="flex justify-around w-6 px-1 pt-0.5">
                <div className={cn("w-1 h-1 rounded-lg border border-gray-500", ordered ? "border-blue-400" : null)}></div>
                <div className={cn("w-1 h-1 rounded-lg border border-gray-500", ordered ? "border-blue-400" : null)}></div>
            </div>
        </div>)
}

export default TableSketch