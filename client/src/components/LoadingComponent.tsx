import React from 'react'

function LoadingComponent() {
  return (
    <div>
<div className="flex flex-row gap-2">
  <div className="w-2 h-2 rounded-full bg-black animate-bounce"></div>
  <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div>
  <div className="w-2 h-2 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
</div>
    </div>
  )
}

export default LoadingComponent