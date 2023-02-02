import { useState, useEffect } from 'react';

export const Spinner = ({ className, text, style }) => {
	const [loadingTimeout, setLoadingTimeout] = useState(false);

	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setLoadingTimeout(true);
		}, 20000);
		return () => {
			window.clearTimeout(timeout);
		};
	}, []);

	return (
		<div className={`text-center ${className ? className : ''}`} style={{ ...(style ? style : {}) }}>
			{loadingTimeout ? (
				<div className='loader-timeout'>An error has occurred.</div>
			) : (
				<>
					<div className='loader'></div>
					<br></br>
					<div className='loader-text'>{text || 'Loading ...'}</div>
				</>
			)}
		</div>
	);
};
