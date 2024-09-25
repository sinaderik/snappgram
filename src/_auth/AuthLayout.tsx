import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated: boolean = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section>
            <Outlet />
          </section>
        </>
      )}
    </>
  )
}

export default AuthLayout