import { forwardRef, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { IconDeviceFloppy, IconEdit, IconX } from '@tabler/icons-react';
import useClickOutside from '../hooks/useClickOutside';

interface TaskProps {
	// id: number, 
	item: string, 
	index: number, 
	onDeleteItem: (i: number) => void
	onUpdateItem: (i: number, txt: string) => void
}

const ENTER_KEYNAME = 'Enter'


// forwardRef
// Allows use framer-motion correctly

const Task = forwardRef<HTMLLIElement, TaskProps>(({ item, index, onDeleteItem, onUpdateItem }, ref) => {

	const [value, setValue] = useState<string>(item)
	const [isEdit, setEdit] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const containerRef = useRef<HTMLInputElement | null>(null)

	useClickOutside(containerRef, isEdit, () => {
		handleClickEdit()
	})
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

	useEffect(() => {
		if (isEdit) {
			inputRef.current?.focus();
			inputRef.current?.select()
		}
	}, [isEdit])

	const handleKeydownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key == ENTER_KEYNAME) handleUpdate() }
	const handleUpdate = () => {
		if (value != item && value.trim()) {
			onUpdateItem(index, value)
		} else {
			setValue(item)
		}
		setEdit(false)
	}
	const handleLiToEdit = () => {
		setEdit(true)
	}
	const handleClickEdit = () => {
		if (isEdit) handleUpdate()
		else handleLiToEdit()
	}

	const classList = `flex items-center justify-between gap-2 w-full md:p-4 p-2 rounded-md bg-light-secondary-shade-900 dark:bg-dark-secondary-shade-900 md:text-lg text-sm`
	const iconVariants = { 
		initial: { opacity: 0 }, 
		animate: { opacity: 1 }, 
		exit: { opacity: 0 }
	}
	
	return (
		<motion.li 
			ref={ref} 
			layout 
			initial={{ opacity: 0, x: 100 }} 
			animate={{ opacity: 1, x: 0 }} 
			exit={{ opacity: 0, x: 100 }} 
			transition={{ type: 'spring' }}
			
			onDoubleClick={handleLiToEdit} 
		>
		{/* <motion.li layout initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ type: 'spring' }}  className='flex items-center justify-between w-full p-4 rounded-md bg-indigo-300 text-lg'> */}
		{/* <motion.li layout ref={scope} className='flex items-center justify-between w-full p-4 rounded-md bg-indigo-300 text-lg'> */}
			<div ref={containerRef} className={`${classList} border-2 transition-colors duration-300 ease-in-out ${ isEdit ? 'border-light-accent dark:border-dark ' : 'border-transparent'}`} >
				{
					isEdit ? 
					<input 
						ref={inputRef}
						className='outline-none bg-transparent w-full'
						type='text' 
						value={value}
						onKeyDown={handleKeydownEnter} 
						onChange={e => setValue(e.target.value)}
					/> :
					<p className='cursor-pointer w-full' >{item}</p>
				}
				<div className='gap-2 flex items-center justify-end'>
					{/* <button onClick={handleClickEdit} className='bg-light-accent dark:bg-dark-accent text-light-font dark:text-dark-font rounded-md flex items-center justify-center md:w-12 w-8 aspect-square  transition duration-200 ease-in-out focus:ring ring-light-accent dark:ring-dark-accent ring-offset-4 ring-offset-light-secondary-shade-900/75 dark:ring-offset-dark-secondary-shade-100/75 '>
						{
							isEdit ?
							<IconDeviceFloppy stroke={2} /> :
							<IconEdit stroke={2} />
						}
					</button> */}
					<motion.div
                        key={isEdit ? 'save' : 'edit'}
                        variants={iconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
						<button onClick={handleClickEdit} className='bg-light-accent dark:bg-dark-accent text-light-font dark:text-dark-font rounded-md flex items-center justify-center md:w-12 w-8 aspect-square transition duration-200 ease-in-out focus:ring ring-light-accent dark:ring-dark-accent ring-offset-4 ring-offset-light-secondary-shade-900/75 dark:ring-offset-dark-secondary-shade-100/75 '>
                        	{isEdit ? <IconDeviceFloppy stroke={2} /> : <IconEdit stroke={2} />}
						</button>
                    </motion.div>
					<button onClick={ () => onDeleteItem(index) } className='bg-light-accent dark:bg-dark-accent text-light-font dark:text-dark-font rounded-md flex items-center justify-center md:w-12 w-8 aspect-square  transition duration-200 ease-in-out focus:ring ring-light-accent dark:ring-dark-accent ring-offset-4 ring-offset-light-secondary-shade-900/75 dark:ring-offset-dark-secondary-shade-100/75 '>
						<IconX stroke={2} />
					</button>
				</div>
			</div>
		</motion.li>
	)
})

export default Task
