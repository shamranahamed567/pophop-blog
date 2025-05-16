import Image from "next/image";

import { notFound } from "next/navigation";

import { getAllPosts } from "@/lib/sanity/client";

import { Button } from "@/components/ui/button"
import { Rss } from 'lucide-react';

import twitterLogo from '../../../../../public/img/twitter-x.svg'
import changeLogGrid from '../../../../../public/img/changelog-grid.svg'
import changeLogGridMobile from '../../../../../public/img/grid-mob.svg'

import HandBook from '../../../../../components/HandBook'

export default async function Post(props) {
  const { loading, post, category } = props;

  const slug = post?.slug;

  if (!loading && !slug) {
    notFound();
  }

  const posts = await getAllPosts();
    
  const allowedCategories = ["company", "people", "engineering", "design", "success", "marketing"];

  const postsByCategory = posts.reduce((acc, post) => {
    post.categories.forEach(category => {
      const categoryName = category.title.toLowerCase();
      if (allowedCategories.includes(categoryName)) {
        acc[categoryName] = acc[categoryName] || [];
        acc[categoryName].push(post);
      }
    });
    return acc;
  }, Object.fromEntries(allowedCategories.map(cat => [cat, []])));

  return (
      <article className="relative">
        <div className="overflow-hidden">
          <Image src={changeLogGrid} alt="Changelog grid image" className="w-full hidden sm:block pointer-events-none z-0" style={{marginTop: "-68px"}} />
          <Image src={changeLogGridMobile} alt="Changelog grid image" className="w-full block sm:hidden z-0 pointer-events-none" style={{marginTop: "-76px"}} />
        </div>
   
        <section className="sm:max-w-278.5 sm:inset-x-0 sm:mx-auto inset-x-6 absolute top-16 sm:top-17">
          <div className="sm:pb-16 sm:pl-11">
            <h2 className="text-8 leading-10 sm:text-5xl sm:leading-16 text-black font-medium font-geistMedium">Handbook</h2>
            <h4 className="text-lg sm:text-xl leading-6 font-medium text-black font-geistMedium mt-2 sm:mt-1.5">The process behind PopHop.co</h4>
            <div className="mt-6 flex items-center gap-2 sm:gap-3">
              <Button className="h-8 px-5 gap-1.5 rounded-full font-medium">
                <Image src={twitterLogo} alt="Twitter logo" className="w-4 h-4" />
                Follow
              </Button>
              <Button className="h-8 px-5 gap-1.5 rounded-full">
                <Rss size={16} strokeWidth={1.5} color="#FFFFFF" />
              </Button>
            </div>
          </div>
        </section>
   
        <HandBook postsCategory={postsByCategory} posts={posts} category={category} slug={slug} />
      </article>
  );
}
