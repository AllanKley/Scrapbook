interface ColorPickerFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPickerField({ label, value, onChange }: ColorPickerFieldProps) {
  return (
    <div className="color-field">
      <label>{label}</label>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '90px', fontFamily: 'monospace' }}
      />
    </div>
  );
}
