import { Link, useLoaderData } from "react-router-dom";
import SectionHeader from "../../../../shared/Banner/SectionHeader";
import useAuth from "../../../../Components/Hooks/useAuth";
import {
  FaComment,
  FaHeart,
  FaRegThumbsDown,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import useLikeCount from "../../../../Components/Hooks/useLikeCount";
import useSurvey from "../../../../Components/Hooks/useSurvey";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import useAdmin from "../../../../Components/Hooks/useAdmin";
import useSurveyor from "../../../../Components/Hooks/useSurveyor";
import { useEffect, useState } from "react";

const SurveyDetails = () => {
  useEffect(() => {
    document.title = "Fimro | Survey Details";
  }, []);

  const loader = useLoaderData();

  const {
    title,
    description,
    category,
    timeFormate,
    option1,
    option2,
    like,
    dislike,
    name,
    photoURL,
    _id,
    yesVote,
    noVote,
    voteEmail,
    email,
  } = loader;

  // findAdmin
  const [isAdmin] = useAdmin();
  const [isSurveyor] = useSurveyor();

  console.log(isSurveyor);

  // console.log(typeof !isAdmin)

  // const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const navigate = useNavigate();
  // const [countThumbs,refetch] = useLikeCount();

  // console.log(countThumbs);
  // const thumbsFilter = countThumbs.filter(thumbs => thumbs.likeId === _id && thumbs.status === 'like' || thumbs.status ==='dislike');
  // console.log(thumbsFilter)
  // // const {user} = useAuth()
  // const [,refetch] = useSurvey()

  const commentDate = moment(new Date()).format("ll");
  const voteDate = moment().format("lll");

  const { data: commentList = [], refetch } = useQuery({
    queryKey: ["commentList"],
    queryFn: async () => {
      const res = await axiosPublic.get("/comments");
      return res.data;
    },
  });

  const commentThisSurvey = commentList.filter((com) => com.surveyId === _id);
  console.log(commentThisSurvey);

  const handleComment = (event) => {
    event.preventDefault();
    const form = event.target;
    const comment = form.comment.value;

    const commentInfo = {
      comment,
      commentUserEmail: user?.email,
      commentUserName: user?.displayName,
      commentUserPhoto: user?.photoURL,
      commentDate,
      surveyId: _id,
    };

    // const {data : addComment = []} = useQuery({
    //   queryKey : ['addComment'],
    //   queryFn: async ()=>{
    //     const res = await axiosPublic.post('/comments',commentInfo);
    //     return res.data
    //   }
    // })
    axiosPublic.post("/comments", commentInfo).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        refetch();
        form.reset();
      }
    });
  };

  const handleYesVote = (id) => {
    // setVoteCount(successCount + 1 )
    // setVoteCount()
    const yesVote = document.getElementById("yesVote").innerText;

    const yesVoteCount = {
      yesVote,
      voteEmail: user?.email,
      title: title,
      surveyId: id,
      voteDate,
      surveyEmail: email,
      // voteCount
    };
    console.log(yesVoteCount);
    // yes post
    axiosPublic.post("/votes", yesVoteCount).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
        });
        // refetch()
        navigate("/surveys");
      }
    });

    // yes patch
    axiosPublic.patch(`/survey/yesVote/${id}`, yesVoteCount).then((res) => {
      console.log(res.data);
    });
  };
  // no vote
  const handleNoVote = (id) => {
    const noVote = document.getElementById("noVote").innerText;
    const noVoteCount = {
      noVote,
      voteEmail: user?.email,
      title: title,
      surveyId: id,
      voteDate,
      surveyEmail: email,
    };
    console.log(noVoteCount);
    // no post
    axiosPublic.post("/votes", noVoteCount).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/surveys");
      }
    });

    // no patch
    axiosPublic.patch(`/survey/noVote/${id}`, noVoteCount).then((res) => {
      console.log(res.data);
    });
  };

  // handleLike

  // const handleLike = (id) => {
  //   const likeInfo = {
  //     likeId: id,
  //     status: "like",
  //   };
  //   axiosPublic.post("/thumbsCount", likeInfo).then((res) => {
  //     console.log(res.data);
  //     refetch()
  //   });
  // };

  const { data: reaction = [] , refetch : reactFetch} = useQuery({
    query: ["GET_REACTIONS"],
    queryFn: async () => {
      const res = await axiosPublic.get("/thumbsCount");
      return res.data;
    },
  });

  const findThisReaction = reaction.filter((react) => react.likeId === _id);

  console.log("reaction", findThisReaction);
// like
  const likeCounts = findThisReaction.filter(count => count.status ==='like');
  console.log("like is" ,likeCounts )
// dislike
  const disLikeCounts = findThisReaction.filter(count => count.status ==='dislike');
  console.log("disLike is" ,disLikeCounts )

  // hidden status:

  



  const handleLike = (id) => {
    const likeInfo = {
      likeId: id,
      status: "like",
    };
    axiosPublic.post("/thumbsCount", likeInfo).then((res) => {
      console.log(res.data);
      reactFetch();
    });
  };
  const handleDisLike = (id) => {
    const likeInfo = {
      likeId: id,
      status: "dislike",
    };
    axiosPublic.post("/thumbsCount", likeInfo).then((res) => {
      console.log(res.data);
      reactFetch();
    });
  };

  // const handleReport = id => {

  // }

  const { data: proUser = [] } = useQuery({
    queryKey: ["proUsers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/payments");
      return res.data;
    },
  });

  console.log("pr user is", proUser);

  const accessProUser = proUser.find((pro) => pro.email === user?.email);
  console.log(accessProUser);

  return (
    <div>
      <SectionHeader
        title="Survey Details"
        img="https://i.ibb.co/9ybkSMV/clipboard-6225718-1280.jpg"
      ></SectionHeader>
      <section className="max-w-2xl mx-auto p-10 border my-10 rounded">
        <div>
          <div className="flex gap-2">
            <img className="rounded-full w-12 h-12" src={photoURL} alt="" />
            <div>
              <h2 className="font-semibold">{name}</h2>
              {/* <p className="text-xs font-semibold">{category}</p> */}
              <p className="font-semibold text-xs">{timeFormate}</p>
            </div>
          </div>
          <div className="my-4">
            <span className="text-slate-600">
              Description :{" "}
              <span className="text-slate-500">{description}</span>
              <p className="text-slate-500">
                <span className="font-semibold">Category</span> : {category}
              </p>
            </span>
          </div>
          <div className="card bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <h2 className="card-title">{title}</h2>
              <div className="card-actions justify-end">
                {!isAdmin && !isSurveyor ? (
                  <>
                    {user?.email !== email ? (
                      <>
                        {yesVote === "Yes" && voteEmail === user?.email ? (
                          <>
                            <button
                              disabled
                              className="btn disabled:bg-slate-500 btn-sm btn-primary"
                            >
                              {option1}
                            </button>
                            <button
                              disabled
                              className="btn disabled:bg-slate-500 btn-sm btn-ghost"
                            >
                              {option2}
                            </button>
                          </>
                        ) : noVote === "No" && voteEmail === user?.email ? (
                          <>
                            <button
                              disabled
                              className="btn disabled:bg-slate-500 btn-sm btn-primary"
                            >
                              {option1}
                            </button>
                            <button
                              disabled
                              className="btn disabled:bg-slate-500 btn-sm btn-ghost"
                            >
                              {option2}
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              id="yesVote"
                              onClick={() => handleYesVote(_id)}
                              className="btn btn-sm btn-primary"
                            >
                              {option1}
                            </button>
                            <button
                              onClick={() => handleNoVote(_id)}
                              id="noVote"
                              className="btn btn-sm btn-ghost"
                            >
                              {option2}
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <div>
                        <button
                          id="yesVote"
                          disabled
                          className="btn btn-sm btn-primary disabled:bg-white cursor-not-allowed mr-4"
                        >
                          {option1}
                        </button>
                        <button
                          disabled
                          id="noVote"
                          className="btn btn-sm btn-ghost disabled:bg-white cursor-not-allowed"
                        >
                          {option2}
                        </button>

                        <p className="text-error mt-2">
                          &quot; Only Vote Pro User and Normal User &quot;
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div>
                    <button
                      id="yesVote"
                      disabled
                      className="btn btn-sm btn-primary disabled:bg-white cursor-not-allowed mr-4"
                    >
                      {option1}
                    </button>
                    <button
                      disabled
                      id="noVote"
                      className="btn btn-sm btn-ghost disabled:bg-white cursor-not-allowed"
                    >
                      {option2}
                    </button>

                    <p className="text-error mt-4">
                      {isAdmin
                        ? "You are the Admin. Therefore you cannot participate in this survey"
                        : "You are the surveyor. Therefore you cannot participate in this survey"}
                    </p>
                  </div>
                )}

                {/* <button
                  id="yesVote"
                  onClick={() => handleYesVote(_id)}
                  className="btn btn-sm btn-primary"
                >
                  {option1}
                </button>
                <button
                  onClick={() => handleNoVote(_id)}
                  id="noVote"
                  className="btn btn-sm btn-ghost"
                >
                  {option2}
                </button> */}
              </div>
            </div>
          </div>
          <div className="flex justify-evenly">
            <div className="flex items-center gap-6 my-6">
              {/* {findThisReaction?.map((react) => (
                <> */}
                  {/* {react?.status === "like" ? ( */}
                    <span className="flex items-center gap-1 font-semibold">
                      <span className="text-lg -mt-1">{likeCounts ? likeCounts.length : like}</span>
                      <FaHeart></FaHeart>
                    </span>
                  {/* ) : ( */}
                    <span className="flex items-center gap-1 font-semibold">
                      <span className="text-lg -mt-1">{disLikeCounts? disLikeCounts.length : dislike}</span>
                      <FaRegThumbsDown></FaRegThumbsDown>
                    </span>
                  {/* )}
                </>
              ))} */}
            </div>
            <div className="flex items-center gap-1">
              <FaComment></FaComment>
              {commentThisSurvey.length}
            </div>
          </div>
          <div className="flex justify-between items-center border rounded-lg p-3">
            <div className="flex gap-3 ">
              <button
                onClick={() => handleLike(_id)}
                className="btn btn-sm btn-success text-white"
              >
                <FaThumbsUp></FaThumbsUp>
              </button>
              <button
                onClick={() => handleDisLike(_id)}
                className="btn btn-sm btn-error text-white"
              >
                <FaThumbsDown></FaThumbsDown>
              </button>
            </div>
            <div className="">
              <Link to={`/report/${_id}`}>
                {" "}
                <button className="btn btn-info btn-sm">Report</button>
              </Link>
            </div>
          </div>
          {/* comments */}
          {/* <div className="my-10">
            {accessProUser.map((user) => (
              <div key={user._id}>
                {user.status === "success" ? (
                  <form onSubmit={handleComment}>
                    <div className="form-control">
                      <textarea
                        required
                        placeholder="Write Comment..."
                        className="input input-bordered resize-none h-20"
                        name="comment"
                        id=""
                      ></textarea>
                    </div>
                    <div className="form-control mt-6">
                      <button className="btn btn-primary w-24">Comment</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h2 className="text-error mb-5">
                      <button className="btn btn-error btn-sm text-white cursor-text">
                        Warning
                      </button>{" "}
                      : Only Pro User Can Comment this Survey.
                    </h2>
                    <form>
                      <div className="form-control">
                        <textarea
                          disabled
                          required
                          placeholder="Write Comment..."
                          className="input input-bordered resize-none h-20"
                          name="comment"
                          id=""
                        ></textarea>
                      </div>
                      <div className="form-control mt-6">
                        <button disabled className="btn btn-primary w-24">
                          Comment
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            ))}
          </div> */}
          {/* comments */}
          <div className="my-10">
            {accessProUser?.status === "Pro User" ? (
              <form onSubmit={handleComment}>
                <div className="form-control">
                  <textarea
                    required
                    placeholder="Write Comment..."
                    className="input input-bordered resize-none h-20"
                    name="comment"
                    id=""
                  ></textarea>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary w-24">Comment</button>
                </div>
              </form>
            ) : (
              <>
                <h2 className="text-error mb-5">
                  <button className="btn btn-error btn-sm text-white cursor-text">
                    Warning
                  </button>{" "}
                  : Only Pro User Can Comment this Survey.
                </h2>
                <form>
                  <div className="form-control">
                    <textarea
                      disabled
                      required
                      placeholder="Write Comment..."
                      className="input input-bordered resize-none h-20"
                      name="comment"
                      id=""
                    ></textarea>
                  </div>
                  <div className="form-control mt-6">
                    <button disabled className="btn btn-primary w-24">
                      Comment
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">See All Comments</h2>
            {commentThisSurvey?.map((comment) => (
              <div key={comment._id} className="my-5 border p-5 rounded-xl">
                <div className="flex gap-2">
                  <img
                    className="rounded-full w-8 h-8"
                    src={comment?.commentUserPhoto}
                    alt=""
                  />
                  <div>
                    <h2 className="font-semibold text-sm">
                      {comment.commentUserName}
                    </h2>
                    {/* <p className="text-xs font-semibold">{category}</p> */}
                    <p className="font-semibold text-xs">
                      {comment.commentDate}
                    </p>
                  </div>
                </div>
                <p className="my-2 text-slate-500">{comment.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SurveyDetails;
