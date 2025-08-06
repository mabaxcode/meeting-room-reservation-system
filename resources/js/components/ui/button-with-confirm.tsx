import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
  
  export function ButtonWithConfirmation({
    open,
    onOpenChange,
    onConfirm,
    onValidate,
  }: {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    onValidate: () => void
  }) {
    
    const handleSubmit = () => {
      // your form submission logic
      console.log("Form submitted")
      // post(...) or other submit logic here
    }
  
    // return (
    //     <AlertDialog>
    //       <AlertDialogTrigger asChild>
    //         <Button type="button" variant="outline">Tempah</Button>
    //       </AlertDialogTrigger>
    //       <AlertDialogContent>
    //         <AlertDialogHeader>
    //           <AlertDialogTitle>Are you sure?</AlertDialogTitle>
    //           <AlertDialogDescription>
    //             This will save your reservation. Do you want to continue?
    //           </AlertDialogDescription>
    //         </AlertDialogHeader>
    //         <AlertDialogFooter>
    //           <AlertDialogCancel>Cancel</AlertDialogCancel>
    //           <AlertDialogAction onClick={handleSubmit}>
    //             Continue
    //           </AlertDialogAction>
    //         </AlertDialogFooter>
    //       </AlertDialogContent>
    //     </AlertDialog>
    // )
    return (
        <>
          {/* This button validates the form first */}
          <Button type="button" variant="outline" onClick={onValidate}>
            Tempah
          </Button>
    
          {/* Confirmation dialog */}
          <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will save your reservation. Do you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )
  }
  