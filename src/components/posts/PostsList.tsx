import { fetchPosts, selectAllPosts, likePost } from "./postsSlice";
import { useAppDispatch, useAppSelector } from "../../app/services/hooks";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { TimeAgo } from "../../utils/TimeAgo";

export default function PostsList() {
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.post.status);
  const dispatch = useAppDispatch();
  useMemo(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);
  const handleLike = (id: string) => {
    dispatch(likePost(id));
  };
  return (
    <motion.div
      animate={{ y: 10 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className="bg-gray-70 py-12 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blogs
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-400 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <Card
              sx={{ maxWidth: 1000 }}
              className="shadow-lg hover:shadow-2xl"
            >
              <div className="flex items-center gap-x-7 text-xs">
                <time dateTime={post.date} className="text-gray-500">
                  <TimeAgo timeStamp={post.date} />
                </time>
                <a
                  href="/"
                  className="relative z-10 rounded-full bg-gray-80 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category !== undefined ? post.category.title : ""}
                </a>
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
              <CardActions disableSpacing className="mt-3">
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => handleLike(post._id)}
                >
                  <FavoriteIcon />
                </IconButton>
                <p className=" line-clamp-3 text-sm leading-6 text-gray-900">
                  {post.likes.length !== 0 ? post.likes.length + "likes" : null} 
                </p>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
