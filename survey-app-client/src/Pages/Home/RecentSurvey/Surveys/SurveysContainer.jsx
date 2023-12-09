import SectionHeader from "../../../../shared/Banner/SectionHeader";
import SurveysAll from "./SurveysAll";

const SurveysContainer = () => {
  return (
    <>
      <SectionHeader
        img="https://i.ibb.co/9ybkSMV/clipboard-6225718-1280.jpg"
        title="All Surveys"
      ></SectionHeader>

      <div className="max-w-6xl mx-auto">
        <SurveysAll></SurveysAll>
      </div>
    </>
  );
};

export default SurveysContainer;
