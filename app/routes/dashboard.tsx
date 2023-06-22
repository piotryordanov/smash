import {MemberPage} from './memberPage'
import {useState} from 'react'
import {useOutletContext} from '@remix-run/react'


export default function Home() {
  const {supabase} = useOutletContext()
  const [session, setSession] = useState(null)
  const [notes, setNotes] = useState(null)
  const [newNoteContent, setNewNoteContent] = useState(null);

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

    const {user} = session
    const userId = user.id;



    const fetchUserNotes = async (userId) => {
      console.log(userId)
      const {data, error} = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId);
      setNotes(data)
    }

    if (notes == null)
      fetchUserNotes(userId)

    const deleteNote = async (noteId) => {
      const {data, error} = await supabase.from('notes').delete().eq('id', noteId)
      fetchUserNotes(userId)
    }
    const createNote = async () => {
      const newNote = {
        content: newNoteContent,
        user_id: userId
      }
      const {data, error} = await supabase.from('notes').insert([newNote])
      fetchUserNotes(userId)
    };

    const handleInputChange = (event) => {
      setNewNoteContent(event.target.value);
    };


    console.log(userId)
    return <div className="flex flex-col">
      <div className="my-4 ">
        Hello {session.user.email}
      </div>
      <div className="mt-4 text-xl font-bold">
        Here are your notes
      </div>
      <div className="">
        {notes && notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="flex flex-row">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button className="ml-4" onClick={() => deleteNote(note.id)}>Delete</button>
            </div>
          ))
        ) : (
          <div>No notes available</div>
        )}
      </div>

      <div className="mt-4 text-xl font-bold">
        Insert new notes
      </div>
      <div className="flex flex-col w-[300px]">

        <input onChange={handleInputChange} className="my-4 border-2 border-black rounded" type=" text" placeholder="Title" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded" onClick={createNote}>Create note</button>
      </div>
    </div>
  }
}
