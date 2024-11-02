import { useEffect, useState } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

export default function BtnToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    function handleScroll() {
      updateDashOffset();
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  function updateDashOffset() {
    const element = document.getElementById("iconPath");

    if (element && element instanceof SVGGeometryElement) {
      const pageLength = element.getTotalLength();

      element.style.strokeDasharray = `${pageLength} ${pageLength}`;
      element.style.transition = "stroke-dashoffset 25ms";

      const currentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const dashOffset =
        pageLength - (window.scrollY * pageLength) / currentHeight;

      element.style.strokeDashoffset = dashOffset.toString();
    }
  }

  return (
    <div
      className={`duration-250 fixed right-4 z-50 cursor-pointer transition-opacity ${
        showTopBtn
          ? "bottom-20 opacity-100"
          : "pointer-events-none bottom-16 opacity-0"
      } ${showTopBtn ? "h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14" : ""} ${showTopBtn ? "rounded-full" : ""} `}
      onClick={goToTop}
    >
      <FaRegArrowAltCircleUp className="text-lightBlue hover:text-mainBlue h-full w-full" />
    </div>
  );
}
