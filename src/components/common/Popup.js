function Popup(props) {
	return (
		<aside className='popup'>
			<span onClick={()=>props.setOpen(false)}>close</span>
      <div className="con">
        {props.children}
      </div>
		</aside>
	);
}

export default Popup;