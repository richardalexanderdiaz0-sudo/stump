import { Text } from '@stump/components'
import { motion, useAnimation } from 'framer-motion'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useEffect, useMemo, useState } from 'react'

dayjs.extend(relativeTime)

type Props = {
	release_date?: string | null
	title?: string
}

export default function ComingSoon({ release_date, title = 'Próximo lanzamiento' }: Props) {
	const [now, setNow] = useState(() => dayjs())
	useEffect(() => {
		const id = setInterval(() => setNow(dayjs()), 1000)
		return () => clearInterval(id)
	}, [])

	const until = useMemo(() => {
		if (!release_date) return null
		return dayjs(release_date)
	}, [release_date])

	if (!until) {
		return (
			<div className="rounded-xl bg-[#070707] p-4">
				<Text className="text-lg font-semibold">{title}</Text>
				<Text className="text-foreground-muted">Sin lanzamientos próximos</Text>
			</div>
		)
	}

	const diff = until.diff(now)
	const human = dayjs().to(until, true)

	return (
		<motion.div className="rounded-xl bg-gradient-to-br from-[#080808] to-[#0b0b0b] p-4 shadow">
			<div className="flex items-center justify-between">
				<div>
					<Text className="text-lg font-semibold">{title}</Text>
					<Text className="text-foreground-muted">Lanzamiento en {human}</Text>
				</div>
				<div className="text-right">
					<Text className="text-2xl font-bold manga-verse-accent">{diff > 0 ? dayjs.duration(diff).format('D [d] HH:mm:ss') : 'Ya disponible'}</Text>
				</div>
			</div>
		</motion.div>
	)
}
