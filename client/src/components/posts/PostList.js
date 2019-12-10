import React from "react";

const PostList = props => {
  let postList = (
    <>
      {props.allEvents
        .filter(post => post.type === "post")
        .sort(function(a, b) {
          return new Date(b.date) - new Date(a.date);
        })
        .map(post => {
          return (
          <>
            <div className="post">

            <img src={post.imageUrl} className="user-pic" width="5%" alt={post.username}/>
            <p>{post.date}</p>
            <p>{post.description}</p>

            </div>
            
          </>)
        })}
    </>
  );
  return <div>{postList}</div>;
};

export default PostList;
