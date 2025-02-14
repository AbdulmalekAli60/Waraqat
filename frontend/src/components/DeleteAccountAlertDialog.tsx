"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { deleteAccount } from "@/services/usersService";
import { useUserInfo } from "@/context/UserContext";
import { useRouter } from "next/navigation";

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function DeleteAccountAlertDialog({
  isOpen,
  onOpenChange,
}: DeleteDialogProps) {
  const { currentUser , setCurrentUser } = useUserInfo();
  const router = useRouter();

  function hadnleConfirmDeleteClick() {
    onOpenChange(false);

    try {
      deleteAccount();
      console.log("account with id: ", currentUser.id, " has been deleted");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userData");
      sessionStorage.clear();
      localStorage.clear();
      router.push("/Home");

      setCurrentUser({
        id: 0,
        username: "",
        name: "",
        email: "",
        bio: "",
        profileImage: "",
        created_at: "",
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => onOpenChange(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold leading-none tracking-tight">
                Are you sure?
              </h2>
              <p className="text-sm text-gray-500">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => onOpenChange(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </Button>
              <Button
                onClick={hadnleConfirmDeleteClick}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
