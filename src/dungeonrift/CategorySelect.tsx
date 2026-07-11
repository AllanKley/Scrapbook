import { ARMOR_CATEGORIES, SHIELD_CATEGORIES, WEAPON_CATEGORIES, WEAPON_RANGE_GROUP_LABELS } from './rules';
import type { WeaponRangeGroup } from './rules';
import type { EquipmentKind } from './types';

const WEAPON_GROUPS: WeaponRangeGroup[] = ['corpo-a-corpo', 'distancia', 'magica'];

interface CategorySelectProps {
  kind: EquipmentKind;
  value: string;
  onChange: (category: string) => void;
}

/** Weapons group by melee/ranged/magic first (10 flat options in one dropdown was hard to scan); armor/shield stay flat since they only have 3 options each. */
export function CategorySelect({ kind, value, onChange }: CategorySelectProps) {
  if (kind === 'weapon') {
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {WEAPON_GROUPS.map((group) => (
          <optgroup key={group} label={WEAPON_RANGE_GROUP_LABELS[group]}>
            {WEAPON_CATEGORIES.filter((c) => c.group === group).map((c) => (
              <option key={c.category} value={c.category}>
                {c.category}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    );
  }

  const flatCategories = kind === 'armor' ? ARMOR_CATEGORIES : kind === 'shield' ? SHIELD_CATEGORIES : [];
  if (flatCategories.length === 0) {
    return <input type="text" placeholder="categoria" value={value} onChange={(e) => onChange(e.target.value)} />;
  }
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {flatCategories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}

export function defaultCategoryFor(kind: EquipmentKind): string {
  if (kind === 'weapon') return WEAPON_CATEGORIES[0]?.category ?? '';
  if (kind === 'armor') return ARMOR_CATEGORIES[0] ?? '';
  if (kind === 'shield') return SHIELD_CATEGORIES[0] ?? '';
  return '';
}
