import { Button, Text } from '@stump/components'
import { useState } from 'react'

type Props = {
	minAge?: number
	onConfirm?: () => void
}

export default function AgeGate({ minAge = 18, onConfirm }: Props) {
	const [accepted, setAccepted] = useState(false)

	if (accepted) return null

	return (
		<div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4">
			<div className="max-w-md rounded-xl bg-[#0b0b0b] p-6 text-center shadow-lg">
				<Text className="mb-2 text-xl font-semibold">Advertencia: contenido +{minAge}</Text>
				<Text className="mb-4 text-foreground-muted">Este contenido es para mayores de {minAge} años. Confirme para continuar.</Text>
				<div className="flex justify-center gap-3">
					<Button onClick={() => { setAccepted(true); onConfirm?.() }} className="btn-mv">Confirmo</Button>
					<Button variant="ghost" onClick={() => window.history.back()}>Volver</Button>
				</div>
			</div>
		</div>
	)
}
