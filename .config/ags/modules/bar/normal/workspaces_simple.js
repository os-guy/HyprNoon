const { GLib, Gdk, Gtk } = imports.gi;
const Pango = imports.gi.Pango;
const PangoCairo = imports.gi.PangoCairo;
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';


// Number style conversion functions
const numberStyles = {
    'arabic': (n) => n.toString(),
    'thai': (n) => n.toString().replace(/[0-9]/g, d => '๐๑๒๓๔๕๖๗๘๙'[d]),
    'japanese': (n) => n.toString().replace(/[0-9]/g, d => '〇一二三四五六七八九'[d]),
    'chinese': (n) => n.toString().replace(/[0-9]/g, d => '零一二三四五六七八九'[d]),
    'korean': (n) => n.toString().replace(/[0-9]/g, d => '영일이삼사오육칠팔구'[d]),
    'devanagari': (n) => n.toString().replace(/[0-9]/g, d => '०१२३४५६७८९'[d]),
    'bengali': (n) => n.toString().replace(/[0-9]/g, d => '০১২৩৪৫৬৭৮৯'[d])
};
const WorkspaceIndicator = Widget.DrawingArea({
    className: 'workspace-indicator',
    setup: (self) => self
        .hook(Hyprland.active.workspace, () => self.queue_draw())
        .on('draw', (self, cr) => {
            // Get current workspace ID
            const ws = Hyprland.active.workspace.id;
            
            // Convert number style
            const text = (n) => n.toString();

            // Configure text rendering
            const layout = PangoCairo.create_layout(cr);
            const desc = Pango.FontDescription.from_string('Sans 12');
            layout.set_font_description(desc);
            layout.set_text(text, -1);

            // Center text
            const [w, h] = layout.get_pixel_size();
            cr.moveTo(self.get_allocated_width()/2 - w/2, 0);
            PangoCairo.show_layout(cr, layout);
        }),
});

export default  WorkspaceIndicator;