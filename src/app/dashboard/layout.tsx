import Sidebar from '@/components/dashboard/sidebar'
import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex gap-10 h-full'>
      <Sidebar />
      {children}
    </div>
  )
}

export default layout
