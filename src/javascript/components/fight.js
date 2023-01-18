import { controls } from '../../constants/controls';


export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    const rightFighterIndicator = document.getElementById('right-fighter-indicator'),
      leftFighterIndicator = document.getElementById('left-fighter-indicator'),
      canAction = {
        isBlockOne: false,
        isBlockTwo: false,
        canCriticalOne: true,
        canCriticalTwo: true,
      };

    let healthFirst = 100,
      healthSecond = 100,
      criticalKeyOne = new Map(),
      criticalKeyTwo = new Map();

    // -------------------------------------------------------------------

    document.addEventListener('keydown', playerActions);
    document.addEventListener('keyup', (e) => {
      const key = e.code;
      if (key === controls.PlayerOneBlock) canAction.isBlockOne = false;
      if (key === controls.PlayerTwoBlock) canAction.isBlockTwo = false;
      if (controls.PlayerOneCriticalHitCombination.includes(key)) criticalKeyOne.set(key, false);
      if (controls.PlayerTwoCriticalHitCombination.includes(key)) criticalKeyTwo.set(key, false);
    });

    if (healthSecond === 0) resolve(firstFighter);
    if (healthFirst === 0) resolve(secondFighter);

    // ---------------------------------------------------------

    function playerActions(event) {
      const key = event.code;

      if (key === controls.PlayerOneAttack && !canAction.isBlockOne && !canAction.isBlockTwo) {
        healthSecond = attackFighter(firstFighter, secondFighter, healthSecond);
        rightFighterIndicator.style.width = `${healthSecond}%`;
      }
      if (key === controls.PlayerTwoAttack && !canAction.isBlockTwo && !canAction.isBlockOne) {
        healthFirst = attackFighter(secondFighter, firstFighter, healthFirst);
        leftFighterIndicator.style.width = `${healthFirst}%`;
      }
      if (key === controls.PlayerOneBlock) canAction.isBlockOne = true;
      if (key === controls.PlayerTwoBlock) canAction.isBlockTwo = true;

      if (controls.PlayerOneCriticalHitCombination.includes(key)) {
        criticalKeyOne.set(key, true);

        if (criticalKeyOne.get('KeyQ') && criticalKeyOne.get('KeyW') && criticalKeyOne.get('KeyE') && canAction.canCriticalOne) {

          canAction.canCriticalOne = false;
          healthSecond = attackFighter(firstFighter, secondFighter, healthSecond, true);
          rightFighterIndicator.style.width = `${healthSecond}%`;

          setTimeout(() => {
            canAction.canCriticalOne = true;
          }, 10000);
        }
      }

      if (controls.PlayerTwoCriticalHitCombination.includes(key)) {
        criticalKeyTwo.set(key, true);

        if (criticalKeyTwo.get('KeyU') && criticalKeyTwo.get('KeyI') && criticalKeyTwo.get('KeyO') && canAction.canCriticalTwo) {

          canAction.canCriticalTwo = false;
          healthFirst = attackFighter(secondFighter, firstFighter, healthFirst, true);
          leftFighterIndicator.style.width = `${healthFirst}%`;

          setTimeout(() => {
            canAction.canCriticalTwo = true;
          }, 10000);
        }
      }
    }
  });
}

// --------------------------------------------------------------

function attackFighter(attacking, attacked, healthCount, critical = false) {
  const damage = critical ? attacking.attack * 2 : getDamage(attacking, attacked);
  healthCount = healthCount > 0 ? healthCount - ((damage * 100) / attacked.health) : 0;
  return healthCount;
}

export function getDamage(attacker, defender) {
  // return damage
  const damage = getHitPower(attacker) - getBlockPower(defender);

  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  // return hit power
  return fighter.attack * (Math.random() + 1);
}

export function getBlockPower(fighter) {
  // return block power

  return fighter.defense * (Math.random() + 1);
}
