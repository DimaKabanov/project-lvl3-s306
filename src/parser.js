const getTagData = (node, tag) => node.querySelector(tag).textContent;

const parseXml = (str) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(str, 'application/xml');
  const feedList = [...xml.querySelectorAll('item')];

  return {
    title: getTagData(xml, 'title'),
    description: getTagData(xml, 'description'),
    items: feedList.map(item => ({
      title: getTagData(item, 'title'),
      link: getTagData(item, 'link'),
      description: getTagData(item, 'description'),
    })),
  };
};

export default parseXml;
