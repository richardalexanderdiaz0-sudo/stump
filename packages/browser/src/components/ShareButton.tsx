import { Button } from '@stump/components'

type Props = {
	text?: string
	url?: string
}

export default function ShareButton({ text, url }: Props) {
	const shareText = text || '¡NO DEJO DE LEER [NOMBRE] TE INVITO A LEER!'
	const shareUrl = url || window.location.href

	const handleShare = async () => {
		const payload = `${shareText} ${shareUrl}`
		if (navigator.share) {
			try {
				await navigator.share({ text: payload, url: shareUrl })
				return
			} catch {}
		}
		navigator.clipboard?.writeText(payload)
		alert('Enlace copiado al portapapeles')
	}

	return (
		<Button size="sm" onClick={handleShare} aria-label="Compartir">
			Compartir
		</Button>
	)
}
