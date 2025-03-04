import SPELLS from 'common/SPELLS';
import RESOURCE_TYPES from 'game/RESOURCE_TYPES';
import COVENANTS from 'game/shadowlands/COVENANTS';
import { ResourceIcon } from 'interface';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import Events, { DamageEvent, ResourceChangeEvent } from 'parser/core/Events';
import Abilities from 'parser/core/modules/Abilities';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import ItemDamageDone from 'parser/ui/ItemDamageDone';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';

class EchoingReprimand extends Analyzer {
  static dependencies = {
    abilities: Abilities,
  };
  damage: number = 0;
  comboPointsGained: number = 0;
  comboPointsWasted: number = 0;
  protected abilities!: Abilities;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasCovenant(COVENANTS.KYRIAN.id);
    this.addEventListener(
      Events.damage.by(SELECTED_PLAYER).spell(SPELLS.ECHOING_REPRIMAND),
      this.onDamage,
    );
    this.addEventListener(
      Events.resourcechange.by(SELECTED_PLAYER).spell(SPELLS.ECHOING_REPRIMAND_ENERGIZE),
      this.onEnergize,
    );
  }

  onDamage(event: DamageEvent) {
    this.damage += event.amount + (event.absorbed || 0);
  }

  onEnergize(event: ResourceChangeEvent) {
    if (event.resourceChangeType === RESOURCE_TYPES.COMBO_POINTS.id) {
      this.comboPointsGained += event.resourceChange;
      this.comboPointsWasted += event.waste;
    }
  }

  statistic() {
    return (
      <Statistic size="flexible" category={STATISTIC_CATEGORY.COVENANTS}>
        <BoringSpellValueText spellId={SPELLS.ECHOING_REPRIMAND.id}>
          <>
            <ItemDamageDone amount={this.damage} />
            <br />
            <ResourceIcon id={RESOURCE_TYPES.COMBO_POINTS.id} noLink />
            {this.comboPointsGained}/{this.comboPointsWasted + this.comboPointsGained}
            <small> Combo Points gained</small>
          </>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default EchoingReprimand;
