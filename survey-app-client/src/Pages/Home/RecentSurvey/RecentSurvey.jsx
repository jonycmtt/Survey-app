
import SectionTitle from "../../../shared/SectionTitle/SectionTitle";
import useSurvey from "../../../Components/Hooks/useSurvey";
import FeaturesSurveItem from "../Features/FeaturesSurveItem";


const RecentSurvey = () => {
  const [survey,refetch] = useSurvey()
  const limitData = survey.slice(0,6)
  return (
    <div className="my-20">
        <SectionTitle title='Most recently survey'></SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-3 xl:px-0">
        {limitData?.map((item) => (
         <FeaturesSurveItem key={item._id} item={item}></FeaturesSurveItem>
        ))}
      </div>
    </div>
  )
}

export default RecentSurvey
