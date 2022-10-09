import React from 'react'
import './SignIn.css'

function SignIn({checkSignedIn, signIn, signInProps, email, password}) {
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
					<button type="submit" onClick={signIn}>Log In</button>
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