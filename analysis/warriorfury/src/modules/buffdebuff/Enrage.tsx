import { t } from '@lingui/macro';
import { formatNumber, formatPercentage, formatThousands } from 'common/format';
import SPELLS from 'common/SPELLS';
import { SpellLink } from 'interface';
import UptimeIcon from 'interface/icons/Uptime';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import calculateEffectiveDamage from 'parser/core/calculateEffectiveDamage';
import Events, { DamageEvent } from 'parser/core/Events';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import StatTracker from 'parser/shared/modules/StatTracker';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import Statistic from 'parser/ui/Statistic';

class Enrage extends Analyzer {
  static dependencies = {
    statTracker: StatTracker,
  };
  totalDamage: number = 0;
  damage: number = 0;
  protected statTracker!: StatTracker;

  constructor(options: Options) {
    super(options);

    this.addEventListener(Events.damage.by(SELECTED_PLAYER), this.onPlayerDamage);
  }

  get uptime() {
    return this.selectedCombatant.getBuffUptime(SPELLS.ENRAGE.id) / this.owner.fightDuration;
  }

  get dpsIncrease() {
    return this.damage / (this.owner.fightDuration / 1000);
  }

  get damageTotalPercent() {
    return this.owner.getPercentageOfTotalDamageDone(this.damage);
  }

  get suggestionThresholds() {
    return {
      actual: this.uptime,
      isLessThan: {
        minor: 0.7,
        average: 0.65,
        major: 0.6,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  onPlayerDamage(event: DamageEvent) {
    if (this.selectedCombatant.hasBuff(SPELLS.ENRAGE.id)) {
      this.damage += calculateEffectiveDamage(event, this.statTracker.currentMasteryPercentage);
      this.totalDamage += event.amount;
    }
  }

  suggestions(when: When) {
    when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) =>
      suggest(
        <>
          Your <SpellLink id={SPELLS.ENRAGE.id} /> uptime can be improved.
        </>,
      )
        .icon(SPELLS.ENRAGE.icon)
        .actual(
          t({
            id: 'warrior.fury.suggestions.enrage.uptime',
            message: `${formatPercentage(actual)}% Enrage uptime`,
          }),
        )
        .recommended(`>${formatPercentage(recommended)}% is recommended`),
    );
  }

  statistic() {
    return (
      <Statistic
        size="flexible"
        tooltip={
          <>
            You did{' '}
            <strong>
              {formatThousands(this.damage)} ({formatPercentage(this.damageTotalPercent)}%)
            </strong>{' '}
            damage while enraged, contributing <strong>{formatNumber(this.dpsIncrease)}</strong>{' '}
            DPS.
          </>
        }
      >
        <BoringSpellValueText spellId={SPELLS.ENRAGE.id}>
          <>
            <UptimeIcon /> {formatPercentage(this.uptime)}% <small>uptime</small>
          </>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default Enrage;
