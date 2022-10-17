import React,{useContext} from 'react'
import Avatar from "@mui/material/Avatar"
import './FriendSuggestion.css'
import AuthContext from './hooks/useAuth'


const FriendSuggestion = ({profileUsername, suggestion}) => {
  const { logout } = useContext(AuthContext)
  
 
  const uniqueIds = [];
  const unique = suggestion.filter(element => {
    const isDuplicate = uniqueIds.includes(element.username);
    if (!isDuplicate) {
      uniqueIds.push(element.username);

      return true;
    }

    return false;
  });

  const filteredList = unique.filter((name)=>{
    if(name.username === profileUsername){
      return false
    }else{
      return true
    }
  })

  return (
    <>
      <div className='friendSuggestion__profile'>
        <Avatar
        className="post__avatar"
        alt= {profileUsername}
        src="/static/images/avatar/1.jpg"
        />
        <div className='friendSuggestion__profileName'>{profileUsername}</div>
        <div ><button className='friendSuggestion__profileLogout' onClick={()=>{logout()}} >Logout</button> </div>
      </div>
      <p className='friendSuggestion__suggestTitle'> Suggestions for you</p>
      {
        filteredList.map(({username, id}) =>(
          <div key={id} className='friendSuggestion__suggest'>
            <Avatar 
            className="friendSuggestion__avatar"
            alt= {username}
            src="/static/images/avatar/1.jpg"
            sx={{height: 30, width: 30}}
            /> 
            <div className='friendSuggestion__profileName'>{username}</div>
            <div className='friendSuggestion__profileLogout'>Follow</div>
          </div>
          
        ))
      }
      
    </>
  )
}

export default FriendSuggestion