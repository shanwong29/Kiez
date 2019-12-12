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
          console.log(comment);
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
              </div>
              <p>{comment.content}</p>
            </div>
          );
        })}
    </>
  );

  return props.event ? <div>{commentList}</div> : <div></div>;
};
export default CommentList;
