import Image from "next/image";
import { format } from 'date-fns';
import Link from "next/link";

import { getAllPosts } from "@/lib/sanity/client";

import { Button } from "@/components/ui/button"
import { Rss } from 'lucide-react';

import twitterLogo from '../../../public/img/twitter-x.svg'
import changeLogGrid from '../../../public/img/changelog-grid.svg'
import changeLogGridMobile from '../../../public/img/grid-mob.svg'

import { urlForImage } from "@/lib/sanity/image";
import { PortableText } from "@/lib/sanity/plugins/portabletext";

export default async function IndexPage() {
  const posts = await getAllPosts();

  const filteredPosts = posts.filter(post => 
    post.categories.some(category => 
      category.title.toLowerCase() === 'changelog'
    )
  );

  return (
    <article className="relative">

      <div className="overflow-hidden">
        <Image src={changeLogGrid} alt="Changelog grid image" className="w-full hidden sm:block pointer-events-none z-0" style={{marginTop: "-68px"}} />
        <Image src={changeLogGridMobile} alt="Changelog grid image" className="w-full block sm:hidden z-0 pointer-events-none" style={{marginTop: "-76px"}} />
      </div>

      <section className="sm:max-w-278.5 sm:inset-x-0 sm:mx-auto inset-x-6 absolute top-16 sm:top-17">
        <div className="sm:pb-16 sm:pl-11">
          <h2 className="text-8 leading-10 sm:text-5xl sm:leading-16 text-black font-medium font-geistMedium">Changelog</h2>
          <h4 className="text-lg sm:text-xl leading-6 font-medium text-black font-geistMedium mt-2 sm:mt-1.5">All the latest updates, improvements, and fixes</h4>
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

      {filteredPosts && (
        <aside className="ml-changelog-left mr-changelog-right border-x border-changelog-border px-4 sm:px-12 sm:max-w-278.5 sm:mx-auto">
          {filteredPosts.map((currentPost) => {
            const imageProps = currentPost.mainImage
              ? urlForImage(currentPost.mainImage)
              : null;
            const preloadImage = true
            
            const formattedDate = format(new Date(currentPost._createdAt), 'MMMM d, yyyy');

            return (
              <div key={currentPost._id} className="sm:pt-14 pt-4 pb-20 sm:flex items-start gap-5">
                <Link className="cursor-pointer max-w-61 w-full" href={`/changelog/${currentPost.slug.current}`}>
                  <p className="py-1 font-geistRegular text-sm text-black font-normal">{formattedDate}</p>
                </Link>

                <aside className="flex-1">
                  <Link className="cursor-pointer" href={`/changelog/${currentPost.slug.current}`}>
                    <h2 className="text-2xl font-geistMedium text-black font-medium">{currentPost.title}</h2>
                  </Link>
                  {imageProps && (
                    <Link className="cursor-pointer" href={`/changelog/${currentPost.slug.current}`}>
                      <Image
                        src={imageProps.src}
                        alt={currentPost.mainImage.alt || "Thumbnail"}
                        priority={preloadImage ? true : false}
                        className="object-cover !w-full hidden my-5 sm:block"
                        style={{borderRadius: "10px"}}
                        width={imageProps.width}
                        height={424}
                      />
                      <Image
                        src={imageProps.src}
                        alt={currentPost.mainImage.alt || "Thumbnail"}
                        priority={preloadImage ? true : false}
                        className="object-cover !w-full my-5 sm:hidden"
                        style={{borderRadius: "10px"}}
                        width={imageProps.width}
                        height={174}
                      />
                    </Link>
                  )}
                
                  <div className="prose dark:prose-invert prose-a:text-blue-600 !max-w-full">
                    {currentPost.body && <PortableText value={currentPost.body} />}
                  </div>
                </aside>
              </div>
            )
          })}
        </aside>
      )}
    </article>
  );
}

export const revalidate = 60;