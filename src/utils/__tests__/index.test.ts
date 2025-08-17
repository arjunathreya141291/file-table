import { capitalizeFirstLetter } from '../index';

describe('Utility Functions', () => {
  describe('capitalizeFirstLetter', () => {
    test('capitalizes first letter of lowercase string', () => {
      expect(capitalizeFirstLetter('available')).toBe('Available');
      expect(capitalizeFirstLetter('scheduled')).toBe('Scheduled');
    });

    test('handles already capitalized strings', () => {
      expect(capitalizeFirstLetter('Available')).toBe('Available');
      expect(capitalizeFirstLetter('SCHEDULED')).toBe('SCHEDULED');
    });

    test('handles empty string', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    test('handles single character', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
      expect(capitalizeFirstLetter('A')).toBe('A');
    });

    test('handles strings with spaces', () => {
      expect(capitalizeFirstLetter('in progress')).toBe('In progress');
      expect(capitalizeFirstLetter('not available')).toBe('Not available');
    });

    test('handles special characters', () => {
      expect(capitalizeFirstLetter('123test')).toBe('123test');
      expect(capitalizeFirstLetter('!important')).toBe('!important');
    });
  });
});
