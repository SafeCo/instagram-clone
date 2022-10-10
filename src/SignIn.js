import React, {useState} from 'react'
import './SignIn.css'

function SignIn({checkSignedIn, signIn, signInProps, email, password}) {
	const [showPass, setShowPass] = useState(false) 

	const passSwitch = (e)=> {
		e.preventDefault()
		setShowPass(!showPass)
	}


  return (
	<div>
		<div className="signIn__box">
			<div className='signIn__headerImageBox'>
				<img
					className="signIn__headerImage"
					src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
					alt=""
				/>
			</div>
			<div className='signIn__formBox'>
				<form className='signIn__form'>
					<input
						className='signIn__emailInput'
						name="email"
						placeholder="Email address"
						type="text"
						value={email}
						onChange={(e)=> signInProps(e.target, e.target.value)}
					/>
					<div className='signIn__password'>
						<input
						className='signIn__passwordInput'
						name="password"
						placeholder="Password"
						type={showPass? "text" : "password" }
						value={password}
						onChange={(e)=> {signInProps(e.target, e.target.value) }}
						/>
						<button onClick={(e)=> passSwitch(e)} className='signIn__showButton'>Show</button>
					</div>
					
					<button className='signIn__submitButton' type="submit" onClick={signIn}>Log In</button>
				</form>
			</div>
		</div>
		<div className='signIn__box'>
			<div className='signIn__signUp'>
				<p>Don't have an account? </p>
				<p onClick={checkSignedIn}>Sign Up</p>
			</div>
		</div>
	</div>
	
		
  )
}

export default SignIn