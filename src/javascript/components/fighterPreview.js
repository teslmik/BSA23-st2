import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });

  // todo: show fighter info (image, name, health, etc.)

  function getFighterInfo(fighter) {
    const fighterInfo = createElement({
      tagName: 'ul',
      className: 'fighter-info__block',
      attributes: { style: { alignSelf: 'center' } },
    });

    for (let i in fighter) {
      const singleItem = createElement({
        tagName: 'li',
        className: 'fighter-info__item',
      });

      singleItem.innerHTML = `<b>${i}</b> - <i>${fighter[i]}</i>`;

      if (i !== '_id' && i !== 'source') fighterInfo.append(singleItem);
    }

    return fighterInfo;
  }

  if (fighter) {
    fighterElement.append(createFighterImage(fighter));
    fighterElement.append(getFighterInfo(fighter));
  }

  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    height: '300px',
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
