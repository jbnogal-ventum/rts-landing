// src/context/AppContext.jsx
import { createContext, useContext, useReducer, useCallback } from 'react';

const initialState = {
    scroll: 0,
    phase: 0,
    navMode: 'dark',
    isLoading: true,
    loaderDone: false,
    isReady: false, // ← Agregar esto
    lenisInstance: null,
    floatingNode: {
        isExpanded: false,
        isVisible: false,
    },
};

function appReducer(state, action) {
    switch (action.type) {
        case 'SET_SCROLL':
            return { ...state, scroll: action.payload };
        case 'SET_PHASE':
            return { ...state, phase: action.payload };
        case 'SET_NAV_MODE':
            return { ...state, navMode: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_LOADER_DONE':
            return { ...state, loaderDone: action.payload };
        case 'SET_LENIS':
            return { ...state, lenisInstance: action.payload };
        case 'SET_FLOATING_NODE_EXPANDED':
            return {
                ...state,
                floatingNode: { ...state.floatingNode, isExpanded: action.payload }
            };
        case 'SET_FLOATING_NODE_VISIBLE':
            return {
                ...state,
                floatingNode: { ...state.floatingNode, isVisible: action.payload }
            };
        case 'SET_READY':
            return { ...state, isReady: action.payload };
        default:
            return state;
    }
}

const AppContext = createContext();

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState);

    const setScroll = useCallback((scroll) => {
        dispatch({ type: 'SET_SCROLL', payload: scroll });
    }, []);

    const setPhase = useCallback((phase) => {
        dispatch({ type: 'SET_PHASE', payload: phase });
    }, []);

    const setNavMode = useCallback((mode) => {
        dispatch({ type: 'SET_NAV_MODE', payload: mode });
    }, []);

    const setLoaderDone = useCallback((done) => {
        dispatch({ type: 'SET_LOADER_DONE', payload: done });
    }, []);

    const setLenis = useCallback((lenis) => {
        dispatch({ type: 'SET_LENIS', payload: lenis });
    }, []);

    const setFloatingNodeExpanded = useCallback((expanded) => {
        dispatch({ type: 'SET_FLOATING_NODE_EXPANDED', payload: expanded });
    }, []);

    const setFloatingNodeVisible = useCallback((visible) => {
        dispatch({ type: 'SET_FLOATING_NODE_VISIBLE', payload: visible });
    }, []);

    const setIsReady = useCallback((ready) => {
        dispatch({ type: 'SET_READY', payload: ready });
    }, []);

    const value = {
        ...state,
        setScroll,
        setPhase,
        setNavMode,
        setLoaderDone,
        setLenis,
        setFloatingNodeExpanded,
        setFloatingNodeVisible,
        setIsReady
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};