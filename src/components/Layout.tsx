import { Suspense } from "react";
import { Outlet } from "react-router-dom";

// import Header from "./Header";

export default function Layout() {


  return (
    <>
      {/* <Header /> */}
      <main
        className="w-full h-full"
      >
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>

    </>
  );
}