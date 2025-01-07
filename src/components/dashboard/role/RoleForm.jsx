"use client";

import { useLayoutEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { useFormik } from "formik";

import { enqueueSnackbar } from "notistack";

import React from "react";
import {
  useGETPermjisssion,
  usePostRole,
  useUpdateRole,
} from "@/hooks/role.hooks";
import { RoleInfoValidation } from "@/libs/validation/roleValidation";
import { useGETProductCategory } from "@/hooks/product.hook";

const RoleForm = ({ instance }) => {
  const [open, setOpen] = useState(false);
  const { data: permissionList } = useGETPermjisssion();

  const { data: categoryList } = useGETProductCategory();
  const { mutateAsync } = usePostRole();
  const { mutateAsync: updateInfo } = useUpdateRole(instance?.id);

  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isSubmitting,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: instance?.title || "",
      permission: instance?.RolePermission.map((i) => i.permissionId) || [],
      category: instance?.RolePermission.map((i) => i.categoryId) || [],
    },

    validationSchema: RoleInfoValidation,
    onSubmit: async (data) => {
      try {
        if (instance) {
          await updateInfo(data);
        } else {
          // console.log(data);
          await mutateAsync(data);
          resetForm();
        }
        enqueueSnackbar("Saved", { variant: "success" });
        // window.location.reload(false);
        setOpen(!open);
      } catch (error) {
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    },
  });

  return (
    <div>
      {instance ? (
        <FiEdit
          className="text-black cursor-pointer"
          size={20}
          onClick={() => setOpen(!open)}
        />
      ) : (
        <button
          className="btn bg-[#2F7CE3] text-white border border-1 px-4 lg:px-7 py-[14px] capitalize rounded-[10px] flex items-center gap-2 disabled:bg-slate-400"
          variant="outlined"
          onClick={() => {
            setOpen(!open);
            resetForm();
          }}
        >
          Add Roll
          <AddIcon />
        </button>
      )}
      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(!open)}
          fullWidth
          maxWidth="md"
        >
          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className="transition-all duration-200  "
          >
            <DialogContent>
              <h3 className="font-bold mb-4 mt-7 text-2xl">
                {instance ? "Edit Roll" : "Add Roll"}
              </h3>
              <div className="space-y-5">
                <TextField
                  fullWidth
                  size="small"
                  name="title"
                  value={values.title}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  className="w-full mt-4"
                  onChange={handleChange}
                  label="Name"
                />
                <div>
                  <h2 className="font-bold mb-4 mt-7 text-2xl">Permission</h2>
                  <div className="grid grid-cols-2 gap-7">
                    {permissionList &&
                      permissionList.map((permision) => {
                        return (
                          <label
                            key={Math.random()}
                            htmlFor={"permission" + permision?.id}
                            className={`text-lg capitalize`}
                          >
                            <input
                              checked={values?.permission?.includes(
                                permision?.id
                              )}
                              onChange={(e) => {
                                let _ = values.permission;
                                if (e.target.checked) {
                                  _.push(permision?.id);
                                  _ = [...new Set(_)];
                                } else {
                                  _ = _.filter(
                                    (item) => item !== permision?.id
                                  );
                                }
                                setFieldValue("permission", _);
                              }}
                              type="checkbox"
                              id={"permission" + permision?.id}
                            />{" "}
                            {permision?.title}
                          </label>
                        );
                      })}
                  </div>
                  <h2 className="font-bold mb-4 mt-7 text-2xl">
                    Category Permission
                  </h2>
                  <div className="grid grid-cols-2 gap-7">
                    {categoryList &&
                      categoryList.map((categoryInfo) => (
                        <label
                          key={categoryInfo.id}
                          htmlFor={"cat_permission" + categoryInfo.id}
                          className="text-lg"
                        >
                          <input
                            checked={values?.category?.includes(
                              categoryInfo?.id
                            )}
                            onChange={(e) => {
                              let _ = values.category;
                              if (e.target.checked) {
                                _.push(categoryInfo?.id);
                                _ = [...new Set(_)];
                              } else {
                                _ = _.filter(
                                  (item) => item !== categoryInfo?.id
                                );
                              }
                              setFieldValue("category", _);
                            }}
                            type="checkbox"
                            id={"cat_permission" + categoryInfo.id}
                          />{" "}
                          {categoryInfo?.title}
                        </label>
                      ))}
                  </div>
                </div>
              </div>
            </DialogContent>

            <DialogActions>
              <div className="flex gap-2 justify-end pb-5 mr-4">
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="btn border border-1 px-4 lg:px-7 py-[14px] capitalize inline-block  bg-white text-black rounded-[10px]"
                >
                  Cancel
                </button>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn bg-[#2F7CE3] text-white border border-1 px-4 lg:px-7 py-[14px] inline-block capitalize rounded-[10px] disabled:bg-slate-400"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default RoleForm;
