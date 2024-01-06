import SectionHeader from "../shared/Banner/SectionHeader";
import { MdGeneratingTokens } from "react-icons/md";
import { IoToday } from "react-icons/io5";
import Testimonials from "./Testimonials/Testimonials";
import Faq from "./Faq/Faq";

const About = () => {
  return (
    <div>
      <SectionHeader
        title={"About Us"}
        img="https://i.ibb.co/9ybkSMV/clipboard-6225718-1280.jpg"
      ></SectionHeader>

      <section className="flex my-32 flex-col  md:flex-row gap-10 max-w-6xl mx-auto">
        <div className="w-full">
          <div className="">
            <img
              className="w-[480px] h-[550px] object-cover rounded-lg"
              src="https://i.ibb.co/Jc1tWhs/342057481-749223916672514-7044528423957488905-n.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="w-full">
          <img
            className="w-24 "
            src="https://i.ibb.co/wpyHgfF/icon-review-05-min.webp"
            alt=""
          />
          <h2 className="text-4xl font-bold text-[#0f1741] mb-1">
            We started in 2004 and currently have over{" "}
          </h2>
          <h2 className="text-4xl font-bold text-[#ED272E]">
            3 million members worldwide
          </h2>
          <p className="text-lg font-semibold my-5 text-[#787d99]">
            Feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam.
            Nulla at volutpat diam ut venenatis tellus in metus.
          </p>

          <div className="flex justify-between gap-10 my-12">
            <div className="w-full">
              <MdGeneratingTokens className="text-5xl mb-2" />

              <p className="text-lg font-semibold text-[#787d99]">
                Reviewed by developers and designers around the globe, our
                community is
              </p>
            </div>
            <div className="w-full">
              <IoToday className="text-5xl mb-2" />
              <p className="text-lg font-semibold text-[#787d99]">
                Constantly growing with new features added every month
              </p>
            </div>
          </div>
        </div>
      </section>
      <Testimonials></Testimonials>
      <div className="max-w-6xl mx-auto">
        <Faq></Faq>

      </div>
    </div>
  );
};

export default About;
