import {MemberPage} from './memberPage'
import {useState} from 'react'
import {useOutletContext} from '@remix-run/react'


export default function Home() {
  const {supabase} = useOutletContext()
  const [session, setSession] = useState(null)

  const fetchUser = async () => {

    const {
      data: {session},
    } = await supabase.auth.getSession()
    if (session)
      setSession(session)

  }

  if (session === null) {
    fetchUser()
    return (
      <main className='flex justify-center items-center w-screen h-screen'>
        <MemberPage
          brand={'Trade Smash'}
        />
      </main>
    )
  } else {
    console.log(session.user)
    return <div>You are {session.user.email}</div>
  }
}
