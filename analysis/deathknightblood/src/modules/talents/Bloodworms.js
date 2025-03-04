import { formatThousands } from 'common/format';
import SPELLS from 'common/SPELLS';
import Analyzer, { SELECTED_PLAYER, SELECTED_PLAYER_PET } from 'parser/core/Analyzer';
import Events from 'parser/core/Events';
import AbilityTracker from 'parser/shared/modules/AbilityTracker';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import ItemHealingDone from 'parser/ui/ItemHealingDone';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';

//Worms last 15 sec. But sometimes lag and such makes them expire a little bit early.
const WORMLIFESPAN = 14900;
class Bloodworms extends Analyzer {
  static dependencies = {
    abilityTracker: AbilityTracker,
  };

  totalSummons = 0;
  totalHealing = 0;
  totalDamage = 0;
  poppedEarly = 0;
  wormID = 0;

  bloodworm = [];

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.BLOODWORMS_TALENT.id);
    this.addEventListener(Events.summon.by(SELECTED_PLAYER).spell(SPELLS.BLOODWORM), this.onSummon);
    this.addEventListener(Events.damage.by(SELECTED_PLAYER_PET), this.onDamage);
    this.addEventListener(
      Events.instakill.by(SELECTED_PLAYER_PET).spell(SPELLS.BLOODWORM_DEATH),
      this.onInstakill,
    );
    this.addEventListener(
      Events.heal.to(SELECTED_PLAYER).spell(SPELLS.BLOODWORM_DEATH),
      this.onHeal,
    );
  }

  poppedWorms(bloodworm) {
    return bloodworm.filter((e) => e.killedTime - e.summonedTime <= WORMLIFESPAN).length;
  }

  onSummon(event) {
    this.bloodworm.push({
      uniqueID: event.targetInstance,
      summonedTime: event.timestamp,
    });
    this.totalSummons += 1;
    this.wormID = event.targetID;
  }

  onDamage(event) {
    if (event.sourceID !== this.wormID) {
      return;
    }
    this.totalDamage += event.amount + (event.absorbed || 0);
  }

  onInstakill(event) {
    let index = -1;
    this.bloodworm.forEach((e, i) => {
      if (e.uniqueID === event.targetInstance) {
        index = i;
      }
    });

    if (index === -1) {
      return;
    }
    this.bloodworm[index].killedTime = event.timestamp;
  }

  onHeal(event) {
    this.totalHealing += (event.amount || 0) + (event.absorbed || 0);
  }

  statistic() {
    return (
      <Statistic
        position={STATISTIC_ORDER.OPTIONAL(2)}
        category={STATISTIC_CATEGORY.TALENTS}
        size="flexible"
        tooltip={
          <>
            <strong>Damage:</strong> {formatThousands(this.totalDamage)} /{' '}
            {this.owner.formatItemDamageDone(this.totalDamage)}
            <br />
            <strong>Number of worms summoned:</strong> {this.totalSummons}
            <br />
            <strong>Number of worms popped early:</strong> {this.poppedWorms(this.bloodworm)}
          </>
        }
      >
        <BoringSpellValueText spellId={SPELLS.BLOODWORMS_TALENT.id}>
          <>
            <ItemHealingDone amount={this.totalHealing} />
          </>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default Bloodworms;
