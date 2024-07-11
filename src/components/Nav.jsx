import { options } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

const Nav = async() => {
    const session = await getServerSession(options)
    return (
    <header>
        <nav className='flex items-center justify-between w-100vw px-10 py-4'>
            <div>shopping site</div>
            <div className='flex items-center justify-between gap-6'>
                <Link href='/explore'>explore</Link>
                <Link href='/mens'>mens</Link>
                <Link href='/womens'>womens</Link>
                {session?(<Link href='/api/auth/signout/callbackUrl=/'>logout</Link>):
                <Link href='/api/auth/signin'>login</Link>}
                
            </div>
        </nav>
    </header>
  )
}

export default Nav