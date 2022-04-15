import { useState, useEffect, useRef } from 'react';
import Layout from '../common/Layout';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const editInput = useRef(null);
	const editTextarea = useRef(null);

	const dummyPosts = [
		{ title: 'Hello5', content: 'Here comes description in detail.' },
		{ title: 'Hello4', content: 'Here comes description in detail.' },
		{ title: 'Hello3', content: 'Here comes description in detail.' },
		{ title: 'Hello2', content: 'Here comes description in detail.' },
		{ title: 'Hello1', content: 'Here comes description in detail.' },
	];
	const [posts, setPosts] = useState(dummyPosts);

	//post입력창 초기화함수
	const resetPost = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	//post추가 함수
	const createPost = () => {
		setPosts([
			{ title: input.current.value, content: textarea.current.value },
			...posts,
		]);
		resetPost();
	};

	//post삭제 함수
	const deletePost = (index) => {
		setPosts(posts.filter((_, idx) => idx !== index));
	};

	//post수정 함수
	const updatePost = (index) => {
    setPosts(
      //기존 state값을 반복을 돌면서
      posts.map((post, idx)=>{
        //반복도는 순번과 인수로 전달받은 저장할 순번이 같으면
        if(idx === index){
          //useRef로 참조한 수정 input,textarea의 값을 가지고와서 해당 포스트에 저장
          post.title = editInput.current.value;
          post.content = editTextarea.current.value;
          //해당 포스트의 enableUpdate값을 false로 변경해서 다시 출력모드로 변경
          post.enableUpdate = false;
        }
        //이렇게 변경된 post를 반환해서 전체 posts state 변경
        return post;
      })
    )
  };

	//글수정모드 변경함수
	const enableUpdate = (index) => {
		setPosts(
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	//글출력모드 변경함수
	const disableUpdate = (index) => {
		setPosts(
			posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	//posts의 상태값이 변경될때마다 콘솔문 출력
	useEffect(() => {
		console.log(posts);
	}, [posts]);

	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea
					cols='30'
					rows='10'
					placeholder='본문을 입력하세요.'
					ref={textarea}></textarea>

				<button onClick={resetPost}>cancel</button>
				<button onClick={createPost}>create</button>
			</div>

			<div className='showBox'>
				{posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								// 수정모드
								<>
									<input
										type='text'
										defaultValue={post.title}
										ref={editInput}
									/>
									<br />
									<textarea
										defaultValue={post.content}
										ref={editTextarea}></textarea>

									<div className='btns'>
										<button onClick={() => disableUpdate(idx)}>cancel</button>
                    {/* 수정모드에 저장버튼 클릭시 해당 순서값을 updatePost에 전달해서 호출 */}
										<button onClick={() => updatePost(idx)}>save</button>
									</div>
								</>
							) : (
								// 출력모드
								<>
									<h2>{post.title}</h2>
									<p>{post.content}</p>

									<div className='btns'>
										<button onClick={() => enableUpdate(idx)}>edit</button>
										<button onClick={() => deletePost(idx)}>delete</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
