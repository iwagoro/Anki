import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DominoSpinner } from "react-spinners-kit";

export default function LoadingDialog({ isLoading }: { isLoading: boolean }) {
    return (
        <Dialog open={isLoading}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Loading...</DialogTitle>
                    <DialogDescription>Please wait while we process your request.</DialogDescription>
                </DialogHeader>
                <div className="w-full flex justify-center">
                    <DominoSpinner size={140} color="crimson" />
                </div>
            </DialogContent>
        </Dialog>
    );
}
