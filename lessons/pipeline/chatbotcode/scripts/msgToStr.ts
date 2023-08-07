import { Cell } from "ton-core";

export function msgToStr(msg: Cell){
  const body = msg.asSlice()
  if (body.remainingBits < 32) {
    return undefined
  }
  const opcode = body.loadUint(32)
  if (opcode !== 0) {
    return 'OP: 0x' + opcode.toString(16)
  }
  if (body.remainingBits < 8 || body.remainingBits % 8 !== 0) {
    return undefined
  }
  //console.log('body.remainingBits', body.remainingBits)
  return body.loadBuffer(body.remainingBits / 8).toString('utf-8')
}