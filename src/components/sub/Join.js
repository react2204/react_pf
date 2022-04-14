import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

function Join() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		comments: '',
    gender: null,
	};
	const [val, setVal] = useState(initVal);
	const [err, setErr] = useState({});

	const check = (val) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()(_+)]/;

		if (val.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		if (
			val.pwd1 < 5 ||
			!eng.test(val.pwd1) ||
			!num.test(val.pwd1) ||
			!spc.test(val.pwd1)
		) {
			errs.pwd1 =
				'비밀번호는 5글자 이상, 문자, 숫자, 특수문자를 모두 포함하세요';
		}
		if (val.pwd1 !== val.pwd2 || !val.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요.';
		}
		if (val.email < 5 || !/@/.test(val.email)) {
			errs.email = '이메일은 5글자이상 @입력하세요';
		}
		if (val.comments.length < 10) {
			errs.comments = '남기는 말은 10글자 이상 입력하세요';
		}
    //순서4 인증함수 호출해서 해당 항목이 체크되어 있는지 확인후 없으면 에러객체 생성
    if(!val.gender) {
      errs.gender = '성별을 선택하세요';
    }

		return errs;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...val, [name]: value });
	};

  //순서2- 인수로 선택한 요소가 체크되어 있는지의
  //불린값을 해당 요소의 name값을 키값으로 state추가
	const handleRadio = (e) => {
    const {name} = e.target;
    const isCheck = e.target.checked;
    setVal({...val, [name]: isCheck})
  };

  //순서3 - 전송버튼 클릭시 인증시작
	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(check(val));
	};

	const handleReset = () => {
		setVal(initVal);
		setErr({});
	};

	useEffect(() => {
		console.log(err);
	}, [err]);

	return (
		<Layout name={'Join'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>회원가입 폼 양식</legend>

					<table border='1'>
						<caption>회원가입 정보입력</caption>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input
										type='text'
										id='userid'
										name='userid'
										placeholder='아이디를 입력하세요'
										value={val.userid}
										onChange={handleChange}
									/>
									<span className='err'>{err.userid}</span>
								</td>
							</tr>
							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요'
										value={val.pwd1}
										onChange={handleChange}
									/>
									<span className='err'>{err.pwd1}</span>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재입력하세요'
										value={val.pwd2}
										onChange={handleChange}
									/>
									<span className='err'>{err.pwd2}</span>
								</td>
							</tr>
							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input
										type='text'
										name='email'
										id='email'
										placeholder='이메일 주소를 입력하세요.'
										value={val.email}
										onChange={handleChange}
									/>
									<span className='err'>{err.email}</span>
								</td>
							</tr>
							{/* gender */}
							<tr>
								<th scope='row'>GENDER</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input
										type='radio'
										id='male'
										name='gender'
                    //순서1 - 체크시 handleRadio호출
										onChange={handleRadio}
									/>

                  <label htmlFor='female'>Female</label>
									<input
										type='radio'
										id='female'
										name='gender'
										onChange={handleRadio}
									/>
                  <span className="err">{err.gender}</span>
								</td>
							</tr>
							{/* comments */}
							<tr>
								<th scope='row'>
									<label htmlFor='comments'>LEAVE COMMENTS</label>
								</th>
								<td>
									<textarea
										name='comments'
										id='comments'
										cols='30'
										rows='10'
										value={val.comments}
										onChange={handleChange}></textarea>
									<span className='err'>{err.comments}</span>
								</td>
							</tr>
							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='CANCEL' onClick={handleReset} />
									<input type='submit' value='SEND' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Join;
