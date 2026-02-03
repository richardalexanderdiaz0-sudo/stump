import { Button, Text } from '@stump/components'

export default function Hero() {
	return (
		<section className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#0b0710] via-[#0b0415] to-[#09060b] p-6 shadow-2xl">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
				<div className="flex-1">
					<Text className="mb-2 text-3xl font-extrabold leading-tight text-white">Manga Verse</Text>
					<Text className="mb-4 max-w-xl text-lg text-foreground-muted">La colección privada de Ruiworks — lector inmersivo, descubrimiento personalizado y controles de seguridad para adultos.</Text>
					<div className="flex gap-3">
						<Button className="btn-mv">Explorar ahora</Button>
						<Button variant="ghost">Novedades</Button>
					</div>
				</div>
				<div className="hidden w-44 shrink-0 sm:block">
					{/* Decorative artwork placeholder — teams should replace with brand art */}
					<div className="h-44 w-44 rounded-xl bg-gradient-to-br from-[#2b0b45] to-[#6e2ef5]" />
				</div>
			</div>
		</section>
	)
}
