import SPELLS from 'common/SPELLS';
import CooldownIcon from 'interface/icons/Cooldown';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { ResourceChangeEvent } from 'parser/core/Events';
import SpellUsable from 'parser/shared/modules/SpellUsable';
import ConduitSpellText from 'parser/ui/ConduitSpellText';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import { STATISTIC_ORDER } from 'parser/ui/StatisticBox';

/**
 * When a Festering Wound bursts the cooldown of Apocalypse is reduced by 0.5 sec.
 */

const CONVOCATION_OF_THE_DEAD_EFFECT_BY_RANK = [
  0,
  5,
  5.5,
  6,
  6.5,
  7,
  7.5,
  8,
  8.5,
  9,
  9.5,
  10,
  10.5,
  11,
  11.5,
  12,
];

class ConvocationOfTheDead extends Analyzer {
  static dependencies = {
    spellUsable: SpellUsable,
  };

  protected spellUsable!: SpellUsable;
  conduitRank = 0;
  cooldownReduction = 0.0;
  wastedCooldownReduction = 0.0;

  constructor(options: Options) {
    super(options);
    this.conduitRank = this.selectedCombatant.conduitRankBySpellID(
      SPELLS.CONVOCATION_OF_THE_DEAD.id,
    );
    if (!this.conduitRank) {
      this.active = false;
      return;
    }
    this.addEventListener(
      Events.resourcechange.by(SELECTED_PLAYER).spell(SPELLS.FESTERING_WOUND_BURST),
      this.onWoundBurst,
    );
  }

  onWoundBurst(event: ResourceChangeEvent) {
    if (this.spellUsable.isOnCooldown(SPELLS.APOCALYPSE.id)) {
      this.cooldownReduction += CONVOCATION_OF_THE_DEAD_EFFECT_BY_RANK[this.conduitRank] / 10;
      this.spellUsable.reduceCooldown(
        SPELLS.APOCALYPSE.id,
        CONVOCATION_OF_THE_DEAD_EFFECT_BY_RANK[this.conduitRank] / 10,
        event.timestamp,
      );
    } else {
      this.wastedCooldownReduction += CONVOCATION_OF_THE_DEAD_EFFECT_BY_RANK[this.conduitRank] / 10;
    }
  }

  statistic() {
    return (
      <Statistic
        position={STATISTIC_ORDER.OPTIONAL(10)}
        size="flexible"
        category={STATISTIC_CATEGORY.COVENANTS}
      >
        <ConduitSpellText spellId={SPELLS.CONVOCATION_OF_THE_DEAD.id} rank={this.conduitRank}>
          <CooldownIcon /> {this.cooldownReduction.toFixed(1)}s <small> of Apocalypse CDR</small>
          <br />
          <CooldownIcon /> {this.wastedCooldownReduction.toFixed(1)}s{' '}
          <small> of wasted Apocalypse CDR</small>
        </ConduitSpellText>
      </Statistic>
    );
  }
}

export default ConvocationOfTheDead;
