import { Button, Input, Label, Text } from '@stump/components'
import { useState } from 'react'

export default function CreateManga() {
	const [step, setStep] = useState(0)
	const [data, setData] = useState({ title: '', description: '', chapters: 1, tags: [] as string[] })

	return (
		<div className="mx-auto max-w-3xl space-y-6">
			<Text className="text-2xl font-bold">Studio — Crear manga (Admin)</Text>

			<div className="rounded-xl bg-[#060606] p-6">
				{/* Stepper (simple) */}
				<div className="mb-4 flex items-center gap-3">
					{["Datos", "Capítulos", "Etiquetas", "Review"].map((s, i) => (
						<div key={s} className={`cursor-pointer ${i === step ? 'text-white' : 'text-foreground-muted'}`} onClick={() => setStep(i)}>
							{s}
						</div>
					))}
				</div>

				{step === 0 && (
					<div className="space-y-3">
						<Label>Nombre</Label>
						<Input value={data.title} onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))} />
						<Label>Descripción</Label>
						<Input value={data.description} onChange={(e) => setData((d) => ({ ...d, description: e.target.value }))} />
					</div>
				)}

				{step === 1 && (
					<div className="space-y-3">
						<Label>Número de capítulos</Label>
						<Input type="number" value={data.chapters} onChange={(e) => setData((d) => ({ ...d, chapters: Number(e.target.value) }))} />
					</div>
				)}

				{step === 2 && (
					<div className="space-y-3">
						<Label>Etiquetas (separa por comas)</Label>
						<Input value={data.tags.join(', ')} onChange={(e) => setData((d) => ({ ...d, tags: e.target.value.split(',').map((s) => s.trim()) }))} />
						<div className="text-sm text-foreground-muted">Soportado: Yaoi, BL, +18, Gore, Acción</div>
					</div>
				)}

				{step === 3 && (
					<div className="space-y-3">
						<Text className="font-semibold">Revisión</Text>
						<div className="text-foreground-muted">{data.title || '<sin-título>'}</div>
					</div>
				)}

				<div className="mt-6 flex justify-end gap-2">
					<Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
						Atrás
					</Button>
					<Button onClick={() => (step < 3 ? setStep((s) => s + 1) : alert('Crear (stub)'))} className="btn-mv">
						{step < 3 ? 'Siguiente' : 'Crear manga'}
					</Button>
				</div>
			</div>
		</div>
	)
}
