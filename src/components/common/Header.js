import React from 'react';

function Header() {
	return (
		<header>
			<div className='inner'>
				<h1>
					<a href='#'>LOGO</a>
				</h1>

				<ul id='gnb'>
					<li>
						<a href='#'>Gallery</a>
					</li>
					<li>
						<a href='#'>Youtube</a>
					</li>
				</ul>
			</div>
		</header>
	);
}

export default Header;