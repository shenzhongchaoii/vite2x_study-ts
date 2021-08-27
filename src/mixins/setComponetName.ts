
import camelCase from 'lodash/camelCase'

export default (locationHash: string) => {
  return {
    name: camelCase(locationHash)
  }
}