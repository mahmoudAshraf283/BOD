import React from 'react';
import { Toast } from 'primereact/toast';

const NotificationSystem = ({ toastRef }) => {
    return (
        <Toast 
            ref={toastRef} 
            position="top-right"
            baseZIndex={1000}
            breakpoints={{'640px': {width: '100%', right: '0', left: '0'}}}
        />
    );
};

export default NotificationSystem;
