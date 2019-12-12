import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CommentList = props => {
  let commentList = (
    <>
      {props.event.comments
        .sort(function(a, b) {
          return new Date(a.date) - new Date(b.date);
        })
        .map(comment => {
          let deleteComment = commentId => {
            axios
              .put(`/api/comments/${props.event._id}`, { commentId: commentId })
              .then(() => {
                props.getSingleEvent();
                props.getAllEvents();
              });
          };

          return (
            <div key={comment._id}>
              <div>
                <Link to={`/${comment.author.username}`}>
                  <img
                    src={comment.author.imageUrl}
                    className="user-pic"
                    width="10%"
                    alt={comment.author.username}
                  />{" "}
                  <span>{comment.author.username}</span>
                </Link>
                {comment.author.username === props.user.username ? (
                  <button
                    className="bin"
                    widht="20%"
                    onClick={() => deleteComment(comment._id)}
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
              <p>
                {comment.content
                  .trim()
                  .split("\n")
                  .map((item, index) => {
                    return (
                      <span key={index}>
                        {item}

                        <br />
                      </span>
                    );
                  })}
              </p>
            </div>
          );
        })}
    </>
  );

  return props.event ? <div>{commentList}</div> : <div></div>;
};
export default CommentList;
