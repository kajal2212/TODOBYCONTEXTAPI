import { useAuth0 } from '@auth0/auth0-react';

function Authentication(){

    const{loginWithRedirect,isAuthenticated,logout}=useAuth0();

    return(
        <div>
        {isAuthenticated ? (  <button className='logoutbutton' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>) : ( <button className='loginbutton' onClick={() => loginWithRedirect()}>Log In</button>)}
      </div>
    )


}
export default Authentication;