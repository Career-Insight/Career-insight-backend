import React, { useEffect } from "react";
import Canvadots from "../../components/Canvadots/Canvadots";
import homeCSS from "./home.module.css";
import "../../images/Group5.svg";
import "../../images/Component5.png";
import { Link } from "react-router-dom";
import assetLine from "../../images/PropertyDefault.svg";
import Animationgif from "../../images/Animation.gif";

export default function Home() {
  // useEffect(() => {
  //   function handleScroll() {
  //     const assetSection = document.getElementById("assetsection");
  //     const assetImg = document.getElementById("assetimg");

  //     const assetTopOffset = assetSection.offsetTop;
  //     if (window.scrollY > assetTopOffset - 300) {
  //       assetImg.style.transform = "scaleX(1)";
  //       console.log("Object scrolled past threshold");
  //     }
  //   }
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  return (
    <>
      <main className={homeCSS.hero}>
        <Canvadots />
        <div className={homeCSS.hero__con}>
          <h1 className="text-5xl font-bold mb-5 text-dc">
            Career Insight: Your Personal Job GPS
          </h1>
          <p className="text-c1 font-bold mb-5">
            Unlock your career path with precision-guided navigation, customized
            insights tailored to your goals, and foresight into upcoming job
            market trends.
          </p>

          <div className={homeCSS.hero__links}>
            <Link to="/signup" className={`cta__btn ${homeCSS.cta__btn_home1}`}>
              start free <i className="fas fa-chevron-right"></i>
            </Link>
            <Link
              to="/roadmaps"
              className={`cta__btn2 ${homeCSS.cta__btn_home2}`}
            >
              free roadmaps
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
