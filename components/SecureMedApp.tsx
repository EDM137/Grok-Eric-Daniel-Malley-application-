import React from 'react';
import WidgetCard from './WidgetCard';
import { HeartIcon } from './icons/HeartIcon';
import { MedicalCrossIcon } from './icons/MedicalCrossIcon';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';

const SecureMedApp: React.FC<{color?: 'amber'}> = ({ color = 'amber' }) => {
  return (
    <WidgetCard title="Secure Med App" icon={<HeartIcon className="w-6 h-6" />} color={color}>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-amber-900/20 rounded-md border border-amber-500/20">
            <div>
                <p className="font-semibold text-amber-300">Eric Daniel Malley</p>
                <p className="text-xs text-gray-400 font-mono">ID: RADEST-SOVEREIGN-001</p>
            </div>
            <p className="text-xs text-green-300 font-bold border border-green-300/50 rounded-full px-2 py-1">ENCRYPTED</p>
        </div>
        
        <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Real-Time Vitals</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-black/30 p-2 rounded-md">
                    <p className="text-xs text-gray-400">Heart Rate</p>
                    <p className="text-xl font-bold text-red-400">72 <span className="text-sm">bpm</span></p>
                </div>
                 <div className="bg-black/30 p-2 rounded-md">
                    <p className="text-xs text-gray-400">Blood Pressure</p>
                    <p className="text-xl font-bold text-cyan-300">125/80</p>
                </div>
                 <div className="bg-black/30 p-2 rounded-md">
                    <p className="text-xs text-gray-400">SpO2</p>
                    <p className="text-xl font-bold text-indigo-400">99<span className="text-sm">%</span></p>
                </div>
            </div>
        </div>

        <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Upcoming Appointments</h3>
            <div className="p-3 bg-amber-900/20 rounded-md flex items-center justify-between border border-amber-500/20">
                 <div className="flex items-center space-x-3">
                    <MedicalCrossIcon className="w-6 h-6 text-red-400" />
                    <div>
                        <p className="font-semibold text-sm">Neurology Follow-up (fMRI Baseline)</p>
                        <p className="text-xs text-gray-400">Dr. Anya Sharma | 2026-02-10 14:00</p>
                    </div>
                </div>
                 <button className="text-xs bg-indigo-600/50 hover:bg-indigo-500/50 text-indigo-200 rounded-md px-3 py-1 transition-colors">
                    Details
                </button>
            </div>
        </div>

         <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Secure Messages</h3>
            <button className="w-full bg-amber-600/20 border border-amber-500 hover:bg-amber-500/30 transition-colors duration-300 text-amber-300 font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2">
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span>Open Secure Patient Portal</span>
            </button>
        </div>

      </div>
    </WidgetCard>
  );
};

export default SecureMedApp;