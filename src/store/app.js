export default {
    namespaced: true,
    state: {
        navigationPanelDisabled: false,
        sidePanelDisabled: false,
        sidePanelHovered: false
    },
    mutations: {
        SET_NAVIGATION_PANEL_DISABLED(state, payload) {
            state.navigationPanelDisabled = !!payload;
        },
        SET_SIDE_PANEL_DISABLED(state, payload) {
            state.sidePanelDisabled = !!payload;
        },
        SET_SIDE_PANEL_HOVERED(state, payload) {
            state.sidePanelHovered = !!payload;
        }
    }
};