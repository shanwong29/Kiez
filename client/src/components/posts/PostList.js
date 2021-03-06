import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PostList = (props) => {
  let postList = (
    <>
      {props.allPosts.map((post) => {
        let monthEng = {
          0: "Jan",
          1: "Feb",
          2: "Mar",
          3: "Apr",
          4: "May",
          5: "Jun",
          6: "Jul",
          7: "Aug",
          8: "Sep",
          9: "Oct",
          10: "Nov",
          11: "Dec",
        };
        let formattedDate = new Date(post.date);
        let date = formattedDate.getDate();
        let monthNum = formattedDate.getMonth();
        let month = monthEng[monthNum];
        const year = formattedDate.getFullYear();

        let deletePost = (id) => {
          axios
            .delete(`/api/events/${id}`)
            .then((res) => {
              props.getAllPosts();
            })
            .catch((err) => {
              console.log(err);
            });
        };

        return (
          <div key={post._id} className="post">
            <div>
              <Link
                to={`/${post.creater.username}`}
                className="text-decoration-none"
              >
                <img
                  src={post.creater.imageUrl}
                  className="user-pic"
                  width="34"
                  height="34"
                  alt={post.username}
                />
                <span className="username">{` ${post.creater.username}`}</span>
              </Link>
              <span className="date">{`   ${date}. ${month}. ${year} `}</span>

              {post.creater.username === props.user.username ? (
                <button
                  className="bin"
                  widht="20%"
                  onClick={() => deletePost(post._id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              ) : (
                <div></div>
              )}
            </div>

            <p>
              {post.description
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
  return <div>{postList}</div>;
};

export default PostList;
