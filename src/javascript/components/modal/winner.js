import { showModal } from './modal';
import { createFighterImage } from '../fighterPreview';
import { createElement } from '../../helpers/domHelper';

export function showWinnerModal(fighter) {
  // call showModal function 
  const winnerPreview = createElement({
    tagName: 'div',
    className: 'winner-preview',
  });

  let imageElement = createFighterImage(fighter, "left");
  let title = `${fighter.name} WON!! `;

  winnerPreview.append(imageElement);

  showModal({ title, bodyElement: winnerPreview, onClose: () => window.location.reload() });
}
