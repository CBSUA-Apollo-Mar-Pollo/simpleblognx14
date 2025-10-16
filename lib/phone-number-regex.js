const { countries } = require("@/constants/countries-phone-formats");

export const phoneNumberRegex = (dialCode) => {
  const regexMap = countries.reduce((acc, { dial }) => {
    const countryCode = dial.replace("+", "");
    const phoneLength = dial.replace(/[^\d]/g, "").length;

    const regex = new RegExp(`^[0-9]{${phoneLength}}$`);

    acc[countryCode] = regex;

    return acc;
  }, {});

  return regexMap[dialCode] || /^[0-9]+$/;
};
