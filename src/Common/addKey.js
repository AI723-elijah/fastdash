const addKey = payload => {
  return payload.map(e => ( { ...e, key: e.id } ))
}

export { addKey };
