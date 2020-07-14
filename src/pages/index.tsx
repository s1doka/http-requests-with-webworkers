import React from "react"
import dynamic from "next/dynamic";

const ComponentWithWebWorker = dynamic(() => import('../ComponentWithWebWorker'), {ssr: false})

const Home: React.FunctionComponent = () => {
  return (
    <>
      <h1>HTTP request with WebWorker</h1>
      <ComponentWithWebWorker />
    </>
  )
}

export default Home