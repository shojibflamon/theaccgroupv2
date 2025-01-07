import LandingFooter from "@/components/core/footer/LandingFooter";
import LandingTopNavbar from "@/components/core/navbar/LandingTopNavbar";
import { headers } from "next/headers";
import Script from "next/script";
import React from "react";

const BaseTemplate = ({ children }) => {
  const nonce = headers().get("x-nonce");

  return (
    <div className="container mx-auto lg:px-4 xl:px-8 2xl:px-0">
      <Script
        src="https://www.googletagmanager.com/gtag/js"
        strategy="afterInteractive"
        nonce={nonce}
      />
      <LandingTopNavbar />
      <main> {children}</main>
      <LandingFooter />
    </div>
  );
};

export default BaseTemplate;
