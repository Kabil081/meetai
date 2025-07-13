import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
interface Props{
    page:number,
    totalPages:number,
    onPageChange:(page: any)=>void
}
export const DataPagination=({page,totalPages,onPageChange}:Props)=>{
    return(
        <div className="flex items-center justify-center">
            <div className="text-sm flex-1 text-muted-foreground">
                Page {page} of {totalPages || 1}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4s">
                <Button variant="outline" disabled={page==1} onClick={()=>onPageChange(Math.max(page-1,1))}>
                    <ArrowLeft/>
                    Previous
                </Button>
                <Button variant="outline" disabled={totalPages===0 || page===totalPages} onClick={()=>onPageChange(Math.min(page+1,totalPages))}>
                    <ArrowRight/>
                    Next
                </Button>
            </div>
        </div>
    );

}