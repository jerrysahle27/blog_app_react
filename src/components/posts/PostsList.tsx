import { fetchPosts, selectAllPosts, likePost } from "./postsSlice";
import { useAppDispatch, useAppSelector } from "../../app/services/hooks";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { TimeAgo } from "../../utils/TimeAgo";
import Pagination from "../../utils/PaginationComponent";
import { ChatBubbleOutlineRounded } from "@mui/icons-material";
import PostsComment from "./PostsComment";
import Spinner from "../../utils/Spinner";
export type comment = {
  index: number;
  status: boolean;
};
export default function PostsList() {
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.post.status);
  const loggedInUser = localStorage.getItem("user");
  const JsonUser = JSON.parse(loggedInUser ? loggedInUser : "");
  const { id } = JsonUser;
  const [showComment, setShowComment] = useState([] as comment[]);
  const CommentBox = [] as comment[];
  const dispatch = useAppDispatch();
  useMemo(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
    posts.forEach((post) => {
      CommentBox.push({ index: posts.indexOf(post), status: false });
    });
    setShowComment(CommentBox);
  }, [postStatus, posts, dispatch]);
  const handleLike = (id: string) => {
    dispatch(likePost(id));
  };

  const handleOpenComment = (index: number) => {
    setShowComment(
      showComment.map((c) =>
        c.index === index ? { ...c, status: true } : { ...c }
      )
    );
  };
  return (
    <>
      <motion.div
        animate={{ y: 10 }}
        transition={{ ease: "easeOut", duration: 2 }}
        className="bg-gray-70 py-6 sm:py-12"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Blogs
            </h2>
          </div>
          {postStatus === "loading" ? (
            <Spinner />
          ) : (
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              {posts.map((post, index) => (
                <Card
                  sx={{ maxWidth: 1000 }}
                  className="shadow-lg hover:shadow-2xl"
                  key={index}
                >
                  <div className="flex justify-between gap-x-7 text-xs">
                    <time dateTime={post.date} className="text-gray-500">
                      <TimeAgo timeStamp={post.date} />
                    </time>
                    <Chip
                      className=" hover:bg-blue-500"
                      color="primary"
                      label={post.category ? post.category.title : ""}
                    />
                  </div>
                  <CardHeader
                    avatar={
                      <img
                        src={post.user.avatar}
                        alt=""
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                    }
                    title={post.user.name}
                    subheader={post.user.email}
                  />

                  <CardContent>
                    <div className="group relative">
                      <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <a href="/">
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 break-all">
                        {post.description}
                      </p>
                    </div>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    className="mt-3 flex-1 justify-between"
                  >
                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                    >
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => handleLike(post._id)}
                      >
                        {post.likes.some((li) => li["user"] === id) ? (
                          <ThumbUpAltIcon />
                        ) : (
                          <ThumbUpOffAltIcon />
                        )}
                        <p className="line-clamp-3 text-sm leading-6 ml-1 text-gray-900">
                          Like
                        </p>
                      </IconButton>
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => handleOpenComment(index)}
                      >
                        <ChatBubbleOutlineRounded />
                        <p className="line-clamp-3 text-sm leading-6 ml-1 text-gray-900">
                          Comment
                        </p>
                      </IconButton>
                    </ButtonGroup>

                    <p className="line-clamp-3 text-sm leading-6 text-gray-900">
                      {post.likes.length !== 0
                        ? post.likes.length + "\tlikes"
                        : null}{" "}
                      {post.comments.length !== 0
                        ? post.comments.length + "\tcomments"
                        : null}
                    </p>
                  </CardActions>
                  <PostsComment
                    showComment={showComment}
                    index={index}
                    id={post._id}
                  />
                </Card>
              ))}
            </div>
          )}
        </div>
        <Pagination
          count={Math.trunc(posts.length / 5)}
          allResults={posts.length}
        />
      </motion.div>
    </>
  );
}
