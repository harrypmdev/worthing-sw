import { shouldRefreshToken, removeTokenTimestamp } from './utils';

/**
 * Mock local storage before tests.
 */
beforeEach(() => {
  global.storage = {};

  global.localStorage = {
    setItem: jest.fn((key, value) => {
      global.storage[key] = value;
    }),
    getItem: jest.fn(key => global.storage[key] || null),
    removeItem: jest.fn(key => {
      delete global.storage[key];
    }),
  }
})

/** Tests shouldRefreshToken and removeTokenTimestamp, the
 *  local storage utilites.
 */
describe('test local storage utilities', () => {

  test('expect false as refreshTokenTimestamp is not present', () => {
    expect(shouldRefreshToken()).toEqual(false);
  });

  test('expect true as refreshTokenTimestamp is present', () => {
    global.localStorage.setItem('refreshTokenTimestamp', 'time');
    expect(shouldRefreshToken()).toEqual(true);
  });

  test('expect refreshTokenTimestamp to have been removed', () => {
    global.localStorage.setItem('refreshTokenTimestamp', 'time');
    removeTokenTimestamp();
    expect(global.localStorage.getItem('refreshTokenTimestamp')).toEqual(null);
  });

});