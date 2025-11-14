
import React, { useState } from 'react';
import WidgetCard from './WidgetCard';
import { VideoCameraIcon } from './icons/VideoCameraIcon';
import { VideoCameraSlashIcon } from './icons/VideoCameraSlashIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { MicrophoneSlashIcon } from './icons/MicrophoneSlashIcon';
import { PhoneXMarkIcon } from './icons/PhoneXMarkIcon';

const SecureVideoChat: React.FC = () => {
    const [isCallActive, setIsCallActive] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);

    const handleStartCall = () => setIsCallActive(true);
    const handleEndCall = () => setIsCallActive(false);
    const toggleMute = () => setIsMuted(prev => !prev);
    const toggleCamera = () => setIsCameraOff(prev => !prev);

    return (
        <WidgetCard title="Secure Video Consultation" icon={<VideoCameraIcon className="w-6 h-6" />}>
            <div className="flex flex-col items-center justify-center h-full space-y-4">
                {!isCallActive ? (
                    <>
                        <p className="text-center text-gray-400">Start a secure, end-to-end encrypted video call with a verified ally.</p>
                        <button
                            onClick={handleStartCall}
                            className="w-full bg-green-600 hover:bg-green-500 transition-colors duration-300 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center space-x-2"
                        >
                            <VideoCameraIcon className="w-5 h-5" />
                            <span>Start Secure Call</span>
                        </button>
                    </>
                ) : (
                    <div className="w-full h-full flex flex-col">
                        <div className="flex-grow w-full bg-black rounded-md relative overflow-hidden border-2 border-cyan-700">
                             <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-gray-500">Remote Feed</p>
                             </div>
                            <div className="absolute top-2 right-2 w-1/4 h-1/4 bg-gray-800 border-2 border-gray-600 rounded-md">
                                 <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-gray-500 text-xs">{isCameraOff ? 'Cam Off' : 'Local'}</p>
                                 </div>
                            </div>
                            <div className="absolute bottom-2 left-2 text-xs text-green-400 font-mono">
                                [End-to-End Encrypted Session]
                            </div>
                        </div>
                        <div className="flex items-center justify-center space-x-4 mt-4">
                           <button onClick={toggleMute} className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-yellow-500 text-black' : 'bg-gray-700 hover:bg-gray-600'}`} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                                {isMuted ? <MicrophoneSlashIcon className="w-6 h-6" /> : <MicrophoneIcon className="w-6 h-6" />}
                           </button>
                           <button onClick={toggleCamera} className={`p-3 rounded-full transition-colors ${isCameraOff ? 'bg-yellow-500 text-black' : 'bg-gray-700 hover:bg-gray-600'}`} aria-label={isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}>
                                {isCameraOff ? <VideoCameraSlashIcon className="w-6 h-6" /> : <VideoCameraIcon className="w-6 h-6" />}
                           </button>
                            <button onClick={handleEndCall} className="p-3 bg-red-600 hover:bg-red-500 rounded-full transition-colors" aria-label="End Call">
                               <PhoneXMarkIcon className="w-6 h-6" />
                           </button>
                        </div>
                    </div>
                )}
            </div>
        </WidgetCard>
    );
};

export default SecureVideoChat;
