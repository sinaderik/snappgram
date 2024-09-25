import { Route, Routes } from 'react-router-dom'
import SigninForm from './_auth/forms/SigninForm'
import SignupFrom from './_auth/forms/SignupFrom'
import { Home } from './_root/pages'
import './global.css'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'

const App = () => {
    return (
        <main className='flex h-screen'>
            <Routes>
                {/* public routes */}
                <Route element={<AuthLayout />}>
                    <Route path='/sign-in' element={<SigninForm />} />
                    <Route path='/sign-up' element={<SignupFrom />} />
                </Route>

                {/* private routes */}
                {/* index means this is a starting route */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />} /> 
                </Route>
            </Routes>
        </main>
    )
}

export default App