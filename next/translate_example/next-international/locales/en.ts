export default {
  hello: 'Hello1212',
  welcome: 'Hello {name}!',
  'about.you': 'Hello {name}! You have {age} yo',
  'scope.test': 'A scope',
  'scope.more.test': 'A scope',
  'scope.more.param': 'A scope with {param}',
  'scope.more.and.more.test': 'A scope',
  'missing.translation.in.fr': 'This should work',
  'cows#one': 'A cow',
  'cows#other': '{count} cows',
} as const;

// We can also write locales using nested objects
// export default {
//   hello: 'Hello',
//   welcome: 'Hello {name}!',
//   about: {
//     you: 'Hello {name}! You have {age} yo',
//   },
//   scope: {
//     test: 'A scope',
//     more: {
//       test: 'A scope',
//       param: 'A scope with {param}',
//       and: {
//         more: {
//           test: 'A scope',
//         },
//       },
//     },
//   },
//   missing: {
//     translation: {
//       in: {
//         fr: 'This should work',
//       },
//     },
//   },
//   'cows#one': 'A cow',
//   'cows#other': '{count} cows',
// } as const;