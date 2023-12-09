// import SectionHeader from "../../../../shared/Banner/SectionHeader"
import SurveysItem from "./SurveysItem";
import useSurvey from "../../../../Components/Hooks/useSurvey";
import { useEffect, useState } from "react";


const SurveysAll = () => {

  useEffect(() => {
    document.title = "Fimro | Surveys";
  }, []);

  const [survey] = useSurvey();
  const [publishSurvey,setPublishSurvey] = useState([]);
 

  useEffect(() => {
    const publish = survey.filter(items => items.role === 'published');
    setPublishSurvey(publish);
  }, [survey])



  return (
    <div>
      

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-20 px-3 xl:px-0">
        {publishSurvey?.map(item => <SurveysItem key={item._id} item={item}></SurveysItem>)}
      </div>
    </div>
  )
}

export default SurveysAll
