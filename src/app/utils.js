export function wrapDispatcher (actions, dispatch) {
  return Object.keys(actions).reduce((p, type) => {
    p[type] = data => dispatch(actions[type](data))
    return p
  }, {})
}

let _id = 0
export function genId () {
  return 'id_' + _id++
}
