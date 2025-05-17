import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category";

export default function PostList({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight,
  index,
  filteredPosts,
  columns = 3
}) {
  const imageProps = post?.mainImage
    ? urlForImage(post.mainImage)
    : null;
  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;
  
  const rows = Math.ceil(filteredPosts.length / columns);
  const currentRow = Math.floor(index / columns);
  const currentColumn = index % columns;
  const isLastColumn = currentColumn === columns - 1;
  const isLastRow = currentRow === rows - 1;

  return (
    <>
      <div
        className={cx(
          `group cursor-pointer overflow-hidden border-b sm:border-r sm:border-b border-changelog-border ${isLastColumn ? 'sm:border-r-0' : ''} ${isLastRow ? 'sm:border-b-0' : ''}`,
          minimal && "grid gap-10 md:grid-cols-2"
        )}>
        <div
          className={cx(
            " overflow-hidden bg-gray-100 transition-all dark:bg-gray-800"
          )}>
          <Link
            className={cx(
              "relative block !h-52 w-full",
              aspect === "landscape"
                ? "aspect-video"
                : aspect === "custom"
                ? "aspect-[5/4]"
                : "aspect-square"
            )}
            href={`/blog/${pathPrefix ? `${pathPrefix}/` : ""}${
              post.slug.current
            }`}>
            {imageProps ? (
              <Image
                src={imageProps.src}
                {...(post.mainImage.blurDataURL && {
                  placeholder: "blur",
                  blurDataURL: post.mainImage.blurDataURL
                })}
                alt={post.mainImage.alt || "Thumbnail"}
                priority={preloadImage ? true : false}
                className="object-cover transition-all !h-52"
                fill
                sizes="(max-width: 768px) 30vw, 33vw"
              />
            ) : (
              <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
                <PhotoIcon />
              </span>
            )}
          </Link>
        </div>

        <div className={cx(minimal && "flex items-center")}>
          <div className="p-6">
            <CategoryLabel
              categories={post.categories}
              nomargin={true}
            />
            <h2
              className={cx(
                fontSize === "large"
                  ? "text-2xl"
                  : minimal
                  ? "text-3xl"
                  : "text-lg",
                fontWeight === "normal"
                  ? "line-clamp-2 font-medium  tracking-normal text-black"
                  : "font-semibold leading-snug tracking-tight",
                "mt-2 dark:text-white"
              )}>
              <Link
                href={`/blog/${pathPrefix ? `${pathPrefix}/` : ""}${
                  post.slug.current
                }`}>
                <span
                  className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
                    bg-no-repeat
                    transition-[background-size]
                    duration-500
                    hover:bg-[length:100%_3px]
                    group-hover:bg-[length:100%_10px]
                  dark:from-purple-800 dark:to-purple-900">
                  {post.title}
                </span>
              </Link>
            </h2>

            <div className="hidden">
              {post.excerpt && (
                <p className="mt-2 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                  <Link
                    href={`/blog/${
                      pathPrefix ? `${pathPrefix}/` : ""
                    }${post.slug.current}`}>
                    {post.excerpt}
                  </Link>
                </p>
              )}
            </div>

            <div className="mt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              {post?.author?.image && (
                <div className="relative h-8 w-8 flex-shrink-0">
                  {post?.author?.image && (
                    <Image
                      src={AuthorimageProps.src}
                      alt={post?.author?.name}
                      className="rounded-full object-cover"
                      fill
                      sizes="32px"
                    />
                  )}
                </div>
              )}
              <time
                className="truncate text-sm font-geistRegular text-blog-time"
                dateTime={post?.publishedAt || post._createdAt}>
                {format(
                  parseISO(post?.publishedAt || post._createdAt),
                  "MMMM dd, yyyy"
                )}
              </time>
              <span className='text-sm text-blog-time font-normal'>{post.estReadingTime || "5"} min read</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
