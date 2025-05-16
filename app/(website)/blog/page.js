import { getAllPosts } from "@/lib/sanity/client";
import Container from "@/components/container";
import PostList from "@/components/postlist";
import Link from "next/link";

export default async function IndexPage() {
  const posts = await getAllPosts();

  const filteredPosts = posts.filter(post => 
    post.categories.some(category => 
      category.title.toLowerCase() === 'blog'
    )
  );

  return (
    <>
      {filteredPosts && (
        <section className="py-5 px-6 sm:py-8 sm:max-w-278.5 sm:mx-auto sm:px-0">
          <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
            {filteredPosts.slice(0, 2).map(post => (
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
            {filteredPosts.slice(2, 14).map(post => (
              <PostList key={post._id} post={post} aspect="square" />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/all-post"
              className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
              <span>View all Posts</span>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}

export const revalidate = 60;