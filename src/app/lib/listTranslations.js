export const translateListName = (listOrName, t) => {
  if (!listOrName) return '';
  if (typeof listOrName === 'object') {
    if (listOrName.system_key) {
      return t(`dynamic.defaultLists.${listOrName.system_key}.name`) || listOrName.name;
    }
    return listOrName.name;
  }
  const name = listOrName;
  if (name === 'Watchlist') return t('dynamic.defaultLists.watchlist.name') || name;
  if (name === 'Video Watchlist') return t('dynamic.defaultLists.video_watchlist.name') || name;
  if (name === 'Adult Scenes' || name === 'NSFW Watchlist') return t('dynamic.defaultLists.adult_scenes.name') || name;
  if (name === 'Adult Movies' || name === 'NSFW Movie/TV Watchlist') return t('dynamic.defaultLists.adult_movies.name') || name;
  return name;
};

export const translateListDescription = (listOrName, desc, t) => {
  if (typeof listOrName === 'object') {
    const list = listOrName;
    if (list.system_key) {
      return t(`dynamic.defaultLists.${list.system_key}.description`) || list.description;
    }
    return list.description;
  }
  const name = listOrName;
  if (name === 'Watchlist') return t('dynamic.defaultLists.watchlist.description') || desc;
  if (name === 'Video Watchlist') return t('dynamic.defaultLists.video_watchlist.description') || desc;
  if (name === 'Adult Scenes' || name === 'NSFW Watchlist') return t('dynamic.defaultLists.adult_scenes.description') || desc;
  if (name === 'Adult Movies' || name === 'NSFW Movie/TV Watchlist') return t('dynamic.defaultLists.adult_movies.description') || desc;
  return desc;
};
