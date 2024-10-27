module.exports = {
    preset: 'ts-jest', 
    testEnvironment: 'jsdom', 
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)"  
    ],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', 
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  };
  