import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated: boolean = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>

          <img
            className="hidden xl:block h-screen w-1/2 bg-no-repeat object-cover"
            src="/assets/images/side-img.svg"
            alt="logo"
          />
        </>
      )}
    </>
  )
}

export default AuthLayout