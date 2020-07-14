import {expose} from 'comlink'
import {get} from './HttpService'

const exports = {
  get
}

export type WebWorker = typeof exports

expose(exports)
