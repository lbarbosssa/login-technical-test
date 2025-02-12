jest.mock('@react-native-async-storage/async-storage', () => {
    return {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };
  });