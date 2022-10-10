import React, {useState} from 'react'
import './SignUp.css'

function SignUp({checkSignedIn, signUp, signInProps, username, email, password}) {
	const [showPass, setShowPass] = useState(false) 

	const passSwitch = (e)=> {
		e.preventDefault()
		setShowPass(!showPass)
	}


  return (
		<div className='login__container'>
			<div className="login__box">
				<div className='login__headerImageBox'>
					<img
						className="login__headerImage"
						src="https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png"
						alt=""
					/>
				</div>
				<div className='login__formBox'>
					<form className='login__form'>
						<input
							className='login__emailUserInput'
							name="username"
							placeholder="Username"
							type="text"
							value={username}
							onChange={(e)=> signInProps(e.target, e.target.value)}
						/>
						<input
							className='login__emailUserInput'
							name="email"
							placeholder="Email address"
							type="text"
							value={email}
							onChange={(e)=> signInProps(e.target, e.target.value)}
						/>
						<div className='login__password'>
							<input
							className='login__passwordInput'
							name="password"
							placeholder="Password"
							type={showPass? "text" : "password" }
							value={password}
							onChange={(e)=> {signInProps(e.target, e.target.value) }}
							/>
							<button onClick={(e)=> passSwitch(e)} className='login__showButton'>Show</button>
						</div>
						<button className='login__submitButton' type="submit" onClick={signUp}>Register</button>
					</form>
				</div>
			</div>
			<div className='login__box'>
				<div className='login__signIn'>
					<p>Have an account? </p>
					<p onClick={checkSignedIn}>Sign In</p>
				</div>
			</div>
		</div>
  )
}

export default SignUp