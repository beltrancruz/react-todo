import { useState } from 'react'
import { IconPlus } from '@tabler/icons-react';
import './App.css'
import Task from './components/Task';
// import Task2 from './components/Task2';
import { motion, AnimatePresence } from 'framer-motion';
import ContentLayout from './components/ContentLayout';
// import { useSelector } from 'react-redux';
// import { RootState } from './store/store';
import Switcher from './components/Switcher';

const ENTER_KEYNAME = 'Enter'
const STORAGE_KEY = 'todoList'

function App() {

	// const sharedTeme = useSelector((state: RootState) => state.shared.theme )
	// const [isInit, setInit] = useState(false)
	const [value, setValue] = useState<string>('')
	const [listValue, setList] = useState<any[]>(() => {
		const todoList = localStorage.getItem(STORAGE_KEY)
		return todoList != null ? JSON.parse(todoList) : []
	})

	const handleKeydownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key == ENTER_KEYNAME) handleSubmit() }
	const handleSubmit = () => {
		const item = value.trim();
		if (!item) return;
		const newList = [{ id: new Date().getTime(), name: item }, ...listValue];
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
		setList(newList);
		setValue('');
	}
	const handleDeleteItem = (i: number) => {
		const newList = listValue.filter((_, index) => index != i);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
		setList(newList);
	}

	const handleUpdateItem = (i: number, txt: string) => {
		const newList = listValue.map((item, index) => {
			if (index == i) return ({ id: item.id, name: txt })
			return item
		});
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
		setList(newList);
	}
	
	
	// useEffect(() => {
	// 	if (!isInit) {
	// 		console.log({isInit, msg: 'initialized'});
	// 	} else {
	// 		setInit(true)
	// 	}
	// 	console.log({isInit, msg: 'triggered'});
		
	// }, [isInit])

	return (
		<>
			<header className=' bg-light-background dark:bg-dark-background text-light-font dark:text-dark-font select-none md:p-4 p-2 border dark:border-dark-background font-bold'>
				<div className='flex items-center justify-between gap-4'>
					<h1 className='bg-gradient-to-r from-light-primary via-light-secondary to-dark-accent dark:from-dark-primary dark:via-dark-secondary dark:to-dark-accent  bg-clip-text text-transparent font-bold font md:text-5xl text-3xl italic text-pretty'>React TODO</h1>
					<Switcher />
				</div>
			</header>
			<main className='overflow-x-hidden bg-light-background dark:bg-dark-background-shade-950 text-light-font dark:text-dark-font select-none flex flex-col items-center justify-start py-32 gap-8 px-6'>
				<ContentLayout>
					<>
						<p className='dark:text-dark-font-shade-950 font-bold md:text-3xl '>Type a task...</p>
						<div className='flex items-center gap-4'>
							<input
								value={value}
								onChange={e => setValue(e.target.value)}
								onKeyDown={handleKeydownEnter}
								className='p-2 dark:bg-dark-background bg-light-background border dark:border-dark-background md:text-lg rounded-md md:w-96 h-8 md:h-12 outline-none transition duration-200 ease-in-out focus:ring ring-light-primary-shade-50 dark:ring-dark-background ring-offset-light-primary/75 dark:ring-offset-dark-primary/75 ring-offset-4 '
								placeholder='Type something...'
								type="text"
							/>
							<button onClick={handleSubmit} className='bg-light-primary-shade-50 text-light-font-shade-950 rounded-md flex items-center justify-center md:w-12 w-8 aspect-square transition duration-200 ease-in-out focus:ring ring-light-primary-shade-50 ring-offset-light-primary/75 ring-offset-4 '>
								<IconPlus stroke={2} />
							</button>
						</div>
					</>
					<motion.ul className='flex flex-col gap-4'>
						<AnimatePresence mode='popLayout'>
							{
								listValue.map((item, index) => 
									// <Task2 key={item.id} id={item.id} index={index} item={item.name} onDeleteItem={ (e) => { handleDeleteItem(e) } }   />
									<Task 
										key={item.id} 
										index={index} 
										item={item.name} 
										onDeleteItem={ (i) => { handleDeleteItem(i) } }
										onUpdateItem={ (i, txt) => { handleUpdateItem(i, txt) } }
									/>
								)
							}
						</AnimatePresence>
					</motion.ul>
					{/* <motion.ul className='flex flex-col gap-4 '>
						<AnimatePresence mode='popLayout'>
							{
								listValue.map((item, index) => 
									<motion.li key={item.id} layout initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} transition={{ type: 'spring' }}  className='flex items-center justify-between w-full p-4 rounded-md border border-light-primary300 text-lg'>
										{ item.name } 
										<button onClick={ () => handleDeleteItem(index) } className='bg-light-primary text-white rounded-md flex items-center justify-center w-12 aspect-square  transition duration-200 ease-in-out focus:ring ring-light-primary ring-offset-4 '>
											<IconX stroke={2} />
										</button>
									</motion.li>
								)
							}
						</AnimatePresence>
					</motion.ul> */}
				</ContentLayout>
					{/* <motion.ul  className='flex flex-col gap-4 '>
						<AnimatePresence mode='popLayout'>
							{
								listValue.map((item, index) => 
									<Task key={item.id} id={item.id} item={item.name} index={index} onDeleteItem={ (index) => handleDeleteItem(index) }  />
								)
							}
						</AnimatePresence>
					</motion.ul> */}
					{/* <ul className='flex flex-col gap-4 '>
						{
							listValue.map((item, index) => 
								<li className='flex items-center justify-between w-full p-4 rounded-md bg-light-primary300 text-lg' key={item}>
									{ item }
									<button onClick={ () => handleDeleteItem(index) } className='bg-light-primary text-white rounded-md p-2 transition duration-200 ease-in-out  focus:ring ring-light-primary ring-offset-4 ring-offset-light-primary100'>
										<IconX stroke={2} />
									</button>
								</li>
							)
						}
					</ul> */}
			</main>
			<footer className='bg-light-background dark:bg-dark-background text-light-font dark:text-dark-font select-none p-2 border dark:border-dark-background'>
				Developed by <a target='_blank' href='https://github.com/beltrancruz'  className='italic'>beltrancruz</a>
			</footer>
		</>
	)
}

export default App
