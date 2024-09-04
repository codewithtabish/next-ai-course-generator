import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiOutlineTrash } from "react-icons/hi2";
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
} from "@/components/ui/alert-dialog";
const DropDownMenu = ({ children, handleDeleteCourse, deleteLaoder }: any) => {
  const [openAlertDialouge, setopenAlertDialouge] = useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="mr-5">{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel
            className="cursor-pointer flex gap-2 items-center"
            onClick={() => setopenAlertDialouge(true)}
          >
            <HiOutlineTrash /> Delete
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuLabel className="cursor-pointer"> */}
          {/* Subscribe */}
          {/* </DropdownMenuLabel> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openAlertDialouge}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setopenAlertDialouge(false)}
              className="dark:text-white"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCourse}
              className="dark:text-white"
              disabled={deleteLaoder}
            >
              {deleteLaoder ? "Deleting ..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DropDownMenu;
