'use client'

import Image from "next/image";
import { useMediaQuery } from 'react-responsive'

import { notFound } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";

import CategoryLabel from "@/components/blog/category";
import AuthorCard from "@/components/blog/authorCard";

import changeLogGrid from '../../../../public/img/changelog-grid.svg'
import changeLogGridMobile from '../../../../public/img/grid-mob.svg'

import { Button } from "@/components/ui/button"

export default function Post(props) {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const { loading, post } = props;

  const slug = post?.slug;

  if (!loading && !slug) {
    notFound();
  }

  const imageProps = post?.mainImage
    ? urlForImage(post?.mainImage)
    : null;

  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  return (
    <article className="relative">
      <div className="overflow-hidden">
        <Image src={changeLogGrid} alt="Changelog grid image" className="w-full hidden sm:block pointer-events-none z-0" style={{marginTop: "-68px"}} />
        <Image src={changeLogGridMobile} alt="Changelog grid image" className="w-full block sm:hidden z-0 pointer-events-none" style={{marginTop: "-76px"}} />
      </div>

      <section className="sm:max-w-278.5 sm:inset-x-0 sm:mx-auto inset-x-6 absolute top-16 sm:top-18">
        <div className="sm:pb-16 sm:pl-11">
          {isMobile ? (
            <div className="flex justify-start">
              <CategoryLabel categories={post.categories} nomargin={true} />
            </div>
          ) : (
            <>
              {post?.categories?.map((category, index) => (
                <Button variant="outline" key={index} className="h-9 px-5 border-menu-btn rounded-md text-sm text-blog-time uppercase font-medium" style={{letterSpacing: "-0.154px"}}>
                  {category.title}
                </Button>
              ))}
            </>
          )}
          
          <h2 className="text-2xl leading-10 sm:text-4xl sm:leading-16 text-black font-medium font-geistMedium my-3 line-clamp-2 sm:line-clamp-none">{post?.title}</h2>
          <div className="flex items-center justify-between sm:justify-normal gap-5">
            <div className="flex items-center gap-2.5">
              {AuthorimageProps && (
                <div className="relative h-10 w-10 flex-shrink-0">
                  <Image
                    src={AuthorimageProps.src}
                    alt={post?.author?.name}
                    className="rounded-full object-cover"
                    fill
                    sizes="40px"
                  />
                </div>
              )}
              <p className="text-sm font-geistRegular text-blog-time font-normal">
                {post?.author.name}
              </p>
            </div>
            <time
              className="text-sm font-geistRegular text-blog-time font-normal"
              dateTime={post?.publishedAt || post?._createdAt}>
              {format(
                parseISO(post?.publishedAt || post?._createdAt),
                "MMMM dd, yyyy"
              )}
            </time>
            {!isMobile && <span className="text-sm font-geistRegular text-blog-time font-normal">{post?.estReadingTime || "5"} min read</span>}
          </div>
          {isMobile && <p className="text-sm font-geistRegular text-blog-time font-normal mt-4">{post?.estReadingTime || "5"} min read</p>}
        </div>
      </section>

      <article className="sm:max-w-278.5 sm:mx-auto ml-changelog-left mr-changelog-right border-x border-changelog-border sm:flex pb-6 sm:pb-18.5">
        <div className="space-y-6 sm:space-y-8 flex-1">
          <div className="relative z-0 aspect-video overflow-hidden">
            {imageProps && (
              <Image
                src={imageProps.src}
                alt={post.mainImage?.alt || "Thumbnail"}
                loading="eager"
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>

          <div className="prose dark:prose-invert prose-a:text-blue-600 max-w-full px-2.5 sm:px-9">
            {post?.body && <PortableText value={post?.body} />}
          </div>
        </div>
        <div className="border-l border-changelog-border max-w-69 w-full shrink-0 bg-future-card self-stretch hidden sm:block"></div>
      </article>
    </article>
  );
}

const MainImage = ({ image }) => {
  return (
    <div className="mb-12 mt-12 ">
      <Image {...urlForImage(image)} alt={image.alt || "Thumbnail"} />
      <figcaption className="text-center ">
        {image.caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {image.caption}
          </span>
        )}
      </figcaption>
    </div>
  );
};
