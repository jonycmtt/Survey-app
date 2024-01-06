import { Link } from "react-router-dom";
import useAuth from "../../Components/Hooks/useAuth";

const Banner = () => {
  const { user } = useAuth();
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/hLnHsvY/pexels-tim-douglas-6205512.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className=" max-w-6xl mx-auto text-center text-neutral-content w-full px-3 xl:px-0">
          <div className="flex flex-col gap-8 md:flex-row items-center">
            <div className="w-full">
              <h1 className="mb-5 text-2xl lg:text-4xl md:text-3xl  font-bold">
                Welcome {user? user.displayName : ""}
              </h1>
              <p className="mb-5 capitalize">
                join us in the journey of collective decision-making and
                discovery.
              </p>
              <Link to="/surveys">
                {" "}
                <button className="btn btn-primary">Get Started</button>
              </Link>
            </div>

            <div className="card  md:w-1/2 w-full shadow-2xl bg-base-100">
              <h2 className="text-2xl text-slate-600 font-semibold mt-5">
                Surveyor Request
              </h2>
              <form className="card-body">
                <div className="form-control">
                  <input
                  name="name"
                    type="text"
                    placeholder="Your Name"
                   
                    className="input input-bordered text-slate-900"
                    required
                  />
                </div>
                <div className="form-control">
                  <input
                  name="email"
                    type="email"
                    placeholder="email"
                    
                    className="input input-bordered text-slate-900"
                    required
                  />
                </div>
                <div className="form-control">
                  <textarea placeholder="Why Join Our Surveyor User?" name="message" className="input input-bordered text-slate-800 resize-none h-20"></textarea>
                </div>

                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
