import { HexColorPicker } from "react-colorful";

export default function ThemePicker({ color, setColor }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 rounded-3xl bg-white/5 border border-white/10 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-white">Chat background</p>
          <p className="text-xs text-slate-400">Pick a custom theme color</p>
        </div>
        <div
          className="h-9 w-9 rounded-full border border-white/15 shadow-inner"
          style={{ backgroundColor: color }}
        />
      </div>

      <div className="rounded-3xl overflow-hidden border border-white/10 bg-[#0d0f14] p-2">
        <HexColorPicker color={color} onChange={setColor} />
      </div>
    </div>
  );
}
