"use client";
import React from "react";
import { SnackbarProvider } from "notistack";

const NextSnackbarProvider = ({ children }) => {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
};

export default NextSnackbarProvider;
