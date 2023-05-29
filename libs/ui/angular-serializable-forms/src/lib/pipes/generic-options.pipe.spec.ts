import { IFieldConfig } from '../interfaces/field-config.interface';
import { GenericOptionsPipe } from './generic-options.pipe';

function randomWord () {
  return (Math.random() * 1000).toString();
}

describe(GenericOptionsPipe.name, () => {
  let pipe: GenericOptionsPipe;
  let fieldConfig: IFieldConfig;
  let definedKey: string;

  beforeAll(() => {
    pipe = new GenericOptionsPipe();
    definedKey = randomWord();
    fieldConfig = {
      fieldOptions: {
        [definedKey]: {
          options: [
            { display: randomWord(), value: randomWord() },
            { display: randomWord(), value: randomWord() },
          ],
        },
      },
    } as any;
  });

  describe(GenericOptionsPipe.prototype.transform.name, () => {
    describe('a successful transformation', () => {
      describe('given field config has a member matching the provided field name', () => {
        it("returns matching member's options", () => {
          const actual = pipe.transform(fieldConfig, definedKey);
          expect(actual).toEqual(fieldConfig.fieldOptions[definedKey].options);
        });
      });
    });

    describe('edge cases', () => {
      describe('given field config does not have a member matching the provided field name', () => {
        it('returns undefined', () => {
          const actual = pipe.transform(fieldConfig, randomWord());
          expect(actual).toBeUndefined();
        });
      });

      describe('given the provided field name is falsey', () => {
        it('returns undefined', () => {
          const actual = pipe.transform(fieldConfig, null as any);
          expect(actual).toBeUndefined();
        });
      });

      describe('given field config is falsey', () => {
        it('returns undefined', () => {
          const actual = pipe.transform(null as any, definedKey);
          expect(actual).toBeUndefined();
        });
      });
    });
  });
});
