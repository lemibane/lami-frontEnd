import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Home.css";
import AskQuestion from "../AskQuestion/AskQuestion";
import Answer from "../AnsQuestion/AnsQuestion";
import Question from "../Community/Question";
import axios from "axios";
import { MdArrowForwardIos } from "react-icons/md";

const Home = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);
  const [page, setPage] = useState("Home");
  const [allQuestions, setAllQuestions] = useState([]);
  let [currrentQuestion, setCurrrentQuestion] = useState([]);
  let q = [];
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
    // console.log(">>>>>>>>Home useEffect: 0");
    const fetchQuestions = async () => {
      // console.log(">>>>>>>>Home useEffect >> fetchQuestions: 1");

      let questions = await axios.get("http://localhost:4000/api/questions");
      // console.log(">>>>>>>>Home useEffect >> fetchQuestions: 2");

      questions = questions.data.data;
      // console.log(">>>>>>>>Fetched questions:", questions);
      setAllQuestions(() => {
        return questions;
      });
    };
    fetchQuestions();
  }, [userData.user, navigate]);

  return (
    <>
      <div className="home">
        {/* show username in homepage */}
        <div className="home__top">
          {/* <Link to="/AskQuestion"> */}
          <button
            onClick={() => {
              navigate("/ask");
            }}
            className="home_topBtn"
          >
            Ask Question
          </button>

          <h6>Welcome: {userData.user?.display_name}</h6>
        </div>
        {/* <button onClick={logout}>Log out</button> */}
        <h3 className="home__question">Questions</h3>
        {/* <div> printed: {allQuestions[0]?.question_id}</div> */}
        <div className="home__questionLists">
          <div>
            {allQuestions?.map((question) => (
              <div key={question.question_id}>
                <Link
                  // to={`/answer`}
                  to={`/answer/:${question.question_id}`}
                  // state prop used to pass the data along the link
                  state={{
                    question: question,
                    currentUserId: userData.user?.id,
                  }}
                  className="Link"
                >
                  <Question show={question} />
                  <MdArrowForwardIos className="MdArrowForwardIos" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        {allQuestions.length < 3 && (
          <div className="home__questionListsBottom" />
        )}
        {/* logout when the button clicked in which the function comes from app.js */}
        {/* <button onClick={logout}>Log out</button> */}
      </div>
    </>
  );
};

export default Home;
