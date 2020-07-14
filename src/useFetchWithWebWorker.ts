import {wrap, releaseProxy} from "comlink"
import {useEffect, useState, useMemo} from "react"

type State = {
  status: 'LOADING' | 'IDLE' | 'ERROR'
  data: object
}

export function useFetchWithWebWorker(url: string) {
  const [state, setState] = useState<State>({
    status: "LOADING",
    data: {}
  });

  const {webWorker} = useWorker('http-worker')

  useEffect(() => {
    const fetch = async () => {
      try {
        setState(prevState => ({status: "LOADING", data: prevState.data}));

        const data = await webWorker.get(url)

        setState({status: "IDLE", data})
      } catch (e) {
        setState(prevState => ({status: "IDLE", data: prevState.data}));
      }
    }

    setInterval(() => {
      fetch()
    }, 10000)

  }, [webWorker, setState, url]);

  return {
    data: state.data,
    status: state.status
  };
}

function useWorker(workerName: string) {
  const webWorkerAndCleanup = useMemo(() => createWebWorkerAndCleanup(workerName), []);

  useEffect(() => {
    const {cleanup} = webWorkerAndCleanup;

    return () => {
      cleanup();
    };
  }, [webWorkerAndCleanup]);

  return webWorkerAndCleanup;
}

/*
* We can't use a parameter for the file path of the web worker because
* TypeScript needs to be able to resolve the import at compile time.
* */
function createWebWorkerAndCleanup(workerName: string) {
  const worker = new Worker('./WebWorker', {
    name: workerName,
    type: "module"
  });
  const webWorker = wrap<import('./WebWorker').WebWorker>(worker);

  const cleanup = () => {
    webWorker[releaseProxy]();
    worker.terminate();
  };

  const webWorkerAndCleanup = {webWorker, cleanup};

  return webWorkerAndCleanup;
}