import { RefObject, useEffect } from 'react';

const useClickOutside = <T extends HTMLElement = HTMLElement>(
	ref: RefObject<T>, 
	enabled: boolean,
	callback: (event: Event) => void
) => {
	useEffect(() => {
		const listener = (event: Event) => {
			const el = ref?.current
			if (!el || el.contains((event?.target as Node) || null) && enabled) return
			callback(event)
		}

		if (enabled) {
			document.addEventListener('mousedown', listener);
			document.addEventListener('touchstart', listener);
		}

		return () => {
			if (enabled) {
				document.removeEventListener('mousedown', listener);
				document.removeEventListener('touchstart', listener);
			}
		};
	}, [ref, enabled, callback]);
}

export default useClickOutside;
