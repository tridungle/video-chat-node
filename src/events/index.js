import {
  CALL_ACCEPTED,
  CALL_CANCELED,
  CALL_IGNORED,
  CALL_REQUEST,
  CALL_HANG_UP,
  DISCONNECT,
  ICE_CANDIDATE,
  ICE_DESCRIPTION
} from '../helpers/constants'
import { handleCallAccepted, handleCallCanceled, handleCallIgnored, handleCallRequest, handleCallHangup } from './call'
import { handleDisconnect } from './disconnect'
import { handleIceCandidate, handleIceDescription } from './ice'

const handlers = {
  [CALL_ACCEPTED]: handleCallAccepted,
  [CALL_CANCELED]: handleCallCanceled,
  [CALL_IGNORED]: handleCallIgnored,
  [CALL_REQUEST]: handleCallRequest,
  [CALL_HANG_UP]: handleCallHangup,
  [DISCONNECT]: handleDisconnect,
  [ICE_CANDIDATE]: handleIceCandidate,
  [ICE_DESCRIPTION]: handleIceDescription
}

export default (io, socket) =>
  Object.keys(handlers).forEach((event) => socket.on(event, handlers[event].bind(null, io, socket)))
