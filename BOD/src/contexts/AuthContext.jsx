import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Mock JWT utilities
const mockJWT = {
    sign: (payload) => {
        return btoa(JSON.stringify({
            ...payload,
            exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }));
    },
    verify: (token) => {
        try {
            const decoded = JSON.parse(atob(token));
            if (decoded.exp > Date.now()) {
                return decoded;
            }
            return null;
        } catch {
            return null;
        }
    }
};

// Mock users database
const mockUsers = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123',
        email: 'admin@bod.com',
        name: 'Administrator',
        role: 'admin',
        avatar: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png'
    },
    {
        id: 2,
        username: 'user',
        password: 'user123',
        email: 'user@bod.com',
        name: 'John Doe',
        role: 'user',
        avatar: 'https://primefaces.org/cdn/primereact/images/avatar/asiyajavayant.png'
    }
];

// Initial state
const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
    error: null
};

// Action types
const AuthActionTypes = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    RESTORE_SESSION: 'RESTORE_SESSION',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

// Reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case AuthActionTypes.LOGIN_START:
            return {
                ...state,
                loading: true,
                error: null
            };
        case AuthActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: null
            };
        case AuthActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false,
                error: action.payload
            };
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false,
                error: null
            };
        case AuthActionTypes.RESTORE_SESSION:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: null
            };
        case AuthActionTypes.CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Mock login function
    const login = async (username, password) => {
        dispatch({ type: AuthActionTypes.LOGIN_START });

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Find user in mock database
        const user = mockUsers.find(u => u.username === username && u.password === password);

        if (user) {
            // Create JWT token
            const token = mockJWT.sign({
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role
            });

            // Store in localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('userData', JSON.stringify({
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role,
                avatar: user.avatar
            }));

            dispatch({
                type: AuthActionTypes.LOGIN_SUCCESS,
                payload: {
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        avatar: user.avatar
                    },
                    token
                }
            });

            return { success: true };
        } else {
            dispatch({
                type: AuthActionTypes.LOGIN_FAILURE,
                payload: 'Invalid username or password'
            });
            return { success: false, error: 'Invalid username or password' };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        dispatch({ type: AuthActionTypes.LOGOUT });
    };

    // Clear error function
    const clearError = () => {
        dispatch({ type: AuthActionTypes.CLEAR_ERROR });
    };

    // Restore session on app load
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
            const decoded = mockJWT.verify(token);
            if (decoded) {
                dispatch({
                    type: AuthActionTypes.RESTORE_SESSION,
                    payload: {
                        user: JSON.parse(userData),
                        token
                    }
                });
            } else {
                // Token expired, clear storage
                localStorage.removeItem('authToken');
                localStorage.removeItem('userData');
                dispatch({ type: AuthActionTypes.LOGOUT });
            }
        } else {
            dispatch({ type: AuthActionTypes.LOGOUT });
        }
    }, []);

    const contextValue = {
        ...state,
        login,
        logout,
        clearError,
        mockUsers // For demo purposes
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthActionTypes, mockUsers };