import './index.css'
import { ErrorBoundary } from 'react-error-boundary'
import { Helmet } from 'react-helmet'
import { StumpWebClient } from '@stump/browser'
import MangaVerseErrorFallback from './components/MangaVerseErrorFallback'

const getDebugUrl = () => {
	const { hostname } = window.location
	return `http://${hostname}:10801`
}

export const baseUrl = import.meta.env.PROD ? window.location.origin : getDebugUrl()

export default function App() {
	return (
		<>
			<Helmet defaultTitle="Manga Verse — Ruiworks">
				<title>Manga Verse — Ruiworks</title>
				<meta name="description" content="Manga Verse by Ruiworks — lector inmersivo y catálogo de manga privado." />
				<meta name="theme-color" content="#050505" />
			</Helmet>
			<ErrorBoundary FallbackComponent={MangaVerseErrorFallback}>
				<StumpWebClient platform={'browser'} baseUrl={baseUrl} />
			</ErrorBoundary>
		</>
	)
}
