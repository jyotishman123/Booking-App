'use client'


import { createContext,useState,useEffect} from 'react';

export const SessionProviderContex = createContext({})

const SessionProvider = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {

    const [userSession,setUserSession] = useState({});

    useEffect(()=>{
        const getSession = async () =>{
            try{
               const session = await fetch('/api/usersession');
               const data = await session.json()
               setUserSession(prev => ({ ...prev, data,message:'user details' })); 
            } catch (error){
              setUserSession(prev => ({ ...prev, data:{userlogin:false}, message:'something went wrong'  }));
              console.log(error)
              
            }
        }
        getSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
   
  
  

  return (
       <SessionProviderContex.Provider value={userSession}>
        {children}
       </SessionProviderContex.Provider> 
  )
}

export default SessionProvider