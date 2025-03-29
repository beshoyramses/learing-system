"use client"

import { SignUp } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParams = useSearchParams()
  const intent = searchParams.get("intent")

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <SignUp
        routing="hash" 
        forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : "/welcome"}
      />
    </div>
  )
}

export default Page