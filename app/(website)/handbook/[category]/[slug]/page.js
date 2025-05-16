import PostPage from "./default";

import { getAllPostsSlugs, getPostBySlugAndCategory } from "@/lib/sanity/client";

export async function generateStaticParams() {
  return await getAllPostsSlugs();
}

export async function generateMetadata({ params }) {
 const post = await getPostBySlugAndCategory(params.slug, params.category);
  return { title: post.title };
}

export default async function PostDefault({ params }) {
  const post = await getPostBySlugAndCategory(params.slug, params.category);

  return <PostPage post={post} category={params.category} slug={params.slug} />;
}

export const revalidate = 60;
