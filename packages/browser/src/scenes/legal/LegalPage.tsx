import { SceneContainer } from '@/components/container'
import { Text } from '@stump/components'

export default function LegalPage() {
	return (
		<SceneContainer>
			<Text className="text-2xl font-bold">Legal — Manga Verse (Ruiworks)</Text>
			<div className="prose max-w-none mt-4 text-foreground-muted">
				<h2>Terms & Privacy</h2>
				<p>Este es un placeholder legal para Manga Verse. Reemplazar con el contenido jurídico provisto por Ruiworks.</p>
			</div>
		</SceneContainer>
	)
}
