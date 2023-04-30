import { fetchPosts, selectAllPosts } from "./postsSlice";
import { useAppDispatch, useAppSelector } from "../../app/services/hooks";

import { useEffect, useMemo } from "react";
export default function PostsList() {
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector((state) => state.post.status);
  const dispatch = useAppDispatch();
  console.log(posts);
  useMemo(() => {
    if (postStatus === "idle") {
      console.log("i am here");
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);
  return (
    <div className="bg-gray-80 py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Blogs
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.date} className="text-gray-500">
                  {post.date}
                </time>
                <a
                  href="/"
                  className="relative z-10 rounded-full bg-gray-80 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {post.category !== undefined ? post.category.title : ""}
                </a>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  <a href="/">
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img
                  src={post.user.avatar}
                  alt=""
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <a href="/">
                      <span className="absolute inset-0" />
                      {post.user.name}
                    </a>
                  </p>
                  <p className="text-gray-600">{post.user.email}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
