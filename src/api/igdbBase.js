const BASE_URL = 'https://igdbcom-internet-game-database-v1.p.mashape.com'

export default class IgdbQueryBuilder {
  query = ''
  options = []

  init () {
    this.query = BASE_URL
    return this
  }

  setEndpoint (endpoint) {
    this.query += `/${endpoint}/`
    return this
  }

  setId (id) {
    this.query += `${id}`
    return this
  }

  setSearch (search) {
    this.options.push(`search=${search}`)
    return this
  }

  setFields (fields) {
    this.options.push(`fields=${fields.join(',')}`)
    return this
  }

  setOrder (order) {
    this.options.push(`order=${order.field}:${order.type}`)
    return this
  }

  setLimit (limit) {
    this.options.push(`limit=${limit}`)
    return this
  }

  setOffset (offset) {
    this.options.push(`offset=${offset}`)
    return this
  }

  setFilters (filters) {
    for (let filter of filters) {
      this.options.push(`filter[${filter.field}][${filter.type}]=${filter.value}`)
    }
    return this
  }

  finalize () {
    if (this.options) {
      this.query += `?${this.options.join('&')}`
    }
    console.log(this.query)
    return this.query
  }
}
