import { Button, Text } from '@stump/components'

export default function MangaVerseErrorFallback({ error, resetErrorBoundary }: any) {
	return (
		<div className="m-6 flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center text-white">
			<div className="rounded-xl bg-[#0a0a0a] p-8 shadow-lg">
				<Text className="mb-2 text-lg font-semibold">Manga Verse — Ocurrió un error</Text>
				<Text className="mb-4 text-foreground-muted">Lo sentimos — recarga la página o intenta de nuevo. (Ruiworks)</Text>
				<div className="flex justify-center gap-2">
					<Button onClick={resetErrorBoundary}>Reintentar</Button>
					<Button variant="ghost" onClick={() => navigator.clipboard?.writeText(String(error || ''))}>
						Copiar error
					</Button>
				</div>
			</div>
		</div>
	)
}
