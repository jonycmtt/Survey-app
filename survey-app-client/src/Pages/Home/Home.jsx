
import { useEffect } from "react";
import Faq from "../Faq/Faq";
import Testimonials from "../Testimonials/Testimonials";
import Banner from "./Banner";
import FeaturesSurvey from "./Features/FeaturesSurvey";
import HowWorks from "./HowWorks/HowWorks";
import RecentSurvey from "./RecentSurvey/RecentSurvey";

const Home = () => {
  useEffect(() => {
    document.title = "Fimro | A Survey and Polling Website";
  }, []);
  return (
    <div>
      <Banner></Banner>
      <div className="max-w-6xl mx-auto my-20">
        <FeaturesSurvey></FeaturesSurvey>
        <RecentSurvey></RecentSurvey>
        <HowWorks></HowWorks>
        <Testimonials></Testimonials>
        <Faq></Faq>
      </div>
    </div>
  );
};

export default Home;
