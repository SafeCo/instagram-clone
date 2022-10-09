import React from 'react'
import './SignUp.css'

function SignUp({checkSignedIn, signUp, signInProps, username, email, password}) {
  return (
		<div>
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
						placeholder="Username"
						type="text"
						value={username}
						onChange={(e)=> signInProps(e.target, e.target.value)}
						/>
						<input
							placeholder="Email address"
							type="text"
							value={email}
							onChange={(e)=> signInProps(e.target, e.target.value)}
						/>
						<input
							placeholder="Password"
							type="text"
							value={password}
							onChange={(e)=> signInProps(e.target, e.target.value)}
						/>
						<button type="submit" onClick={signUp}>Register</button>
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