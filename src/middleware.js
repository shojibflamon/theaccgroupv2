import { NextResponse } from "next/server";

const csp =
  "default-src *; script-src * 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; img-src * data:; connect-src *; font-src * data:; object-src *; media-src *; frame-src *; child-src *; form-action *; base-uri *; block-all-mixed-content; upgrade-insecure-requests;";

export function middleware(request) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  // const requestHeaders = new Headers(request.headers)
  // requestHeaders.set('x-hello-from-middleware1', 'hello')

  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next();

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set(
    "Permissions-Policy",
    "camera=(self), microphone=(self), geolocation=(self)"
  );
  return response;
}
