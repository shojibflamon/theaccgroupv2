import { useCallback, useState } from "react";

import { Dialog, MenuItem } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";

const DeleteModal = ({ handleDelete, isLoading, text, roleActive }) => {
  const [open, setOpen] = useState(false);

  const handleDataDelete = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        if (roleActive) {
          return enqueueSnackbar(
            "Invalid! This role is already asigned to user.",
            { variant: "error" }
          );
        }
        // setOpen(true)
        await handleDelete();
        enqueueSnackbar("Deleted Successfully", { variant: "success" });
        // setOpen(!open);
      } catch (error) {
        console.log(error?.message);
        enqueueSnackbar(
          error?.message == "Error: P2014"
            ? "This data is already in use."
            : `Failed to delete ${error?.message}`,
          {
            variant: "error",
          }
        );
      }
    },
    [handleDelete, roleActive]
  );

  return (
    <div>
      <div className="w-fit text-red-600 cursor-pointer">
        {text ? (
          <div>
            <MenuItem
              onClick={() => setOpen(true)}
              className="flex items-center gap-3"
            >
              <FaRegTrashAlt size={20} className="text-red-500" />
              Delete Product
            </MenuItem>
          </div>
        ) : (
          <FaRegTrashAlt
            onClick={() => setOpen(true)}
            size={20}
            className="text-red-500"
          />
        )}
      </div>

      <Dialog open={open} maxWidth="md" onClose={() => setOpen(!open)}>
        <div className="p-10">
          <h2 className="text-2xl font-semibold pb-5">
            Are you sure to delete?
          </h2>
          <div>
            <div className="flex gap-3 items-center">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="px-5 py-3 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={handleDataDelete}
                type="submit"
                disabled={isLoading}
                className="bg-red-600 text-white px-4 rounded-xl py-[10px] capitalize  hover:bg-red-400 transition-all disabled:bg-slate-400 disabled:text-white"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
