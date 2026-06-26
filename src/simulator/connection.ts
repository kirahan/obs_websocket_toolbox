import { OBSConnectionConfig } from '../state'
import { simulatorRunning } from '../simulator'

export const SIMULATOR_HOST = '__simulator__'

export function isSimulatorConnection() {
  return simulatorRunning.value || OBSConnectionConfig.host.value === SIMULATOR_HOST
}

export function applySimulatorConnectionProfile() {
  OBSConnectionConfig.host.value = SIMULATOR_HOST
  OBSConnectionConfig.port.value = '4455'
  OBSConnectionConfig.password.value = ''
}
