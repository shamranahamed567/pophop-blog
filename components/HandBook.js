'use client'

import Image from 'next/image';
import { useState, useEffect } from 'react'
import { format } from 'date-fns';
import { useMediaQuery } from 'react-responsive'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Blocks, ChevronDown, ChevronRight, CreditCard, LayoutGrid, Search, Trophy, UsersRound, Volume2, X } from "lucide-react"

import { urlForImage } from "@/lib/sanity/image";
import { PortableText } from "@/lib/sanity/plugins/portabletext";

const findPostByCategoryAndSlug = (posts, category, slug) => {
  return posts.find(post => 
    post.categories.some(cat => 
      cat.title.toLowerCase() === category.toLowerCase()
    ) && 
    post.slug.current.toLowerCase() === slug.toLowerCase()
  );
};

const allowedCategories = ["company", "people", "engineering", "design", "success", "marketing"];

function HandBook({ postsCategory, category, slug, posts }) {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [showMobileCategory, setShowMobileCategory] = useState(false)

  const postsByCategory = Object.keys(postsCategory)
    .filter(category => 
      category.toLowerCase().includes(searchInput.toLowerCase())
    )
    .reduce((acc, category) => {
      acc[category] = postsCategory[category];
      return acc;
    }, {});

  const formattedDate = selectedBlog && format(new Date(selectedBlog?._createdAt), 'MMMM d, yyyy');
  const imageProps = selectedBlog?.mainImage ? urlForImage(selectedBlog?.mainImage) : null;

  useEffect(() => {
    const result = findPostByCategoryAndSlug(posts, category, slug.current);

    if(category && slug.current) {
      setSelectedCategory(category)
      setSelectedBlog(result)
    }
  },[category, slug.current])

  const foundTitle = selectedBlog && selectedBlog?.categories?.find(c => allowedCategories.includes(c.title.toLowerCase()))?.title;

  return (
    <article className="sm:max-w-278.5 sm:mx-auto border-x border-changelog-border mr-changelog-right ml-changelog-left px-4 sm:pl-8 sm:pr-11">
      <div className="sm:pt-14 pt-4 pb-20 sm:flex items-start gap-5">
        <div className="sm:max-w-61 w-full pb-2 sm:pb-0">
          {!isMobile && (
            <div className='relative mb-2 hidden sm:block'>
              <Input type="text" placeholder="Search..." className="h-9 pl-9 placeholder:text-text-muted text-sm leading-5" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              <Search size={16} strokeWidth={1.5}   className="absolute -translate-y-1/2 top-1/2 left-3 transform opacity-50" />
            </div>
          )}

          {isMobile && (
            <>
              {showMobileCategory ? (
                <div className='flex items-center gap-2 mb-2'>
                  <div className='relative flex-1'>
                    <Input type="text" placeholder="Search..." className="h-9 pl-9 placeholder:text-text-muted text-sm leading-5" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    <Search size={16} strokeWidth={1.5}   className="absolute -translate-y-1/2 top-1/2 left-3 transform opacity-50" />
                  </div>
                  <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={() => setShowMobileCategory(false)}>
                    <X size={16} strokeWidth={1.5} color='#000000' />
                  </Button>
                </div>
              ) : (
                <div className='mb-3 flex items-center gap-2 py-1'>
                  <ChevronRight color='#000000' size={16} strokeWidth={1.5} />
                  <button className='text-sm text-black font-geistRegular font-normal' onClick={() => setShowMobileCategory(true)}>
                    <span className='capitalize'>{foundTitle}</span> / {selectedBlog?.title}
                  </button>
                </div>
              )}
            </>
          )}

          {isMobile && showMobileCategory && (
            <>
              {Object.entries(postsByCategory).map(([category, posts]) => {
                const hasBlogCategory = selectedBlog && selectedBlog.categories.some(cat => cat.title.toLowerCase() === category.toLowerCase())

                return (
                  <div key={category} className={`${hasBlogCategory ? "" : "mb-3"}`}>
                    <Button variant="ghost" className={`h-9 px-3 w-full justify-between ${hasBlogCategory ? "text-black hover:text-black" : "text-slate-500 hover:text-slate-500"}`} onClick={() => setSelectedCategory(category)}>
                      <span className="flex items-center gap-2">
                        {category.toLowerCase() === "company" && <LayoutGrid size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        {category.toLowerCase() === "people" && <UsersRound size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        {category.toLowerCase() === "engineering" && <CreditCard size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        {category.toLowerCase() === "design" && <Blocks size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        {category.toLowerCase() === "success" && <Trophy size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        {category.toLowerCase() === "marketing" && <Volume2 size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        <span className="capitalize ">
                          {category}
                        </span>
                      </span>
                      {selectedCategory === category ? <ChevronDown size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : '#64748B'} /> : <ChevronRight size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : '#64748B'} />}
                    </Button>
                    {posts?.length > 0 && selectedCategory === category && (
                      <div className="mx-5 border-l border-slate-500 py-1">
                        {posts?.map(post => (
                          <Button variant="ghost" key={post?._id} className={`text-sm font-medium px-5.5 h-9 flex items-center justify-start w-full ${post?._id === selectedBlog?._id ? "text-black hover:text-black" : "text-slate-500 hover:text-slate-500"}`} onClick={() => {
                            setSelectedBlog(post)
                          }}>
                            {post.title}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              )}
            </>
          )}

          {!isMobile && (
            <>
              {Object.entries(postsByCategory).map(([category, posts]) => {
                const hasBlogCategory = selectedBlog && selectedBlog.categories.some(cat => cat.title.toLowerCase() === category.toLowerCase())

                return (
                  <div key={category} className={`${hasBlogCategory ? "" : "mb-3"}`}>
                    <Button variant="ghost" className={`h-9 px-3 w-full justify-between ${hasBlogCategory ? "text-black hover:text-black" : "text-slate-500 hover:text-slate-500"}`} onClick={() => setSelectedCategory(category)}>
                      <span className="flex items-center gap-2">
                        {category.toLowerCase() === "company" && <LayoutGrid size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        {category.toLowerCase() === "people" && <UsersRound size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        {category.toLowerCase() === "engineering" && <CreditCard size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        {category.toLowerCase() === "design" && <Blocks size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        {category.toLowerCase() === "success" && <Trophy size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        {category.toLowerCase() === "marketing" && <Volume2 size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : "#64748B"} />}
                        <span className="capitalize ">
                          {category}
                        </span>
                      </span>
                      {selectedCategory === category ? <ChevronDown size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : '#64748B'} /> : <ChevronRight size={16} strokeWidth={1.5} color={hasBlogCategory ? "#000000" : '#64748B'} />}
                    </Button>
                    {posts?.length > 0 && selectedCategory === category && (
                      <div className="mx-5 border-l border-slate-500 py-1">
                        {posts?.map(post => (
                          <Button variant="ghost" key={post?._id} className={`text-sm font-medium px-5.5 h-9 flex items-center justify-start w-full ${post?._id === selectedBlog?._id ? "text-black hover:text-black" : "text-slate-500 hover:text-slate-500"}`} onClick={() => {
                            setSelectedBlog(post)
                          }}>
                            {post.title}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              )}
            </>
          )}
        </div>
        
        {selectedBlog && (
          <aside className="flex-1">
            <h2 className="text-2xl font-geistMedium text-black font-medium">{selectedBlog?.title}</h2>
            <div className='mt-1.5 flex flex-col items-start sm:flex-row sm:items-center gap-1.5 sm:gap-5'>
              <p className="font-geistRegular text-sm font-normal flex items-center justify-between sm:justify-start w-full sm:w-auto gap-1.5">
                <span className='text-slate-500'>Updated</span>
                <span className='text-text-black'>{formattedDate}</span>
              </p>
              <p className="font-geistRegular text-sm font-normal flex items-center justify-between sm:justify-start w-full sm:w-auto gap-1.5">
                <span className='text-slate-500'>Reading time</span>
                <span className='text-text-black'>{selectedBlog.estReadingTime || "5"} min read</span>
              </p>
            </div>

            {imageProps && (
              <div className='my-5'>
                <Image
                  src={imageProps.src}
                  alt={selectedBlog.mainImage.alt || "Thumbnail"}
                  priority={true}
                  className="object-cover !w-full hidden sm:block !max-h-108.5"
                  style={{borderRadius: "10px"}}
                  width={imageProps.width}
                  height={434}
                />
                <Image
                  src={imageProps.src}
                  alt={selectedBlog.mainImage.alt || "Thumbnail"}
                  priority={true}
                  className="object-cover !w-full sm:hidden"
                  style={{borderRadius: "10px"}}
                  width={imageProps.width}
                  height={174}
                />
              </div>
            )}

            <div className="prose dark:prose-invert prose-a:text-blue-600 !max-w-full">
              {selectedBlog.body && <PortableText value={selectedBlog.body} />}
            </div>
          </aside>
        )}
      
      </div>
    </article>
  )
}

export default HandBook
