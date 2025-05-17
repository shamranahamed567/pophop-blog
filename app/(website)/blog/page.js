import Image from "next/image";

import { getAllPosts } from "@/lib/sanity/client";

import changeLogGrid from '../../../public/img/changelog-grid.svg'
import changeLogGridMobile from '../../../public/img/grid-mob.svg'
import BlogPosts from "@/components/BlogPosts";

const notAllowedCategories = ["company", "people", "engineering", "design", "success", "marketing", "changelog"];

export default async function IndexPage() {
  const posts = await getAllPosts();

  const filteredPosts = posts.filter(post => 
    !post.categories.some(c => notAllowedCategories.includes(c.title.toLowerCase()))
  );

  const uniqueCategories = [...new Set(
    filteredPosts.flatMap(post => 
      post.categories.map(category => category.title.toLowerCase())
    )
  )];

  return (
    <article className="relative">
      <div className="overflow-hidden">
        <Image src={changeLogGrid} alt="Changelog grid image" className="w-full hidden sm:block pointer-events-none z-0" style={{marginTop: "-68px"}} />
        <Image src={changeLogGridMobile} alt="Changelog grid image" className="w-full block sm:hidden z-0 pointer-events-none" style={{marginTop: "-76px"}} />
      </div>

      <BlogPosts filteredPosts={filteredPosts} uniqueCategories={['All', ...uniqueCategories]} />
    </article>
  );
}

export const revalidate = 60;