import React, { useState, Fragment, useEffect } from "react";
import {
  useCreateVoteMutation,
  useGetVotesForSubByUserQuery,
  useGetSubmissionsForQuestionQuery,
} from "../../../reducers/api";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CheckVotes from "./CheckVotes";

const CreateVote = ({ questionId, submissionId }) => {
  const socket = io.connect("http://localhost:3000");
  socket.on("connect", () => {});
  const [active, setActive] = useState(false);
  const [createVote] = useCreateVoteMutation();

  const { data: voted } = useGetVotesForSubByUserQuery(submissionId);

  const handleClick = () => {
    setActive(!active);
  };

  useEffect(() => {
    setActive(voted);
  }, [voted]);

  const onCreateVote = async () => {
    await createVote({ questionId, submissionId })
      .then(() => {
        socket.emit("new_vote", submissionId);
      })
      .catch(() => {
        console.log("error");
      });
  };

  const voteStyle = () => {
    if (active) {
      return "#fa6b21";
    } else if (!active) {
      return "#ffff";
    } else {
      return null;
    }
  };

  return (
    <Fragment>
      <div
        onClick={function (event) {
          onCreateVote();
          handleClick();
        }}
        className="vote-button"
        style={{ color: voteStyle() }}
      >
        <ThumbUpAltIcon />
      </div>
      {/* <CheckVotes submissionId={submissionId} />  */}
    </Fragment>
  );
};

export default CreateVote;
