import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import BtnToTop from "./BtnToTop";
import Header from "./Header";
import Loader from "./Loader";

export default function Layout() {
  return (
    <>
      <BtnToTop />
      <Header />
      <main className="h-full w-full">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
}
