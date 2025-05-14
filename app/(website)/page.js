import HomePage from "./home";
import { getAllPosts } from "@/lib/sanity/client";

export default function IndexPage() {
  return(<HomePage/>)
}

// export const revalidate = 60;
