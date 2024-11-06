
// interface ContentLayoutProps {
// 	firstblock: React.ReactNode,
// 	secondblock: React.ReactNode,
// }

function ContentLayout({ children }: { children: React.ReactElement[] }) {
	return (
		<>
			<div className=' flex flex-col items-center justify-center gap-8 md:h-52 h-36 w-full max-w-xl bg-light-primary dark:bg-dark-primary rounded-md'>
				{children[0]}
			</div>
			<div className='w-full max-w-xl'>
				{children[1]}
			</div>
		</>
	)
}

export default ContentLayout
