import React from 'react';
import withTooltip from './WithTooltip';

const Testing = () => {
	return <span>Some test</span>;
};

export default withTooltip(Testing, 'Show this');
