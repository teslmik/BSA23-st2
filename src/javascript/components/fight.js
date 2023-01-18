import { controls } from '../../constants/controls';


export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    const rightFighterIndicator = document.getElementById('right-fighter-indicator'),
      leftFighterIndicator = document.getElementById('left-fighter-indicator'),
      CRIT_FREQUENCY = 10000,
      canAction = {
        isBlockLeft: false,
        isBlockRight: false,
        canCriticalLeft: true,
        canCriticalRight: true,
      };

    let healthLeft = 100,
      healthRight = 100,
      criticalKeyLeft = new Map(),
      criticalKeyRight = new Map();

    const keyupFunc = (event) => {
      const key = event.code;
      if (key === controls.PlayerOneBlock) canAction.isBlockLeft = false;
      if (key === controls.PlayerTwoBlock) canAction.isBlockRight = false;
      if (controls.PlayerOneCriticalHitCombination.includes(key)) criticalKeyLeft.set(key, false);
      if (controls.PlayerTwoCriticalHitCombination.includes(key)) criticalKeyRight.set(key, false);
    }

    // -------------------------------------------------------------------

    document.addEventListener('keydown', playerActions);
    document.addEventListener('keyup', keyupFunc);

    // ---------------------------------------------------------

    function playerActions(event) {
      const key = event.code;

      if (key === controls.PlayerOneAttack && !canAction.isBlockLeft && !canAction.isBlockRight) {
        healthRight = attackFighter(firstFighter, secondFighter, healthRight);
        rightFighterIndicator.style.width = `${healthRight}%`;
      }
      if (key === controls.PlayerTwoAttack && !canAction.isBlockRight && !canAction.isBlockLeft) {
        healthLeft = attackFighter(secondFighter, firstFighter, healthLeft);
        leftFighterIndicator.style.width = `${healthLeft}%`;
      }
      if (key === controls.PlayerOneBlock) canAction.isBlockLeft = true;
      if (key === controls.PlayerTwoBlock) canAction.isBlockRight = true;

      if (controls.PlayerOneCriticalHitCombination.includes(key)) {
        criticalKeyLeft.set(key, true);

        if (criticalKeyLeft.get('KeyQ') && criticalKeyLeft.get('KeyW') && criticalKeyLeft.get('KeyE') && canAction.canCriticalLeft) {
          canAction.canCriticalLeft = false;
          healthRight = attackFighter(firstFighter, secondFighter, healthRight, true);
          rightFighterIndicator.style.width = `${healthRight}%`;

          setTimeout(() => {
            canAction.canCriticalLeft = true;
          }, CRIT_FREQUENCY);
        }
      }

      if (controls.PlayerTwoCriticalHitCombination.includes(key)) {
        criticalKeyRight.set(key, true);

        if (criticalKeyRight.get('KeyU') && criticalKeyRight.get('KeyI') && criticalKeyRight.get('KeyO') && canAction.canCriticalRight) {
          canAction.canCriticalRight = false;
          healthLeft = attackFighter(secondFighter, firstFighter, healthLeft, true);
          leftFighterIndicator.style.width = `${healthLeft}%`;

          setTimeout(() => {
            canAction.canCriticalRight = true;
          }, CRIT_FREQUENCY);
        }
      }

      if (healthRight === 0 || healthLeft === 0) {
        document.removeEventListener('keydown', playerActions);
        document.removeEventListener('keyup', keyupFunc);
        healthRight === 0 ? resolve(firstFighter) : resolve(secondFighter);
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
