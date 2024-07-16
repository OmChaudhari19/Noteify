"use client"

import {
    AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger, AlertDialogHeader,
    AlertDialogFooter
} from "../ui/alert-dialog"

interface ConfirmDailogProp {
    children: React.ReactNode,
    onConfirm: () => void;
}

export const ConfirmDilog = ({ children, onConfirm }: ConfirmDailogProp) => {
    const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onConfirm();
    }
    return <>
        <AlertDialog>
            <AlertDialogTrigger onClick={(e) => e.stopPropagation()} asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Do you want to delete the file permanently?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    This action cannot be undone.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={(e) => handleConfirm(e)}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
}