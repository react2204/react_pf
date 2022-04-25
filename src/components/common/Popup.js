import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

//기존의 컴포넌트 함수를 대입형함수로(화살표함수) 변경하고
//해당 화살표 함수를 forwardRef()함수로 wrapping
const Popup = forwardRef((props, ref) => {
	//자신의 open여부를 결정하는 state생성
	const [open, setOpen] = useState(false);

	//해당 컴포넌트에서 만들어지는 함수를 부모컴포넌트에서 사용가능하도록 외부로 반환하는 기능
	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true), //팝업여는 기능
			close: () => setOpen(false), //팝업닫는 기능
		};
	});

	return (
		// 해당 컴포넌트가 사라질때에도 모션처리를 가능하게
		<AnimatePresence>
			{open && (
				<>
					<motion.aside
						className='popup'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }} //해당 컴포넌트가 생성될때 실행될 값
						exit={{ opacity: 0, transition: { delay: 0.5 } }} //해당 컴포넌트가 소멸될때 실행될 값
					>
						{/* 유튜브 영상이 뒤늦게 로딩되어 깜박이는 문제해결을 위해 팝업이 생성되고 0.5초뒤에 유튜브영상 페이드인 처리 */}
						<motion.div
							className='con'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { delay: 0.5 } }}
							exit={{ opacity: 0 }}>
							{props.children}
						</motion.div>
					</motion.aside>
				</>
			)}
		</AnimatePresence>
	);
});

export default Popup;
