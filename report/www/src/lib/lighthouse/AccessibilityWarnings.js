var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export var AccessibilityWarnings = function (_a) {
    var className = _a.className;
    return (_jsxs("div", __assign({ className: className }, { children: ["Moins de 25% des crit\u00E8res d'accessibilit\u00E9 peuvent \u00EAtre test\u00E9s automatiquement,", ' ', _jsx("strong", { children: "une expertise manuelle est requise" }, void 0), ".", _jsx("br", {}, void 0), _jsx("br", {}, void 0), "Ce score ne repr\u00E9sente pas le score RGAA mais une partie des bonnes pratiques de base \u00E0 appliquer."] }), void 0));
};
