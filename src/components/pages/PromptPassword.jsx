import { useEffect } from 'react';

const PromptPassword = () => {
    useEffect(() => {
        const { ApperUI } = window.ApperSDK;
        ApperUI.showPromptPassword('#authentication-prompt-password');
    }, []);

    return (
        <>
            <div className="flex-1 py-12 px-5 flex justify-center items-center">
                <div id="authentication-prompt-password" className="bg-white/90 backdrop-blur-sm mx-auto w-[400px] max-w-full p-10 rounded-2xl shadow-xl border border-gray-100"></div>
            </div>
        </>
    );
};

export default PromptPassword;