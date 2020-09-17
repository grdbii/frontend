export const list = page => {
  let url = new URL(`http://localhost:4001/list`)
  url.searchParams.append(`p`, page)
  return fetch(url, { method: "GET" }).then(resp => resp.json())
}

export const retrieve = id => {
  let url = new URL(`http://localhost:4001/metric`)
  url.searchParams.append(`id`, id)
  return fetch(url, { method: "GET" }).then(resp => resp.json())
}

export const search = query => {
  let url = new URL(`http://localhost:4001/search`)
  url.searchParams.append(`q`, query)
  return fetch(url, { method: "GET" }).then(resp =>
    resp.status === 204 ? [] : resp.json()
  )
}

export const variants = name => {
  let url = new URL(`http://localhost:4001/variants`)
  url.searchParams.append(`name`, name)
  return fetch(url, { method: "GET" }).then(resp => resp.json())
}

export const calculate = params => {
  let url = new URL(`http://localhost:4001/calc`)
  Object.entries(params).map(entry =>
    url.searchParams.append(entry[0], entry[1])
  )
  return fetch(url, { method: "GET" }).then(resp => resp.json())
}
