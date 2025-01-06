import React from 'react';

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white bg-opacity-80 z-50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500 border-opacity-50"></div>
            <span className="ml-4 text-xl text-gray-800 font-semibold">Loading...</span>
        </div>
    );
};

export default Loading;
