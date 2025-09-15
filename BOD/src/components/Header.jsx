import React from 'react';
import { Button } from 'primereact/button';

const Header = ({ onMenuToggle }) => {
    return (
        <header className="app-header fixed top-0 left-0 w-full bg-white border-bottom-1 surface-border z-5 lg:hidden">
            <div className="flex align-items-center justify-content-between px-3 py-2">
                <Button 
                    className="burger-menu-button p-button-text p-button-rounded"
                    onClick={onMenuToggle}
                    aria-label="Toggle menu"
                >
                    <div className="burger-icon">
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                        <span className="burger-line"></span>
                    </div>
                </Button>
                
                <div className="flex align-items-center">
                    <span className="font-bold text-xl text-primary">BOD Dashboard</span>
                </div>
                
                <div className="w-3rem"> {/* Spacer to center the title */}
                </div>
            </div>
        </header>
    );
};

export default Header;