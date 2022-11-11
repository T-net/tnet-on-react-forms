import '@testing-library/jest-dom';

afterEach(() => {
  jest.clearAllMocks();
  // @ts-ignore
  // eslint-disable-next-line no-console
  console.error.mockRestore();
});

beforeEach(() => {
  jest.spyOn(console, 'error');
});
