import SectionTitle from "../../../shared/SectionTitle/SectionTitle";
import { FaUsers, FaCommentAlt, FaVoteYea } from "react-icons/fa";
import { FcSurvey } from "react-icons/fc";

const HowWorks = () => {
  return (
    <div className="px-3 xl:px-0">
      <SectionTitle title="How it Work"></SectionTitle>
      <div className="flex gap-8 flex-col md:flex-row justify-center items-center">
        <div className="flex-1">
          <ul className="gap-12 flex flex-col">
            <li>
              <div className="flex items-center gap-3">
                <FaUsers className="text-3xl"></FaUsers>
                <div>
                  <span className="font-semibold  ">
                    Create Account.
                  </span>
                  <p className="text-slate-500">
                    Begin your survey-taking journey by creating a user account.
                    Its quick and easy!
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-3">
                <FcSurvey className="text-3xl"></FcSurvey>
                <div>
                  <span className="font-semibold  ">
                    Create Survey and Poll
                  </span>
                  <p className="text-slate-500">
                    Begin your survey-taking journey by creating a user account.
                    Its quick and easy!
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-3">
                <FaVoteYea className="text-3xl"></FaVoteYea>
                <div>
                  <span className="font-semibold  ">Vote In Survey</span>
                  <p className="text-slate-500">
                    Begin your survey-taking journey by creating a user account.
                    Its quick and easy!
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="flex items-center gap-3">
                <FaCommentAlt className="text-3xl"></FaCommentAlt>
                <div>
                  <span className="font-semibold  ">
                    Survey Comments
                  </span>
                  <p className="text-slate-500">
                    Begin your survey-taking journey by creating a user account.
                    Its quick and easy!
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <img className="w-full" src="https://i.ibb.co/W33zqpq/remote-5491798-1280.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
