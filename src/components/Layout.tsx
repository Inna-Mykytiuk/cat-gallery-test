import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import BtnToTop from "./BtnToTop";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <BtnToTop />
      <Header />
      <main className="h-full w-full">
        <Suspense fallback={<p className="loader">Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
