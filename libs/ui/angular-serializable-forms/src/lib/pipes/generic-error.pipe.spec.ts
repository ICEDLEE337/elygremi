import * as faker from 'faker';
import { GenericErrorPipe } from './generic-error.pipe';

describe(GenericErrorPipe.name, () => {
  let pipe: GenericErrorPipe;
  let errorObject: any;
  let definedKey: string;

  beforeAll(() => {
    pipe = new GenericErrorPipe();
    definedKey = faker.random.word();
    errorObject = { [definedKey]: faker.random.word() };
  });

  describe(GenericErrorPipe.prototype.transform.name, () => {
    describe('a successful transformation', () => {
      describe('given error object has a member matching the provided field name', () => {
        it('returns matching member value', () => {
          const actual = pipe.transform(errorObject, definedKey);
          expect(actual).toEqual(errorObject[definedKey]);
        });
      });
    });

    describe('edge cases', () => {
      describe('given error object does not have a member matching the provided field name', () => {
        it('returns undefined', () => {
          const actual = pipe.transform(errorObject, faker.random.word());
          expect(actual).toBeUndefined();
        });
      });

      describe('given the provided field name is falsey', () => {
        it('returns undefined', () => {
          const actual = pipe.transform(errorObject, null as any);
          expect(actual).toBeUndefined();
        });
      });

      describe('given error object is falsey', () => {
        it('returns undefined', () => {
          const actual = pipe.transform(null, definedKey);
          expect(actual).toBeUndefined();
        });
      });
    });
  });
});
