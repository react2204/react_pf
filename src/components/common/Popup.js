function Popup(props) {
	return (
		<aside className='popup'>
			<span>close</span>
      <div className="con">
        {props.children}
      </div>
		</aside>
	);
}

export default Popup;