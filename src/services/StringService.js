export default class StringService {
  static uppercaseWords(str = '') {
    return (str || '').replace(/\w\S*/g, txt => {
      return StringService.capitalize(txt);
    });
  }

  static capitalize(str = '') {
    return `${str.charAt(0).toUpperCase()}${str.substr(1).toLowerCase()}`;
  }
}
