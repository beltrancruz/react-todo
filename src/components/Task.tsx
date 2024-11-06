import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { IconX } from '@tabler/icons-react';

interface TaskProps {
	// id: number, 
	item: string, 
	index: number, 
	onDeleteItem: (i: number) => void
}

// forwardRef
// Allows use framer-motion correctly

const Task = forwardRef<HTMLLIElement, TaskProps>(({  item, index, onDeleteItem }, ref) => {
	// const [isPresent, safeToRemove] = usePresence()
	// const [scope, animate] = useAnimate()

	// useEffect(() => {
	// 	if (isPresent) {
	// 		const enterAnimation = async () => {
	// 			await animate(
	// 				scope.current, 
	// 				{ opacity: [0,1], x: [100, 0] },
	// 				// { duration: 0.5, delay: stagger(0.2) }
	// 				{ duration: 0.5, delay: 0.2 * index }
	// 			)
	// 		}
	// 		enterAnimation()
	// 	} else {
	// 		const exitAnimation = async () => {
	// 			await animate(
	// 				scope.current, 
	// 				{ opacity: [1,0], x: [0, 100] },
	// 				{ duration: 0.5 }
	// 			)
				
	// 			safeToRemove()
	// 		}
	// 		exitAnimation()
	// 	}
	// }, [isPresent])
	
	return (
		<motion.li ref={ref} layout initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ type: 'spring' }}  className='flex items-center justify-between w-full md:p-4 p-2 rounded-md bg-light-secondary-shade-900 dark:bg-dark-secondary-shade-900 md:text-lg text-sm'>
		{/* <motion.li layout initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ type: 'spring' }}  className='flex items-center justify-between w-full p-4 rounded-md bg-indigo-300 text-lg'> */}
		{/* <motion.li layout ref={scope} className='flex items-center justify-between w-full p-4 rounded-md bg-indigo-300 text-lg'> */}
			{ item } 
			<button onClick={ () => onDeleteItem(index) } className='bg-light-accent dark:bg-dark-accent text-light-font dark:text-dark-font rounded-md flex items-center justify-center md:w-12 w-8 aspect-square  transition duration-200 ease-in-out focus:ring ring-light-accent dark:ring-dark-accent ring-offset-4 ring-offset-light-secondary-shade-900/75 dark:ring-offset-dark-secondary-shade-100/75 '>
				<IconX stroke={2} />
			</button>
		</motion.li>
	)
})

export default Task
