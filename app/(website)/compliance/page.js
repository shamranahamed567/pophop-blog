import Image from "next/image";

import { getAllPosts } from "@/lib/sanity/client";

import { Button } from "@/components/ui/button"
import { Rss } from 'lucide-react';

import twitterLogo from '../../../public/img/twitter-x.svg'
import changeLogGrid from '../../../public/img/changelog-grid.svg'
import changeLogGridMobile from '../../../public/img/grid-mob.svg'

export default async function IndexPage() {
  const posts = await getAllPosts();

  return (
    <article className="relative">

      <div className="overflow-hidden">
        <Image src={changeLogGrid} alt="Changelog grid image" className="w-full hidden sm:block pointer-events-none z-0" style={{marginTop: "-68px"}} />
        <Image src={changeLogGridMobile} alt="Changelog grid image" className="w-full block sm:hidden z-0 pointer-events-none" style={{marginTop: "-76px"}} />
      </div>

      <section className="sm:max-w-278.5 sm:inset-x-0 sm:mx-auto inset-x-6 absolute top-16 sm:top-17">
        <div className="sm:pb-16 sm:pl-11">
          <h2 className="text-8 leading-10 sm:text-5xl sm:leading-16 text-black font-normal font-bonVivantSerif">Compliance</h2>
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
    </article>
  );
}

export const revalidate = 60;