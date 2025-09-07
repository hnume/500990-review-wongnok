'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error('This is Error : ', error)
  })

  return (
    <div>
      <h1>Error</h1>
      <Button onClick={() => reset()}>try again</Button>
    </div>
  )
}

export default Error
