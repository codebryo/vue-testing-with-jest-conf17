import sum from './sum'

describe('sum', () => {

  /**
   *  Let's test the most forward thing of this function
   */
  it('create sum of 2 numbers', () => {
    expect(sum(15, 8)).toBe(23);
  })

  /**
   * Be sure to reuse the sum() function in the assertion
   * as we have verified that it's working already.
   * This will make your live easier in the long run.
   */
  it('ignores extra arguments', () => {
    expect(sum(2,3,4)).toBe(sum(2,3))
  })

})
