import {useLoaderData, useOutletContext} from '@remix-run/react'
import {useState, useEffect} from 'react'
import {cssBundleHref} from "@remix-run/css-bundle";
import {useRevalidator} from "@remix-run/react";
import type {LinksFunction} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";


// SUPBASE STUFF
import {json} from '@remix-run/node' // change this import to whatever runtime you are using
import {createServerClient, createBrowserClient} from '@supabase/auth-helpers-remix'
import type {LoaderArgs} from '@remix-run/node' // change this import to whatever runtime you are using

export const loader = async ({request}: LoaderArgs) => {
  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  }

  const response = new Response()

  const supabase = createServerClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    request,
    response,
  })

  const {
    data: {session},
  } = await supabase.auth.getSession()

  return json(
    {
      env,
      session,
    },
    {
      headers: response.headers,
    }
  )
}

// CSS SHEETS
import stylesheet from "~/styles.css";

export const links: LinksFunction = () => [
  {rel: "stylesheet", href: stylesheet},
];

export default function App() {
  const {env, session} = useLoaderData<typeof loader>()
  const {revalidate} = useRevalidator()

  const [supabase] = useState(() =>
    createBrowserClient<Database>(env.SUPABASE_URL, env.SUPABASE_ANON_KEY)
  )

  const serverAccessToken = session?.access_token

  useEffect(() => {
    const {
      data: {subscription},
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== 'INITIAL_SESSION' && session?.access_token !== serverAccessToken) {
        // server and client are out of sync.
        revalidate()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [serverAccessToken, supabase, revalidate])


  const handleLogout = async () => {
    await supabase.auth.signOut()
  }
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {session?.user ? <button onClick={handleLogout}>Logout</button> : null}
        <Outlet context={{supabase}} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
