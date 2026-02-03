import { motion } from 'framer-motion'
import { Fragment } from 'react'

import { useBookPreferences } from '@/scenes/book/reader/useBookPreferences'

import { useImageBaseReaderContext } from '../context'
import ReaderFooter from './ReaderFooter'
import ReaderHeader from './ReaderHeader'

export default function ControlsOverlay() {
	const { book } = useImageBaseReaderContext()
	const {
		settings: { showToolBar },
		setSettings,
		bookPreferences: { readingMode },
	} = useBookPreferences({ book })

	const showBottomToolbar = readingMode === 'paged'

	const [zenMode, setZenMode] = useState(false)

	return (
		<Fragment>
			{!zenMode && <ReaderHeader />}

			<motion.div
				className="absolute inset-0 z-10 flex-1"
				style={{
					background:
						'linear-gradient(0deg, hsla(0, 0%, 0%, 0.95), hsla(0, 0%, 0%, 0.80), hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0.5), hsla(0, 0%, 0%, 0.80), hsla(0, 0%, 0%, 0.95))',
				}}
				initial={false}
				animate={showToolBar && !zenMode ? 'visible' : 'hidden'}
				variants={transition}
				transition={{ duration: 0.2, ease: 'easeInOut' }}
				// single tap toggles zen mode, double-click toggles the toolbar (legacy behaviour)
				onClick={(e) => {
					if (e.detail === 1) setZenMode((s) => !s)
				}}
				onDoubleClick={() => setSettings({ showToolBar: !showToolBar })}
			/>

			{!zenMode && showBottomToolbar && <ReaderFooter />}
		</Fragment>
	)
}

const transition = {
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.2,
			ease: 'easeInOut',
		},
		display: 'none',
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
			ease: 'easeInOut',
		},
		display: 'flex',
	},
}
