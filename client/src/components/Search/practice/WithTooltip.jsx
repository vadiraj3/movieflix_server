import React, { useState } from 'react';

function withTooltip(Component, text) {
	return function WithTooltip() {
		const [showTooltip, setShowTooltip] = useState(false);
		const handleClick = () => {
			setShowTooltip((prev) => !prev);
		};
		return (
			<span onMouseOver={handleClick} onMouseOut={handleClick}>
				<Component />
				{showTooltip && <strong>{text}</strong>}
			</span>
		);
	};
}

export default withTooltip;
