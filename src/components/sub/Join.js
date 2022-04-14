import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

function Join() {
	const initVal = {
		userid: '',
	};
	const [val, setVal] = useState(initVal); 
  const [err, setErr] = useState({});

  //순서4 - 인수로 state val값을 전달
  const check = (val) => {
    //내부적으로 빈 에러 객체를 생성
    const errs = {};
    //입력한 val의 값중 유저아이디값 글자갯수가 5보다 적으면
    if( val.userid.length < 5){
      //빈 에러객체에 userid키값 만들어서 에러메세지 등록
      errs.userid = '아이디를 5글자 이상 입력하세요';
    }
    
    //만약 에러상황이 아니면 조건문이 무시되면서
    //빈 에러객체를 반환하고
    //만약 에러상황이면  조건문이 실행되면서
    //에러메세지가 담긴 에러객체 반환
    return errs;
  }  
  
  const handleChange = (e) =>{
    const {name, value} = e.target; 
    setVal({...val, [name]: value});  
  }


  //순서2 - 해당함수가 호출
  const handleSubmit = (e) => {
    e.preventDefault();
    //순서3 - 현재 val의 값을 check함수의 인수로 전달
    setErr(check(val));
    //순서5 - 반환된 결과값의 에러객체가
    //setErr함수에 의해서 err스테이트에 전달
  }

  
  //순서6 - err스테이트가 의존성에 등록되어 있으므로
  //err 값이 변경될떄마다 콘솔문 출력
  useEffect(()=>{
    console.log(err);
  },[err])

	return (
		<Layout name={'Join'}>
      {/* 순서1- 전송버튼 눌러서 submit이벤트 발생시 handleSubmit호출 */}
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>회원가입 폼 양식</legend>

					<table border='1'>
						<caption>회원가입 정보입력</caption>
						<tbody>
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
                    value= {val.userid}             
                    onChange={handleChange}
									/>
								</td>
							</tr>
							<tr>
								<th colSpan='2'>
									<input type='reset' value='CANCEL' />
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
