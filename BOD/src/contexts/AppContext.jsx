import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
    activeItem: 'dashboard',
    mobileMenuVisible: false,
    user: null,
    loading: false,
    error: null
};

// Action types
const ActionTypes = {
    SET_ACTIVE_ITEM: 'SET_ACTIVE_ITEM',
    TOGGLE_MOBILE_MENU: 'TOGGLE_MOBILE_MENU',
    SET_MOBILE_MENU: 'SET_MOBILE_MENU',
    SET_USER: 'SET_USER',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer function
const appReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_ACTIVE_ITEM:
            return {
                ...state,
                activeItem: action.payload
            };
        case ActionTypes.TOGGLE_MOBILE_MENU:
            return {
                ...state,
                mobileMenuVisible: !state.mobileMenuVisible
            };
        case ActionTypes.SET_MOBILE_MENU:
            return {
                ...state,
                mobileMenuVisible: action.payload
            };
        case ActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case ActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case ActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Action creators
    const setActiveItem = (item) => {
        dispatch({ type: ActionTypes.SET_ACTIVE_ITEM, payload: item });
    };

    const toggleMobileMenu = () => {
        dispatch({ type: ActionTypes.TOGGLE_MOBILE_MENU });
    };

    const setMobileMenu = (visible) => {
        dispatch({ type: ActionTypes.SET_MOBILE_MENU, payload: visible });
    };

    const setUser = (user) => {
        dispatch({ type: ActionTypes.SET_USER, payload: user });
    };

    const setLoading = (loading) => {
        dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
    };

    const setError = (error) => {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    };

    const clearError = () => {
        dispatch({ type: ActionTypes.CLEAR_ERROR });
    };

    const contextValue = {
        // State
        ...state,
        // Actions
        setActiveItem,
        toggleMobileMenu,
        setMobileMenu,
        setUser,
        setLoading,
        setError,
        clearError
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

// Custom hook to use the context
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

export { ActionTypes };