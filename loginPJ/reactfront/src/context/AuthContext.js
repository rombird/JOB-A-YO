// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 자동 로그인 체크
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                await api.get('/validate');  // 쿠키 기반 토큰 자동 전달
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            } finally {
                setIsLoading(false);
            }
        };
        checkAuthStatus();
    }, []);

    // 로그인 성공 시
    const login = () => {
        setIsLoggedIn(true);
    };

    // 로그아웃
    const logout = async () => {
        try {
            await api.post('/logout');
            setIsLoggedIn(false);
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
