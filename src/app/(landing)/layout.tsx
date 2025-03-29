import Navbar from '@/components/landing/navbar'
import { SearchProvider } from '@/context/search-context'
import React, { ReactNode } from 'react'

const layout = ({children}: {children: ReactNode}) => {
  return (
    <div>
   <SearchProvider>
      <div>
        <Navbar />
        {children}
      </div>
    </SearchProvider>
    </div>
  )
}

export default layout
