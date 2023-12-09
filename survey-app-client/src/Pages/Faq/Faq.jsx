import SectionTitle from "../../shared/SectionTitle/SectionTitle";

const Faq = () => {
  return (
    <div className="px-3 xl:px-0">
      <SectionTitle title="FAQ About Survey"></SectionTitle>
      <div className="flex gap-12 flex-col md:flex-row justify-center items-center">
        <div className="flex-1 flex flex-col gap-6">
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" checked="checked" />
            <div className="collapse-title text-xl font-medium">
            How do I get started with taking surveys?
            </div>
            <div className="collapse-content">
              <p>To get started, sign up for a free account. Once registered, you can explore a variety of surveys in different categories and start sharing your opinions.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
            Are my responses confidential?
            </div>
            <div className="collapse-content">
              <p>Yes, your responses are confidential. We take privacy seriously and ensure that your personal information and survey responses are secure and anonymous.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
            Can I change my survey responses once submitted?
            </div>
            <div className="collapse-content">
              <p>No, once you submit your survey responses, they cannot be changed. Make sure to review your answers before submitting to ensure accuracy.</p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img className=" w-60 h-60 md:w-72 md:h-1/2 mx-auto"
            src="https://i.ibb.co/6bZc6Ns/question-mark-1924516-1280.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Faq;
