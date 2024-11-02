import { useNavigate } from "react-router-dom";

import myImage from "../assets/cat.png";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <section className="flex h-screen items-center justify-center pb-[50px] md:pb-[100px]">
      <div className="container">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-black/80">404</h2>
          <p className="text-2xl">Page not Found</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 rounded bg-gray-500 p-2 text-lg text-white transition-colors duration-300 ease-out hover:bg-gray-600"
          >
            BackHome
          </button>
          <img
            src={myImage}
            alt="page 404"
            className="max-h-full max-w-full md:max-h-[400px] md:max-w-[400px]"
          />
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
