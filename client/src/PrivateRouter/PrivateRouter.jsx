import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import useAuth from '../hooks/useAuth'

function PrivateRouter({children}) {
  const { user, loading } = useAuth();
    const location = useLocation()
    if (loading) {
        
        return (<LoadingSpinner />)
    }
    if (user) {
        
        return children;
    }
  return (
      <Navigate to="/signup" state={{from:location}} replace>
          
    </Navigate>
  )
}

export default PrivateRouter



// {children}: In React, children is a special prop that is used to pass components as data to other components. These child components can be directly accessed in the parent component via the children prop. In your PrivateRouter, children represents the components that you want to render only if the user is authenticated.

// const { user, loading } = useContext(AuthContext): This line uses the useContext hook to access the AuthContext. It extracts the user and loading states from the context.

// if (loading) { return (<LoadingSpinner />) }: If the loading state is true, the LoadingSpinner component is rendered. This typically means that the application is currently checking the authentication state.

// if (user) { return children; }: If the user object exists (i.e., the user is authenticated), the child components are rendered. This means that the wrapped components will only be displayed if the user is logged in.

// return (<Navigate to="/signup" state={{from:location}} replace>): If the loading state is false and there is no user (i.e., the user is not authenticated), the application navigates to the /signup route. The state prop is used to pass the current location to the signup route, which can be used to redirect the user back to the originally requested page after they log in.

// In summary, the PrivateRouter component is used to create protected routes in your application that only authenticated users can access. If a non-authenticated user tries to access these routes, they are redirected to the signup page. Once the user signs up (or logs in), they can access the protected routes. If the authentication status is being checked, a loading spinner is displayed.