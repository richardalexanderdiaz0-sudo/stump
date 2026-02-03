import { useLibraries } from '@stump/client'
import { Helmet } from 'react-helmet'

import { SceneContainer } from '@/components/container'

import ContinueReadingMedia from './ContinueReading'
import NoLibraries from './NoLibraries'
import RecentlyAddedMedia from './RecentlyAddedMedia'
import RecentlyAddedSeries from './RecentlyAddedSeries'

// TODO: account for new accounts, i.e. no media at all
export default function HomeScene() {
	const { libraries, isLoading } = useLibraries()

	const helmet = (
		<Helmet>
			{/* Manga Verse branding */}
			<title>Manga Verse | {'Home'}</title>
		</Helmet>
	)

	if (isLoading) {
		return <></>
	}

	if (!libraries?.length) {
		return (
			<>
				{helmet}
				<NoLibraries />
			</>
		)
	}

	return (
		<SceneContainer className="flex flex-col gap-6">
			{helmet}
			{/* Hero (Netflix-like) */}
			{/* New: Manga Verse branded hero */}
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
			{/* @ts-ignore */}
			{typeof window !== 'undefined' && <></>}
			<ContinueReadingMedia />
			{/* Recently added as a denser grid */}
			<RecentlyAddedMedia />
			{/* Coming soon / releases */}
			{/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
			{/* @ts-ignore */}
			<div className="pb-5 sm:pb-0" />
		</SceneContainer>
	)
}
