import React, { useState, useEffect } from 'react';

const MyComponent: React.FC = () => {

    // Effect hook
    useEffect(() => {
        console.log('Component mounted');
    });

    return (
        <div>
            <h1>Events page</h1>
        </div>
    );
};

export default MyComponent;
