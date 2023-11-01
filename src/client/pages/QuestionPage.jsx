import React from "react";
import CreateSubmission from "../components/inputs/CreateSubmission";
import { useParams } from "react-router-dom";
import { useGetQuestionByIdQuery } from "../reducers/api/";
import DisplaySubmissions from "../components/inputs/DisplaySubmissions";
import CloseQuestion from "../components/inputs/CloseQuestion";
import { useNavigate } from "react-router-dom";

const QuestionPage = () => {
  const { questionId } = useParams();

  const { data: questionData, isLoading: questionLoading } =
    useGetQuestionByIdQuery(questionId);

  const renderQuestion = () => {
    if (questionLoading) return <div>Loading question...</div>;
    if (!questionData) return null;
    return <h2>{questionData.title}</h2>;
  };

  const navigate = useNavigate();

  const handleMaybeLaterClick = () => {
    const path = `/question/${questionId}/submissions`;
    navigate(path);
  };

  return (
    <div>
      {renderQuestion()}
      <CreateSubmission questionId={questionId} />
      <p
        onClick={handleMaybeLaterClick}
        className="maybe-later"
      >
        maybe later
      </p>
      <CloseQuestion />
      {/* <DisplaySubmissions questionId={questionId}/> */}
    </div>
  );
};

export default QuestionPage;
