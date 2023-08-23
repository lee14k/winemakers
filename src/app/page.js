
import { UserProvider } from '@auth0/nextjs-auth0';
import Home from '../../Components/Home';
export default function App() {
  return (
   <>
<UserProvider>
   <Home/>
</UserProvider>
   </>
  )
}
