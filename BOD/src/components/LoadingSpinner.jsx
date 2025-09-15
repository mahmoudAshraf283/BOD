import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const LoadingSpinner = ({ message = "Loading..." }) => {
    return (
        <div className="flex flex-column align-items-center justify-content-center p-6">
            <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
            <p className="mt-3 text-600">{message}</p>
        </div>
    );
};

export default LoadingSpinner;
