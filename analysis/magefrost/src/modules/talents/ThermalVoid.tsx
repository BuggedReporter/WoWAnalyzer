import { formatDuration, formatNumber } from 'common/format';
import SPELLS from 'common/SPELLS';
import { SpellIcon } from 'interface';
import Analyzer, { Options } from 'parser/core/Analyzer';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';

const BASE_DURATION = 20_000;

/*
 * Icy Veins' duration is increased by 10 sec.
 * Your Ice Lances against frozen targets extend your Icy Veins by an additional 1 sec.
 */
class ThermalVoid extends Analyzer {
  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(SPELLS.THERMAL_VOID_TALENT.id);
  }

  statistic() {
    const hist = this.selectedCombatant.getBuffHistory(SPELLS.ICY_VEINS.id);
    if (!hist || hist.length === 0) {
      return null;
    }

    let totalIncrease = 0;
    let totalDuration = 0; // We could use getBuffUptime but we are doing the math anyway
    const castRows = hist.map((buff: any, idx: any) => {
      const end = buff.end || this.owner.currentTimestamp;
      const castTime = buff.start - this.owner.fight.start_time;
      const duration = end - buff.start;
      totalDuration += duration;
      // If the buff ended early because of death or fight end, don't blame the talent
      const increase = Math.max(0, duration - BASE_DURATION);
      totalIncrease += increase;
      return (
        <tr key={idx}>
          <td>{formatDuration(castTime)}</td>
          <td>{formatDuration(duration)}</td>
          <td>{formatDuration(increase)}</td>
        </tr>
      );
    });

    return (
      <Statistic
        size="flexible"
        category={STATISTIC_CATEGORY.TALENTS}
        tooltip="Extension times include the base 10 second increase from the talent."
        dropdown={
          <>
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Cast</th>
                  <th>Duration</th>
                  <th>Extension</th>
                </tr>
              </thead>
              <tbody>
                {castRows}
                <tr key="avg">
                  <th>Average</th>
                  <th>{formatDuration(totalDuration / hist.length)}</th>
                  <th>{formatDuration(totalIncrease / hist.length)}</th>
                </tr>
              </tbody>
            </table>
          </>
        }
      >
        <BoringSpellValueText spellId={SPELLS.THERMAL_VOID_TALENT.id}>
          <>
            <SpellIcon id={SPELLS.ICY_VEINS.id} /> +{formatNumber(totalIncrease / 1000)} seconds
          </>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default ThermalVoid;
