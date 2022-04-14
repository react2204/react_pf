import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

function Join() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		comments: '',
    edu: '',
		gender: null,
		interest: null,
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
		if (!val.gender) {
			errs.gender = '성별을 선택하세요';
		}
    if(!val.interests) {
      errs.interests = '관심사를 하나이상 선택하세요.';
    }
    if(val.edu===''){
      errs.edu = '최종 학력을 선택하세요';
    }

		return errs;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...val, [name]: value });
	};

	const handleCheck = (e) => { 
    let isCheck = false;  
    const {name} = e.target;    
    const inputs = e.target.parentElement.querySelectorAll('input');    
    inputs.forEach((el)=>{      
      if(el.checked) isCheck=true;
    });
    
    setVal({...val, [name]: isCheck});
  };

	const handleRadio = (e) => {
		const { name } = e.target;
		const isCheck = e.target.checked;
		setVal({ ...val, [name]: isCheck });
	};

  //셀렉트 선택요소의 value값 val 스테이트 저장함수
  const handleSelect = (e) =>{
    //선택한 select요소의 name값 저장
    const {name} = e.target;
    //선택한 요소의 자식인 option들 중에서 선택된 순번의 option요소 value값을 저장
    const isSelected = e.target.options[e.target.selectedIndex].value;
    //위의 name값에 value값을 담아서 val 스테이트에 저장
    setVal({...val, [name]: isSelected});
  }

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
              {/* eduction */}
              <tr>
                <th scope='row'>
                  <label htmlFor="edu">EDUCATION</label>
                </th>
                <td>
                  <select name="edu" id="edu" onChange={handleSelect}>
                    <option value="">학력을 선택하세요</option>
                    <option value="elementary-school">초등학교 졸업</option>
                    <option value="middle-school">중학교 졸업</option>
                    <option value="high-school">고등학교 졸업</option>
                    <option value="collegs">대학교 졸업</option>
                  </select>
                  <span className="err">{err.edu}</span>
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
										onChange={handleRadio}
									/>

									<label htmlFor='female'>Female</label>
									<input
										type='radio'
										id='female'
										name='gender'
										onChange={handleRadio}
									/>
									<span className='err'>{err.gender}</span>
								</td>
							</tr>
							{/* interests */}
							<tr>
								<th scope='row'>INTERESTS</th>
								<td>
									<label htmlFor='sports'>Sports</label>
									<input
										type='checkbox'
										name='interests'
										id='sports'
										onChange={handleCheck}
									/>

                  <label htmlFor='game'>Game</label>
									<input
										type='checkbox'
										name='interests'
										id='game'
										onChange={handleCheck}
									/>

                  <label htmlFor='music'>Music</label>
									<input
										type='checkbox'
										name='interests'
										id='music'
										onChange={handleCheck}
									/>
                  <span className="err">{err.interests}</span>
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
