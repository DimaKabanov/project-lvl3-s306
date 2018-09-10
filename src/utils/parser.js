import { uniqueId } from 'lodash';

const getTagData = (node, tag) => node.querySelector(tag).textContent;

export default (str) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(str, 'application/xml');
  const feedList = [...xml.querySelectorAll('item')];

  return {
    title: getTagData(xml, 'title'),
    link: getTagData(xml, 'link'),
    description: getTagData(xml, 'description'),
    items: feedList.map(item => ({
      title: getTagData(item, 'title'),
      link: getTagData(item, 'link'),
      description: getTagData(item, 'description'),
      pubDate: getTagData(item, 'pubDate'),
      id: uniqueId('newsId_'),
    })),
  };
};
