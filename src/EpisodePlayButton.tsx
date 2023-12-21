'use client'

import React from 'react';

import { useAudioPlayer } from './AudioProvider'
import { type Episode } from './episodes'
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'

export function EpisodePlayButton({
  episode,
  playing,
  paused,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & {
  episode: Episode
  playing: React.ReactNode
  paused: React.ReactNode
}) {
  let player = useAudioPlayer(episode)

  const sendDataToGTM = useGTMDispatch()

  return (
    <button
      type="button"
      onClick={() => {
        sendDataToGTM({ event: 'play_episode', value: episode.title });
        player.toggle();
      }}
      aria-label={`${player.playing ? 'Pause' : 'Play'} episode ${
        episode.title
      }`}
      {...props}
    >
      {player.playing ? playing : paused}
    </button>
  )
}
