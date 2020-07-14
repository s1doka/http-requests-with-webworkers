import React from "react";
import {useFetchWithWebWorker} from "./useFetchWithWebWorker";

const ComponentWithWebWorker: React.FunctionComponent = () => {
  const {data, status} = useFetchWithWebWorker('https://archive.org/metadata/principleofrelat00eins')

  return (
    <>
      <p>{status}</p>
      <pre style={{width: 300}}>
      <code>
        {JSON.stringify(data, null, 2)}
      </code>
    </pre>
    </>
  )
}

export default ComponentWithWebWorker
