import Layout from '../common/Layout';
import { useState } from 'react';

function Join() {
	const initVal = {
		userid: '',
	};
	const [val, setVal] = useState(initVal);

  //인풋요소에 값을 입력할때마다 실행할 함수
  //해당 입력된 인풋 요소의 name, value값으로 
  //기존 state값을 변경
  const handleChange = (e) =>{
    const {name, value} = e.target;
    console.log(`name: ${name}, value: ${value}`);
    setVal({...val, [name]: value});
    console.log(val);
  }

	return (
		<Layout name={'Join'}>
			<form>
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
