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
            <div key={comment._id} className="comment-box">
              <div>
                <Link
                  to={`/${comment.author.username}`}
                  className="text-decoration-none"
                >
                  <img
                    src={comment.author.imageUrl}
                    className="user-pic"
                    width="40"
                    height="40"
                    alt={comment.author.username}
                  />{" "}
                  <span className="username">{comment.author.username}</span>
                </Link>
                {comment.author.username === props.user.username ? (
                  <button
                    className="bin"
                    widht="20%"
                    onClick={() => deleteComment(comment._id)}
                  >
                    <i className="fas fa-trash-alt"></i>
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
