export const suggest = query => {
  let url = new URL(`http://localhost:4000/repo/suggest`)
  url.searchParams.append(`query`, JSON.stringify(query))
  return fetch(url, { method: "GET" }).then(resp => resp.json())
}

export const retrieve = key => {
  let url = new URL(`http://localhost:4000/repo/retrieve`)
  url.searchParams.append(`key`, key)
  return fetch(url, { method: "GET" }).then(resp => resp.json())
}

export const search = params => {
  let url = new URL(`http://localhost:4000/repo/search`)
  Object.entries(params).map(entry =>
    url.searchParams.append(entry[0], JSON.stringify(entry[1]))
  )
  return fetch(url, { method: "GET" }).then(resp => resp.json())
}

export const calculate = request => {
  let url = new URL(`http://localhost:4000/algebra/calculate`)
  Object.entries(request).map(entry =>
    url.searchParams.append(entry[0], JSON.stringify(entry[1]))
  )
  return fetch(url, { method: "GET" }).then(resp => resp.json())
}
