import IgdbQueryBuilder from '@/api/IgdbQueryBuilder'
let queryBuilder

const BASE_URL = 'https://igdbcom-internet-game-database-v1.p.mashape.com'

describe('IgdbQueryBuilder.js', () => {
  /**
   * Generate a fresh vm before each tests
   */
  beforeEach(() => {
    queryBuilder = new IgdbQueryBuilder()
  })

  it('should return a string after calling finalize()', () => {
    expect(queryBuilder.finalize()).to.be.a('string')
  })

  it('should return BASE_URL if finalize is called just after constructor', () => {
    expect(queryBuilder.finalize()).to.equal(BASE_URL)
  })

  it('should set an endpoint properly', () => {
    expect(queryBuilder.setEndpoint('games').finalize()).to.equal(`${BASE_URL}/games/`)
  })

  it('should set an id properly', () => {
    expect(queryBuilder.setEndpoint('games').setId(12).finalize()).to.equal(`${BASE_URL}/games/12`)
    queryBuilder = new IgdbQueryBuilder()
    expect(queryBuilder.setEndpoint('platforms').setId(55).finalize()).to.equal(`${BASE_URL}/platforms/55`)
  })

  it('should set a search query properly', () => {
    expect(queryBuilder.setEndpoint('games').setSearch('Zelda').finalize()).to.equal(`${BASE_URL}/games/?search=Zelda`)
    queryBuilder = new IgdbQueryBuilder()
    expect(queryBuilder.setEndpoint('platforms').setSearch('Mario').finalize()).to.equal(`${BASE_URL}/platforms/?search=Mario`)
  })

  it('should set the requested fields properly', () => {
    expect(queryBuilder.setEndpoint('games').setFields(['name', 'screenshots']).finalize()).to.equal(`${BASE_URL}/games/?fields=name,screenshots`)
    queryBuilder = new IgdbQueryBuilder()
    expect(queryBuilder.setEndpoint('platforms').setFields(['id', 'name', 'first_release_date']).finalize()).to.equal(`${BASE_URL}/platforms/?fields=id,name,first_release_date`)
  })

  it('should set the order properly', () => {
    expect(queryBuilder.setEndpoint('games').setOrder({ field: 'name', type: 'desc' }).finalize()).to.equal(`${BASE_URL}/games/?order=name:desc`)
    queryBuilder = new IgdbQueryBuilder()
    expect(queryBuilder.setEndpoint('platforms').setOrder({ field: 'id', type: 'asc' }).finalize()).to.equal(`${BASE_URL}/platforms/?order=id:asc`)
  })

  it('should set the offset properly', () => {
    expect(queryBuilder.setEndpoint('games').setOffset(200).finalize()).to.equal(`${BASE_URL}/games/?offset=200`)
    queryBuilder = new IgdbQueryBuilder()
    expect(queryBuilder.setEndpoint('platforms').setOffset(10).finalize()).to.equal(`${BASE_URL}/platforms/?offset=10`)
  })

  it('should set the limit properly', () => {
    expect(queryBuilder.setEndpoint('games').setLimit(25).finalize()).to.equal(`${BASE_URL}/games/?limit=25`)
    queryBuilder = new IgdbQueryBuilder()
    expect(queryBuilder.setEndpoint('platforms').setLimit(50).finalize()).to.equal(`${BASE_URL}/platforms/?limit=50`)
  })

  it('should set the filters properly', () => {
    expect(queryBuilder.setEndpoint('games').setFilters([{ field: 'id', type: 'gte', value: 800 }]).finalize()).to.equal(`${BASE_URL}/games/?filter[id][gte]=800`)

    queryBuilder = new IgdbQueryBuilder()
    expect(queryBuilder.setEndpoint('platforms').setFilters([
      {
        field: 'id',
        type: 'lte',
        value: 5000
      },
      {
        field: 'name',
        type: 'eq',
        value: 'Zelda'
      }
    ]).finalize()).to.equal(`${BASE_URL}/platforms/?filter[id][lte]=5000&filter[name][eq]=Zelda`)
  })
})
