'use client'

import { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import PostList from "@/components/postlist";

import { Button } from "@/components/ui/button"
import { Check, LayoutList } from 'lucide-react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer-mob";

function BlogPosts({ filteredPosts, uniqueCategories }) {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [selectedCategory, setSelectedCategory] = useState('All')

  const finalFilteredPosts = selectedCategory === 'All' 
    ? filteredPosts 
    : filteredPosts.filter(post =>
        post.categories.some(category => 
          category.title.toLowerCase() === selectedCategory.toLowerCase()
        )
      );

  return (
    <>
      <section className="sm:max-w-278.5 sm:inset-x-0 sm:mx-auto inset-x-6 absolute top-16 sm:top-17">
        <div className="sm:pb-16 sm:pl-11">
          <h2 className="text-8 leading-10 sm:text-5xl sm:leading-16 text-black font-medium font-geistMedium">Blog</h2>
          <h4 className="text-lg sm:text-xl leading-6 font-medium text-black font-geistMedium mt-2 sm:mt-1.5">Latest news and updates from PopHop</h4>
          {!isMobile && (
            <div className="mt-6 flex items-center gap-2 sm:gap-3">
              {uniqueCategories.map((category) => (
                <Button key={category} variant={selectedCategory === category ? '' : 'outline'} className={`h-9 gap-1.5 rounded-full font-medium capitalize ${selectedCategory === category ? "bg-black shadow-btn-shadow text-blog-btn" : "border-blog-not shadow-sm bg-white text-btn-text"} ${category === "All" ? "px-5.25" : "px-8"}`} onClick={() => setSelectedCategory(category)}>
                  {category}
                </Button>
              ))}
            </div>
          )}

          {isMobile && (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" className="text-btn-text gap-2 h-9 w-full rounded-full justify-start mt-6">
                  <LayoutList color='#000000' size={16} strokeWidth={1.5} />
                  Categories
                </Button>
              </DrawerTrigger>
              <DrawerContent className="!h-auto block gap-0 p-0 mb-3 mx-3 rounded-xl">
                <div className="pt-4 pb-6 px-6">
                  <div className="p-3 bg-com-tab rounded-lg space-y-1">
                    {uniqueCategories.map((category) => (
                      <DrawerClose key={category} asChild>
                        <Button
                          variant="secondary"
                          className="text-muted-foreg h-9 hover:text-type-text flex items-center justify-between gap-2 bg-white hover:bg-white w-full hover:border border-menu-btn rounded-md capitalize"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                          {selectedCategory === category && <Check color='#000000' size={16} strokeWidth={1.5} />}
                        </Button>
                      </DrawerClose>
                    ))}
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </section>

      {finalFilteredPosts && (
        <section className="ml-changelog-left mr-changelog-right sm:max-w-278.5 sm:mx-auto">
          <div className="grid sm:grid-cols-3 grid-cols-1 overflow-hidden border-t border-x border-changelog-border mb-5 sm:mb-0">
            {finalFilteredPosts.map((post, index) => (
              <PostList key={post._id} post={post} index={index} aspect="square" filteredPosts={finalFilteredPosts} />
            ))}
          </div>
          <div className='h-15 w-full border-t border-x border-changelog-border hidden sm:block'></div>
        </section>
      )}
    </>
  )
}

export default BlogPosts
