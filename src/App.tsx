import React, { useState, createContext, useEffect, useMemo } from 'react'
import './App.css'
import { AudioProvider } from './AudioProvider';
import { AudioPlayer } from './components/player/AudioPlayer'
import { FormattedDate } from './FormattedDate';
import { type Episode, getAllEpisodes } from './episodes'
import { EpisodePlayButton } from './EpisodePlayButton.tsx';
import { PauseIcon } from './PauseIcon';
import { PlayIcon } from './PlayIcon';
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook'

function SpotifyIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path d="M15.8 3a12.8 12.8 0 1 0 0 25.6 12.8 12.8 0 0 0 0-25.6Zm5.87 18.461a.8.8 0 0 1-1.097.266c-3.006-1.837-6.787-2.252-11.244-1.234a.796.796 0 1 1-.355-1.555c4.875-1.115 9.058-.635 12.432 1.427a.8.8 0 0 1 .265 1.096Zm1.565-3.485a.999.999 0 0 1-1.371.33c-3.44-2.116-8.685-2.728-12.755-1.493a1 1 0 0 1-.58-1.91c4.65-1.41 10.428-.726 14.378 1.7a1 1 0 0 1 .33 1.375l-.002-.002Zm.137-3.629c-4.127-2.45-10.933-2.675-14.871-1.478a1.196 1.196 0 1 1-.695-2.291c4.52-1.374 12.037-1.107 16.785 1.711a1.197 1.197 0 1 1-1.221 2.06" />
    </svg>
  )
}

function ApplePodcastIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.528 24.8c-.232.592-.768 1.424-1.536 2.016-.44.336-.968.664-1.688.88-.768.232-1.72.304-2.904.304H10.6c-1.184 0-2.128-.08-2.904-.304a4.99 4.99 0 0 1-1.688-.88c-.76-.584-1.304-1.424-1.536-2.016C4.008 23.608 4 22.256 4 21.4V10.6c0-.856.008-2.208.472-3.4.232-.592.768-1.424 1.536-2.016.44-.336.968-.664 1.688-.88C8.472 4.08 9.416 4 10.6 4h10.8c1.184 0 2.128.08 2.904.304a4.99 4.99 0 0 1 1.688.88c.76.584 1.304 1.424 1.536 2.016C28 8.392 28 9.752 28 10.6v10.8c0 .856-.008 2.208-.472 3.4Zm-9.471-6.312a1.069 1.069 0 0 0-.32-.688c-.36-.376-.992-.624-1.736-.624-.745 0-1.377.24-1.737.624-.183.2-.287.4-.32.688-.063.558-.024 1.036.04 1.807v.009c.065.736.184 1.72.336 2.712.112.712.2 1.096.28 1.368.136.448.625.832 1.4.832.776 0 1.273-.392 1.4-.832.08-.272.169-.656.28-1.368.152-1 .273-1.976.337-2.712.072-.776.104-1.256.04-1.816ZM16 16.375c1.088 0 1.968-.88 1.968-1.967 0-1.08-.88-1.968-1.968-1.968s-1.968.88-1.968 1.968.88 1.967 1.968 1.967Zm-.024-9.719c-4.592.016-8.352 3.744-8.416 8.336-.048 3.72 2.328 6.904 5.648 8.072.08.032.16-.04.152-.12a35.046 35.046 0 0 0-.041-.288c-.029-.192-.057-.384-.079-.576a.317.317 0 0 0-.168-.232 7.365 7.365 0 0 1-4.424-6.824c.04-4 3.304-7.256 7.296-7.288 4.088-.032 7.424 3.28 7.424 7.36 0 3.016-1.824 5.608-4.424 6.752a.272.272 0 0 0-.168.232l-.12.864c-.016.088.072.152.152.12a8.448 8.448 0 0 0 5.648-7.968c-.016-4.656-3.816-8.448-8.48-8.44Zm-5.624 8.376c.04-2.992 2.44-5.464 5.432-5.576 3.216-.128 5.88 2.456 5.872 5.64a5.661 5.661 0 0 1-2.472 4.672c-.08.056-.184-.008-.176-.096.016-.344.024-.648.008-.96 0-.104.04-.2.112-.272a4.584 4.584 0 0 0 1.448-3.336 4.574 4.574 0 0 0-4.752-4.568 4.585 4.585 0 0 0-4.392 4.448 4.574 4.574 0 0 0 1.448 3.456c.08.072.12.168.112.272-.016.32-.016.624.008.968 0 .088-.104.144-.176.096a5.65 5.65 0 0 1-2.472-4.744Z"
      />
    </svg>
  )
}

function RSSIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 4h15A4.5 4.5 0 0 1 28 8.5v15a4.5 4.5 0 0 1-4.5 4.5h-15A4.5 4.5 0 0 1 4 23.5v-15A4.5 4.5 0 0 1 8.5 4ZM13 22a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-6-6a9 9 0 0 1 9 9h3A12 12 0 0 0 7 13v3Zm5.74-4.858A15 15 0 0 0 7 10V7a18 18 0 0 1 18 18h-3a15 15 0 0 0-9.26-13.858Z"
      />
    </svg>
  )
}

function PersonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 11 12" {...props}>
      <path d="M5.019 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm3.29 7c1.175 0 2.12-1.046 1.567-2.083A5.5 5.5 0 0 0 5.019 7 5.5 5.5 0 0 0 .162 9.917C-.39 10.954.554 12 1.73 12h6.578Z" />
    </svg>
  )
}

let episodes = await getAllEpisodes("https://anchor.fm/s/e741494c/podcast/rss")

function App() {
  const gtmParams = { id: 'G-W86BT3ZBT6' }
  return (
    <>
      <GTMProvider state={gtmParams}>
        <AudioProvider>
            {/* */}
            <nav className="bg-white  dark:bg-gray-900 w-full p-2 border-none	border-gray-200 dark:border-gray-600">
              <div className="items-center mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
                      <div className="flex items-center justify-center sm:justify-normal sm:ml-6 md:pr-8 text-center sm:text-left">
                        <span className="font-bold text-2xl dark:text-white text-gray-800">
                          PlanB Security
                        </span>
                      </div>

                      <div className="flex mt-2">
                      {episodes.length > 0 && 
                        <a className="flex w-full items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 pl-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200" href={"#"+episodes[0].id}>
                          <span className="font-bold">New!</span> <span className="font-bold dark:text-white text-gray-800 hover:text-orange-300">{episodes[0].title}</span>
                          <span className="py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                            <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </span>
                        </a>
                      }
                      </div>

                    <div className="flex lg:pl-8 mt-3 text-right justify-center text-slate-500">
                      <span className="font-mono pr-2">Hosted by: </span> <a className="font-bold" target="_blank" href="https://x.com/mikemackintosh">@mikemackintosh</a>
                    </div>
                  </div>
                </div>
            </nav>
              
            {/* */}
            <main className="isolate">
            {/* Hero section */}
            <div className="relative isolate -z-10">
              <svg
                className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                    width={200}
                    height={200}
                    x="50%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                  <path
                    d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                    strokeWidth={0}
                  />
                </svg>
                <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
              </svg>
              <div
                className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                aria-hidden="true"
              >
                <div
                  className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                  style={{
                    clipPath:
                      'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                  }}
                />
              </div>
              <div className="overflow-hidden">
                <div className="max-w-7xl px-6">
                  <div className=" max-w-2xl gap-x-16 lg:mx-0 lg:flex lg:max-w-none">
                    <div className="pt-8 w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        PlanB Security is a Podcast talking about all things <span className="bg-purple-300 px-1 hover:bg-slate-800 hover:text-white hover:cursor-pointer">#InfoSec</span>, helping you prepare for when things go wrong.
                      </h1>
                      <div
                  className="mt-4 col-span-4 grid grid-cols-4 justify-center gap-10 mx-4 text-base font-medium leading-7 text-slate-800 sm:gap-8 lg:flex-col lg:gap-4"
                >
                  {(
                    [
                      ['Spotify', SpotifyIcon, "https://open.spotify.com/show/1I1lWiytUs20VRnLz1aUQb"],
                      ['Apple', ApplePodcastIcon, "https://podcasts.apple.com/gb/podcast/plan-b-security/id1702358824"],
                      ['RSS Feed', RSSIcon, "https://anchor.fm/s/e741494c/podcast/rss"],
                    ] as const
                  ).map(([label, Icon, URL]) => (
                    <div key={label} className="flex">
                      <a
                        href={URL}
                        className="group flex items-center"
                        aria-label={label}
                      >
                        <div className={"flex ml-18 items-center gap-x-1 bg-white border border-gray-200 text-sm text-gray-800 p-1 pl-2 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-200"}>
                          <Icon className="h-8 w-8 pr-1 md:pr-0 fill-purple-400 group-hover:fill-orange-400" />
                          <span className="hidden sm:ml-3 sm:block pr-4">{label}</span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
                      <p className="relative mt-6 text-lg text-gray-100 font-semibold leading-5 sm:max-w-md lg:max-w-none">
                        Security is not just a technical problem anymore. The industry is changing everyday, with new laws, regulations, requirements, attacks, threats, tooling and more. Join us every week as we touch upon new topics and new ways of thinking so you can grow through building a strong security program.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-12 pt-16 sm:pb-4 lg:pt-12 mx-6">
                <h1 className="text-2xl font-bold leading-7 text-slate-900">
                  Episodes
                </h1>
              <div className="">
                {episodes.map((episode) => (
                  <EpisodeEntry key={episode.id} episode={episode} />
                ))}
              </div>
            </div>

            <div className="fixed inset-x-0 bottom-0 z-10">
              <AudioPlayer />
            </div>
          </main>
        </AudioProvider>
      </GTMProvider>
    </>
  )
}

function EpisodeEntry({ episode }: { episode: Episode }) {
  let date = new Date(episode.published)

  return (
    <>
    <a id={episode.id.toString()}/>
    <article
      aria-labelledby={`episode-${episode.id}-title`}
      className="py-10 sm:py-12"
    >
        <div className="flex flex-col items-start">
          <div className=" rounded-t-lg bg-slate-800 p-4">
            <div className="flex text-center items-center">
              <h2
                id={`episode-${episode.id}-title`}
                className="flex-none mt-2 text-xl font-bold text-slate-100"
              >
                <a href={`/${episode.id}`}>{episode.title}</a>
              </h2>
              <div className="grow font-bold text-sm w-14 items-center mt-4 text-right">
                <span className="text-white font-mono pr-2 justify-end">
                  {episode.itunes_duration}
                </span>
              </div>
            </div>
            <FormattedDate
              date={date}
              className="order-first font-mono leading-7 text-sm text-slate-500"
            />
            <p className="mt-1 pb-2 leading-7 text-slate-300">
              {episode.description.replace("<p>", "").replace("</p>", "")}
            </p>
          </div>
          <div className="w-full px-5 pb-3 pt-3 flex items-center gap-4 rounded-b-lg bg-slate-700 border-t border-t-slate-600 border-b border-b-slate-900">
            <EpisodePlayButton
              episode={episode}
              className="flex items-center gap-x-3 text-sm font-bold leading-6 text-purple-400 hover:text-orange-400"
              playing={
                <>
                  <PauseIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true" className="text-md">Listen</span>
                </>
              }
              paused={
                <>
                  <PlayIcon className="h-2.5 w-2.5 fill-current" />
                  <span aria-hidden="true" className="text-md">Listen</span>
                </>
              }
            />
            {/* <span
              aria-hidden="true"
              className="text-sm font-bold text-slate-400"
            >
              /
            </span>
            <a
              href={`/${episode.id}`}
              className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              aria-label={`Show notes for episode ${episode.title}`}
            >
              Show notes
            </a> */}
          </div>
        </div>
    </article>
    </>
  )
}

export default App
