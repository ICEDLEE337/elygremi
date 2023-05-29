import { formatRegexes } from './format-regexes.constant';
import {
  IFormatter,
  IFormatterDataLength,
  IFormatterDataMax,
  IFormatterDataMin,
  IFormatterDataPattern,
} from '../interfaces/formatter.interface';

const pwSpecial = formatRegexes.passwordSpecial.toString();
const pwSpecialChars = pwSpecial
  .split('|')
  .map((char) => char.replace('\\', '').replace('/', ''))
  .join(' ');

function format(msg: string, displayName?: string) {
  return `${displayName || ''} ${msg}`;
}

export const formattedErrors: Record<string, IFormatter> = {
  max: (displayName?: string, data?: IFormatterDataMax) =>
    format(`cannot be more than ${data?.max ?? ''}`, displayName),
  maxlength: (displayName?: string, data?: IFormatterDataLength) =>
    format(
      `must be less than ${data?.requiredLength ?? ''} characters`,
      displayName
    ),
  min: (displayName?: string, data?: IFormatterDataMin) =>
    format(`must be at least ${data?.min ?? ''}`, displayName),
  minlength: (displayName?: string, data?: IFormatterDataLength) =>
    format(
      `must be at least ${data?.requiredLength ?? ''} characters`,
      displayName
    ),
  required: (displayName?: string) =>
    displayName ? `${displayName} is required` : 'required',
  pattern: (displayName?: string, data?: IFormatterDataPattern) => {
    let msg: string;

    switch (data?.requiredPattern) {
      case formatRegexes.firstSpaceLast.toString():
        msg = `Format must be "Firstname Lastname" with exactly one space (ex: Bob O'Brien)`;
        break;
      case formatRegexes.dashesLettersNumbers.toString():
        msg = 'Can only contain dashes, letters, and numbers';
        break;
      case formatRegexes.dashesLettersNumbersSpaces.toString():
        msg = 'Can only contain dashes, letters, numbers, and spaces';
        break;
      case formatRegexes.url.toString():
        msg = 'Must be a valid url with https:// or http://';
        break;
      case formatRegexes.protocol.toString():
        msg = 'Must begin with http:// or https://';
        break;
      case formatRegexes.code.toString():
        msg = 'Must match the format ######';
        break;
      case formatRegexes.phone.toString():
        msg = 'Must match the format ###-###-####';
        break;
      case formatRegexes.phonePlusOne.toString():
        msg = 'Must match the format +1##########';
        break;
      case formatRegexes.zip.toString():
        msg = 'Must match the format #####';
        break;
      case formatRegexes.email.toString():
        msg = 'Must be a valid email address';
        break;
      case formatRegexes.passwordNumber.toString():
        msg = 'Must contain a number';
        break;
      case formatRegexes.passwordUpper.toString():
        msg = 'Must contain an uppercase character';
        break;
      case formatRegexes.passwordLower.toString():
        msg = 'Must contain a lowercase character';
        break;
      case pwSpecial:
        msg = `Must contain one of: ${pwSpecialChars}`;
        break;
      default:
        msg = 'Contains invalid characters';
        break;
    }

    return format(msg, displayName);
  },
  unique: (displayName?: string) => format('must be unique', displayName),
};
