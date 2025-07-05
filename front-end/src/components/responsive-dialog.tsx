import {
      Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer"
import {
      Dialog,
        DialogClose,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogOverlay,
        DialogPortal,
        DialogTitle,
        DialogTrigger,
} from "@/components/ui/dialog";
interface Props{
    title:string,
    description:string,
    children:React.ReactNode,
    open:boolean,
    onOpenChange:(open:boolean)=>void,
}
import { useIsMobile } from "@/hooks/use-mobile";
export const ResponsiveDialog=({title,description,children,open,onOpenChange}:Props)=>{
    const isMobile=useIsMobile();
    if(isMobile){
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                    <DrawerTitle>{description}</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 ">
                    {children}
                </div>
            </DrawerContent>
        </Drawer>
    }
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="p-4">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}