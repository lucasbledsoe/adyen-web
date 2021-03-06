/* eslint @typescript-eslint/camelcase: 0 */
import { iso13616Prepare, iso7064Mod97_10, electronicFormat, regex, getIbanCountrySpecification } from './utils';

/**
 * Contains a validation status
 * @private
 * @param {string} status
 * @param {string} code
 * @returns {object}
 */
function ValidationStatus(status, code = null) {
    this.status = status;
    this.code = code;
}

/**
 * Validates the format of an iban
 * @private
 * @param {string} iban
 * @returns {boolean}
 */
const checkIbanStructure = iban => {
    const countryCode = iban.slice(0, 2);
    const ibanRegex = regex(iban, countryCode);

    return (ibanRegex.test && ibanRegex.test(iban.slice(4))) || false;
};

/**
 * Checks validity of an IBAN
 * @param {string} iban
 * @returns {boolean}
 */
export const isValidIBAN = iban => {
    const electronicFormatIban = electronicFormat(iban);
    const preparedIban = iso13616Prepare(electronicFormatIban);
    const isValidISO = iso7064Mod97_10(preparedIban) === 1;

    return isValidISO && checkIbanStructure(electronicFormatIban);
};

/**
 * Checkss the validity status of an IBAN
 * @param {string} iban
 * @returns {ValidationStatus}
 */
export const checkIbanStatus = iban => {
    const electronicFormatIban = electronicFormat(iban);

    if (iban.length < 2) {
        return new ValidationStatus('no-validate', 'TOO_SHORT'); // A
    }

    const countryCode = electronicFormatIban.slice(0, 2);
    const countrySpecification = getIbanCountrySpecification(countryCode);

    if (!countrySpecification) {
        return new ValidationStatus('invalid', 'INVALID_COUNTRY'); // AA13TEST0123456789
    }

    if (electronicFormatIban.length > countrySpecification.length) {
        return new ValidationStatus('invalid', 'TOO_LONG'); // NL13TEST01234567891
    }

    if (electronicFormatIban.length === countrySpecification.length) {
        if (isValidIBAN(iban)) {
            return new ValidationStatus('valid', 'VALID'); // NL13TEST0123456789
        }

        return new ValidationStatus('invalid', 'INVALID_IBAN'); // NL13TEST0123456781
    }

    return new ValidationStatus('no-validate', 'UNKNOWN'); // NL13TEST012345678
};

/**
 * Checks validity of a holder name
 * @param {string} holder
 */
export const isValidHolder = holder => !!(holder && holder.length && holder.length > 0);
