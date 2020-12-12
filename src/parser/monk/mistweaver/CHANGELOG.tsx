import React from 'react';

import { Abelito75, Anomoly, Moonrabbit, Tyndi, Vohrr } from 'CONTRIBUTORS';
import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import { change, date } from 'common/changelog';

export default [
  change(date(2020, 12, 12), <>Enabled endurance conduits.</>, Abelito75),
  change(date(2020, 12, 4), <>Turned on Ancient Teachings of the Monastery and Clouded Focus.</>, Abelito75),
  change(date(2020, 12, 4), <>Enabled conduits.</>, Abelito75),
  change(date(2020, 10, 31), <>Updates to Ancient Teachings of the Monastery.</>, Vohrr),
  change(date(2020, 10, 25), <>Added average Enveloping Breath targets to checklist and suggestions.</>, Vohrr),
  change(date(2020, 10, 21), <>Updates to Lifecyles module to account for innervate and Chi-Ji stacks and updated suggestion threshhold for Shadowlands. </>, Vohrr),
  change(date(2020, 10, 20), <>Fixed Mana Tea duration in T45Comparison and updated Mana Tea suggestion.</>, Vohrr),
  change(date(2020, 10, 19), <>Fixed talent detection for hot tracker. </>, Abelito75),
  change(date(2020, 10, 19), <>Fixed Refreshing Jade Wind. </>, Abelito75),
  change(date(2020, 10, 19), <>Added Enveloping Breath module. </>, Vohrr),
  change(date(2020, 10, 14), <>Converted some more files to typescript as well as fixing internalization. </>, Abelito75),
  change(date(2020, 10, 14), <>Corrected Upwelling's icon. </>, Abelito75),
  change(date(2020, 10, 14), <>Updating Yu'lon's tooltip! </>, Abelito75),
  change(date(2020, 10, 14), <>We're updated for 9.0.1! </>, Abelito75),
  change(date(2020, 10, 12), <>Updated <SpellLink id={SPELLS.ENVELOPING_MIST.id} /> and <SpellLink id={SPELLS.SOOTHING_MIST.id} /> modules to use Event Listeners.</>, [Anomoly]),
  change(date(2020, 10, 12), <>Converted the majority of files to typescript. </>, Abelito75),
  change(date(2020, 10, 7), <>Updated Stat value scaling. </>, Abelito75),
  change(date(2020, 10, 7), <>Updated Harm Denial to include the expel harm cast on an ally.</>, Moonrabbit),
  change(date(2020, 10, 6), <>Updated <SpellLink id={SPELLS.SPINNING_CRANE_KICK.id} /> and <SpellLink id={SPELLS.ESSENCE_FONT.id} /> modules to use Event Listeners.</>, [Anomoly]),
  change(date(2020, 10, 4), <>Added stack management breakdown to InvokeChiji talent module. </>, Vohrr),
  change(date(2020, 10, 6), <>Updated most talents to use action listeners.</>, Abelito75),
  change(date(2020, 10, 6), <>Updated <SpellLink id={SPELLS.RENEWING_MIST.id} /> to use Event Listeners.</>, [Anomoly]),
  change(date(2020, 10, 6), <>Added Fallen Order statistic.</>, Abelito75),
  change(date(2020, 10, 6), <>Updated core spec module files to TypeScript.</>, [Anomoly]),
  change(date(2020, 10, 6), <>Moved <SpellLink id={SPELLS.INVOKE_CHIJI_THE_RED_CRANE_TALENT.id} /> statistic box to the correct location.</>, [Moonrabbit]),
  change(date(2020, 10, 4), <>Added Expel Harm module and updated relevant files.</>, [Vohrr]),
  change(date(2020, 10, 4), <>Corrected overhealing a few spells in MistweaverHealingEfficiencyTracker.</>, [Vohrr]),
  change(date(2020, 10, 3), <>Updated <SpellLink id={SPELLS.INVOKE_CHIJI_THE_RED_CRANE_TALENT.id} /> statbox to include enveloping breath healing.</>, [Vohrr]),
  change(date(2020, 10, 3), <>Added the Clouded Focus legendary.</>, [Abelito75]),
  change(date(2020, 10, 2), <>Corrected Life Cocoon to track all hots.</>, [Moonrabbit]),
  change(date(2020, 10, 2), <>Corrected Nourshing Chi to track all hots.</>, [Moonrabbit]),
  change(date(2020, 10, 1), <>Updated spell data so stat weights will be accurate.</>, [Abelito75]),
  change(date(2020, 10, 1), <>Added Statistics for Tear of Morning and Ancient Teachings of the Monastery.</>, [Abelito75]),
  change(date(2020, 9, 30), <>Integration Tests have been added for Mistweaver.</>, [Anomoly]),
  change(date(2020, 9, 30), <>Statistic created for the potency conduit Imbued Reflections. </>, [Abelito75]),
  change(date(2020, 9, 26), <>Added <SpellLink id={SPELLS.INVOKE_YULON_THE_JADE_SERPENT.id} /> and <SpellLink id={SPELLS.INVOKE_CHIJI_THE_RED_CRANE_TALENT.id} /> to the cooldown tracker.</>, [Abelito75]),
  change(date(2020, 9, 26), <>Added Rising Sun Revival, Jade Bond, and Nourishing Chi.</>, [Abelito75]),
  change(date(2020, 9, 26), <>Updated Checklist to include Touch of Death, Yu'lon and Chi-ji.</>, [Abelito75]),
  change(date(2020, 9, 22), <>Updated pieces to the Mistweaver Core for Shadowlands.</>, [Tyndi]),
  change(date(2020, 9, 22), <>Mistweaver cleanup for shadowlands.</>, [Abelito75]),
  change(date(2020, 9, 21), <>Added all endurance conduits.</>, [Abelito75]),
  change(date(2020, 9, 1), <>Initial Shadowlands cleanup activities.</>, [Anomoly]),
];
