import { forwardRef, useEffect } from 'react'
import { useAnimate, usePresence } from 'framer-motion'
import { IconX } from '@tabler/icons-react'

// Define the props for the Task component
interface TaskProps {
	id: number;
	item: string;
	index: number;
	onDeleteItem: (index: number) => void;
}

// Forward the ref to the DOM element (`HTMLLIElement`)
const Task2 = forwardRef<HTMLLIElement, TaskProps>(({ item, index, onDeleteItem }, _) => {
	const [scope, animate] = useAnimate();  // Hook to control animation
	const [isPresent, safeToRemove] = usePresence();  // Hook to handle component presence

	useEffect(() => {
		if (isPresent) {
			const enterAnimation = async () => {

				// Animation when the component enters (mounted)
				// await animate(scope.current, { opacity: 1, x: 0 }, {  type: 'spring' }  );
				// await animate(scope.current, { opacity: 0, x: 100 });
				await animate(scope.current, { opacity: 0, x: 100 }, { duration: 0 });
				await animate(scope.current, { opacity: 1, x: 0 }, { duration: 0.5, delay: index * 0.1 });
			}
			enterAnimation()
		} else {
			const exitAnimation = async () => {
				await animate(scope.current, { opacity: 0, x: 100 }, { duration: 0.5 });
				safeToRemove()
			}
			exitAnimation()
		}
	}, [isPresent]);

	return (
		<li
			ref={scope}  // Attach the ref here
			className='flex items-center justify-between w-full p-4 rounded-md border border-indigo-300 text-lg'
		>
			{item}
			<button
				onClick={() => onDeleteItem(index)}
				className='bg-light-primary text-white rounded-md flex items-center justify-center w-12 aspect-square transition duration-200 ease-in-out focus:ring ring-light-primary ring-offset-4'
			>
				<IconX stroke={2} />
			</button>
		</li>
	);
});

export default Task2;
