import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { SearchAndWindows } from "./windowcontent.js";
import PopupWindow from '../.widgethacks/popupwindow.js';
import { clickCloseRegion } from '../.commonwidgets/clickcloseregion.js';

export default (id = '') => PopupWindow({
    name: `overview${id}`,
    keymode: 'on-demand',
    visible: false,
    exclusivity:'ignore',
    anchor: ['top', 'bottom', 'left', 'right'],
    layer: 'top',
    child: Widget.Box({
        vertical: true,
        children: [
            SearchAndWindows(),
            clickCloseRegion({ name: 'overview', multimonitor: false, fillMonitor: 'vertical' }),
        ]
    }),
})
