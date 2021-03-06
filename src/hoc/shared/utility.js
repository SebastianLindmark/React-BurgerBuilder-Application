export const checkValidity = (value, rules) =>  {
    let isValid = true;
    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = isValid && value.trim() !== '';
    }

    if (rules.minLength) {
        isValid = isValid && value.length >= rules.minLength;
    }

    return isValid;
}

