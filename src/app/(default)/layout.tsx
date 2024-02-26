import { Metadata } from 'next'
import { NavBar } from '@/components/navbar'

export const metadata: Metadata = {
  title: 'tilt',
}

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      {children}
    </div>
  )
}
