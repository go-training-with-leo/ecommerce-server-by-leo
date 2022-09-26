function convertToRegex<E>(data: E): string {
  return `${Object.values(data)
    .filter((elm) => isNaN(Number(elm)))
    .join('|')}`;
}

function getValuesAndToString<E>(data: E): string[] {
  return Object.values(data)
    .filter((elm) => !isNaN(Number(elm)))
    .map((elm) => elm.toString());
}

export default {
  convertToRegex,
  getValuesAndToString,
};
