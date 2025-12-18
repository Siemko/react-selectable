import React, { forwardRef } from 'react';

const Album = forwardRef(({
	selected,
	title,
	year
}, ref) => {
	const classes = selected ? 'item selected' : 'item';
	return (
		<div className={classes} ref={ref}>
			<h2>{title}</h2>
			<small>{year}</small>
		</div>
	);
});

Album.displayName = 'Album';

export default Album;
