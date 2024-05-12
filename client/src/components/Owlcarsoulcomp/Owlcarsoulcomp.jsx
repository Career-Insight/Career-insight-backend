import React from "react";
import rafiki1 from "../../images/Visionstatement-rafiki1.svg";
import rafiki2 from "../../images/Visionstatement-rafiki2.svg";
import rafiki3 from "../../images/Visionstatement-rafiki3.svg";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import owlCSS from "./owlcarsoulcomp.module.css";
import "./owlcarsoulcomp.css";
export default function Owlcarsoulcomp() {
  return (
    <>
      <div className={owlCSS.slides}>
        <p className={owlCSS.slides__title}>
          why <span>career insight ?</span>
        </p>
        <OwlCarousel
          className="owl-theme roadmaps__secound mt-5"
          items={1}
          loop
          autoplay={true}
          margin={10}
          nav={false}
          dots={true}
          center={false}
        >
          <div className="item">
            <img className={owlCSS.slidimg} src={rafiki1} alt="" />
            <h4 className={owlCSS.slidetitle}>build career easily</h4>
            <p className={owlCSS.slidedis}>
              Officiis hic aut neque sed et eum officia nihil. voluptatibus id
              quia. Debitis magni facere. Perssoluta sunt illo impedit dolorem
              et temporibus voluptatem. Placeat rem rerum eos eveniet et. Quia
              quaerat consectetur ipsa.
            </p>
          </div>
          <div className="item">
            <img className={owlCSS.slidimg} src={rafiki2} alt="" />
            <h4 className={owlCSS.slidetitle}>achieve your goal</h4>
            <p className={owlCSS.slidedis}>
              Officiis hic aut neque sed et eum officia nihil. voluptatibus id
              quia. Debitis magni facere. Perssoluta sunt illo impedit dolorem
              et temporibus voluptatem. Placeat rem rerum eos eveniet et. Quia
              quaerat consectetur ipsa.
            </p>
          </div>
          <div className="item">
            <img className={owlCSS.slidimg} src={rafiki3} alt="" />
            <h4 className={owlCSS.slidetitle}>make your path</h4>
            <p className={owlCSS.slidedis}>
              Officiis hic aut neque sed et eum officia nihil. voluptatibus id
              quia. Debitis magni facere. Perssoluta sunt illo impedit dolorem
              et temporibus voluptatem. Placeat rem rerum eos eveniet et. Quia
              quaerat consectetur ipsa.
            </p>
          </div>
        </OwlCarousel>
      </div>
    </>
  );
}
