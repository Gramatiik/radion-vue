const LOCALSTORAGE_COUNT_ITEM = 'LOCALSTORAGE_COUNT_ITEM'
const LOCALSTORAGE_AVAILABILITY_ITEM = 'LOCALSTORAGE_AVAILABILITY_ITEM'

export default class DiscoverLivesManager {

  constructor (maxLives = 10) {
    // init from localStorage or default values
    this.maxLives = maxLives
    let livesCount = parseInt(localStorage.getItem(LOCALSTORAGE_COUNT_ITEM))
    if (isNaN(livesCount)) {
      livesCount = maxLives
    }
    this.livesCount = livesCount

    let livesAvailability = parseInt(localStorage.getItem(LOCALSTORAGE_AVAILABILITY_ITEM))
    if (isNaN(livesAvailability)) {
      livesAvailability = new Date()
    }
    this.livesAvailability = new Date(livesAvailability)
  }

  /**
   * Decrement life counter if possible
   * and set availability if there are no remaining lives
   */
  decrementLivesCount () {
    if (this.livesCount > 1) {
      this.livesCount = this.livesCount - 1
    } else {
      this.setAvailableTomorrow()
      this.livesCount = this.maxLives
    }
  }

  /**
   * Increment life counter if possible
   */
  incrementLivesCount () {
    if (this.livesCount < this.maxLives) this.livesCount = this.livesCount + 1
  }

  /**
   * Make the next availability date being tomorrow
   */
  setAvailableTomorrow () {
    let newTimeStamp = Date.now() + 24 * 3600 * 1000
    this.livesAvailability = new Date(newTimeStamp)
  }

  /**
   * Set a new vlue for life counter
   * @param newValue {number}
   */
  set livesCount (newValue) {
    if (typeof newValue !== 'number') {
      throw new Error('New value for livesCount must be a number')
    }
    localStorage.setItem(LOCALSTORAGE_COUNT_ITEM, newValue)
    this._livesCount = newValue
  }

  /**
   * Get the current value of life counter
   * @returns {number}
   */
  get livesCount () {
    return this._livesCount
  }

  /**
   * Set a new availibility Date for lives
   * @param newDate {Date}
   */
  set livesAvailability (newDate) {
    if (!(newDate instanceof Date)) {
      throw new Error('New value for livesAvailability count must be a valid Date object')
    }
    localStorage.setItem(LOCALSTORAGE_AVAILABILITY_ITEM, newDate.getTime())
    this._livesAvailability = newDate.getTime()
  }

  /**
   * Return the current availibility date
   * @returns {Date}
   */
  get livesAvailability () {
    return new Date(this._livesAvailability)
  }

  /**
   * Checks if the discover feature is available
   * @returns {boolean}
   */
  get isDiscoverAvailable () {
    return Date.now() >= this.livesAvailability.getTime()
  }
}
