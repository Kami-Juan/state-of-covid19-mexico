import {last, head} from 'lodash';
import moment from 'moment';

export const timeRangeCollection = (collection, range) => {
  const collectionKeys = Object.keys(collection);
  collectionKeys.sort((a, b) => new Date(a) - new Date(b));

  const initDate = moment(head(range));
  const lastDate = moment(last(range));
  const diffDates = lastDate.diff(initDate, 'days');

  let countDays = 1;
  const newCollection = {
    [new Date(head(range)).getTime()]: collection[head(range)]
      ? collection[head(range)]
      : 0,
  };

  while (countDays <= diffDates) {
    const formatInitDate = initDate.add(1, 'days').format('YYYY-MM-DD');
    countDays++;

    if (collection[formatInitDate]) {
      newCollection[new Date(formatInitDate).getTime()] =
        collection[formatInitDate];
    } else {
      newCollection[new Date(formatInitDate).getTime()] = 0;
    }
  }

  return newCollection;
};

export const sizeRangeCollection = collections => {
  const firstElements = [];
  const lastElements = [];

  for (let i = 0; i < collections.length; i++) {
    const collectionKeys = Object.keys(collections[i]);
    collectionKeys.sort((a, b) => new Date(a) - new Date(b));

    firstElements.push(head(collectionKeys));
    lastElements.push(last(collectionKeys));
  }

  firstElements.sort((a, b) => new Date(a) - new Date(b));
  lastElements.sort((a, b) => new Date(b) - new Date(a));

  const initDate = moment(head(firstElements));
  const lastDate = moment(head(lastElements));
  const diffDates = lastDate.diff(initDate, 'days');

  let countDays = 1;
  const newCollection = [head(firstElements)];

  while (countDays <= diffDates) {
    const formatDate = initDate.add(1, 'days').format('YYYY-MM-DD');
    newCollection.push(formatDate);
    countDays++;
  }

  return newCollection;
};
