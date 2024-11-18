import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { changeTheme, changeThemeToDark, changeThemeToLight } from "../store/slices/sharedSlice"
import { ThemeEnum } from "../enums/shared.enum"
import { useEffect } from "react"

function Switcher() {
	
	// const sharedState = useSelector((state: RootState) => state.shared)
	const sharedTheme = useSelector((state: RootState) => state.shared.theme)

	const dispatch = useDispatch<AppDispatch>()
	// dispatch(changeTheme(ThemeEnum.DARK))


	
	// useEffect(() => {
	// 	const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

	// 	const contains = document.body.classList.contains('dark')
	// 	if (prefersDarkScheme.matches && contains && sharedTheme != ThemeEnum.DARK) dispatch(changeTheme(ThemeEnum.DARK))


		// if (theme === 'system') {
		// 	setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
		// }
		
		// const listener = () => {
		// 	setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
		// };
		
		// prefersDarkScheme.addEventListener('change', listener);
		// return () => prefersDarkScheme.removeEventListener('change', listener);
	// });

	useEffect(() => {
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
		if (prefersDarkScheme.matches) {
			dispatch(changeTheme(ThemeEnum.DARK))
		}
	}, [])

	useEffect(() => {
		const isDark = sharedTheme == ThemeEnum.DARK
		if (isDark) document.body.classList.add('dark') 
		else document.body.classList.remove('dark')
	}, [sharedTheme]);

	function handleClick() {
		const isDark = sharedTheme == ThemeEnum.DARK
		if (isDark) dispatch(changeThemeToLight());
		else dispatch(changeThemeToDark())
	}

	return (
		<>
			<button onClick={handleClick} className='bg-light-font-shade-800 dark:bg-dark-font-shade-800 rounded-full aspect-square w-12 text-3xl flex items-center justify-center'>
				{ sharedTheme == ThemeEnum.LIGHT ? '🌚' : '🌝' }
			</button>
		</>
	)
}

export default Switcher
