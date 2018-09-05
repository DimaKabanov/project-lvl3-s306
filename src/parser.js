const parseXml = (str) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(str, 'application/xml');
};

export default parseXml;
