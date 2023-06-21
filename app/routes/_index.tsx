import {MemberPage} from './memberPage'
import React, {useEffect, useState} from 'react';
import {createClient} from '@supabase/supabase-js';

export default function Home() {

  // const supabase = createClient('http://localhost:54323', 'your-public-api-key');
  const supabase = createClient('http://localhost:54323', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0')

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const {data} = await supabase.from("countries").select();
    console.log(data)
    setCountries(data);
  }



  return (
    <main className='flex justify-center items-center w-screen h-screen'>
      <MemberPage
        brand={'Trade Smash'}
      />
    </main>
  )
}
