import SectionHeader from "../../shared/Banner/SectionHeader";
import ContactCard from "./ContactCard";
import { FaMailBulk } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { PiAddressBookFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div>
      <SectionHeader
        title={"Contact Us"}
        img="https://i.ibb.co/9ybkSMV/clipboard-6225718-1280.jpg"
      ></SectionHeader>

      <section className="my-20 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ContactCard
            img={<FaMailBulk />}
            title="Our Email"
            item1="noemail@nodomain.com"
            item2="contact@domain.com"
          ></ContactCard>
          <ContactCard
            img={<LuPhoneCall />}
            title="Our Phone "
            item1="+8801784099162"
            item2="+8801533235544"
          ></ContactCard>
          <ContactCard
            img={<PiAddressBookFill />}
            title="Our Address"
            item1="Thakurgaon Sador"
            item2="Dhaka,Bangladesh"
          ></ContactCard>
        </div>
      </section>
      <section className="my-20 bg-[#FFFBF3]">
        <div className=" flex justify-between gap-10 flex-col md:flex-row items-center max-w-6xl mx-auto py-10">
          <div className="flex-1">
            <h2 className="text-3xl font-bold">Contact Now </h2>
            <h2 className="text-2xl font-bold text-rose-600">
              Leave A Message{" "}
            </h2>
            <p className="text-lg text-[#787d99] my-4 font-serif">
              If you need help or have any questions, please feel free to
              contact us. We are here to help in any possible way. If you want
              to report a technical issue, ask a question about products or
              services, or simply share your opinion with us, please fill out
              the contact form.
            </p>
          </div>
          <div className="flex-1 flex justify-center gap-6 items-center text-center">
            <div className="bg-rose-400 p-4 rounded-full">
              <FaMailBulk className="text-white hover:text-[#ccc]" size={30} />
            </div>
            <div>
              <h3 className="text-2xl font-semibold">Our Support</h3>
              <p className="text-lg font-semibold text-[#787d99]">
                jonyislamcmt@gmail.com
              </p>
              <p className="text-lg font-semibold text-[#787d99]">
                contact@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto my-20">
        <div className="flex justify-between items-center">
          <div className="flex gap-10 items-center">
            <img className="w-32"
              src="https://i.ibb.co/Y0Pzd2R/img-icon-3d-03-min.webp"
              alt=""
            />
            <div>
              <h3 className="text-3xl font-bold">Discover how you can help someone </h3>
              <h2 className="text-4xl font-bold text-[#E91D39] capitalize">today in minutes!</h2>
              <p className="text-lg font-semibold text-[#787d99] my-2">
                You might be surprised at just how much of a difference you can
                make!
              </p>
            </div>
          </div>

          <div>
            <Link>
              <button className="btn btn-error text-white px-8">Sign Up</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
