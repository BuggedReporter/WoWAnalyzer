import SPELLS from 'common/SPELLS';
import { Panel } from 'interface';
import CoreCooldownThroughputTracker, {
  BUILT_IN_SUMMARY_TYPES,
} from 'parser/shared/modules/CooldownThroughputTracker';
import CooldownOverview from 'parser/ui/CooldownOverview';

class ProcTracker extends CoreCooldownThroughputTracker {
  static cooldownSpells = [
    {
      spell: SPELLS.ASCENDANCE_TALENT_ENHANCEMENT.id,
      summary: [BUILT_IN_SUMMARY_TYPES.DAMAGE],
    },
  ];

  tab(): any {
    return {
      title: 'Procs',
      url: 'procs',
      render: () => (
        <Panel>
          <CooldownOverview
            fightStart={this.owner.fight.start_time}
            fightEnd={this.owner.fight.end_time}
            cooldowns={this.pastCooldowns}
            applyTimeFilter={this.owner.applyTimeFilter}
          />
        </Panel>
      ),
    };
  }
}

export default ProcTracker;
