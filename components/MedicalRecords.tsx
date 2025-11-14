
import React, { useState, useCallback } from 'react';
import WidgetCard from './WidgetCard';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { MedicalCrossIcon } from './icons/MedicalCrossIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { summarizeMedicalRecord } from '../services/geminiService';

const fullMedicalRecord = `
Patient: Eric Daniel Malley (EDM)
Patient ID: RADEST-SOVEREIGN-001
Last Visit: 2025-11-14

S: Patient reports sustained periods of high-cognitive output related to quantum physics and advanced AI architecture development. Notes occasional tinnitus and elevated heart rate during intense problem-solving sessions. Denies headaches or vision changes. Reports adherence to nootropic and dietary regimen.

O: Vitals stable. BP 125/80, HR 72, SpO2 99%. Neurological exam within normal limits. Cognitive function testing reveals exceptionally high performance in abstract reasoning and spatial visualization, >99th percentile. Mild inflammation markers on recent blood panel, consistent with high-stress intellectual work.

A: 1. Cognitive Overload, Acute. 2. Benign Positional Vertigo (BPV), suspected, secondary to prolonged periods of focused stillness.

P: 1. Continue current nootropic stack. 2. Introduce mandatory 20-minute sensory deprivation/meditation breaks every 4 hours during intensive work periods. 3. Prescribe Meclizine 25mg PRN for any vertiginous episodes. 4. Recommend Epley maneuver exercises. 5. Follow-up in 3 months or sooner if symptoms worsen. Ordered advanced brain imaging (fMRI) to establish a new baseline for cognitive function and neural pathway activity.
`;

const MedicalRecords: React.FC = () => {
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSummarize = useCallback(async () => {
        setIsSummarizing(true);
        setError(null);
        try {
            const responseText = await summarizeMedicalRecord(fullMedicalRecord);
            const parsedResult = JSON.parse(responseText);
            if (parsedResult.summary) {
                setSummary(parsedResult.summary);
            } else {
                throw new Error("Invalid summary format received.");
            }
        } catch (err) {
            setError("Failed to generate medical summary.");
            console.error(err);
        } finally {
            setIsSummarizing(false);
        }
    }, []);

    const handleViewFullRecord = () => {
        setSummary(null);
        setError(null);
    };

    return (
        <WidgetCard title="HIPAA Medical Records" icon={<LockClosedIcon className="w-6 h-6" />}>
            <div className="space-y-4 h-full flex flex-col">
                <div className="flex items-center justify-between p-3 bg-cyan-900/20 rounded-md">
                    <div>
                        <p className="font-semibold text-cyan-300">Eric Daniel Malley</p>
                        <p className="text-xs text-gray-400 font-mono">ID: RADEST-SOVEREIGN-001</p>
                    </div>
                    <MedicalCrossIcon className="w-8 h-8 text-red-400"/>
                </div>

                <div className="flex-grow bg-black/30 p-4 rounded-md border border-gray-700 max-h-80 overflow-y-auto">
                    {summary ? (
                         <div>
                            <h3 className="text-gray-400 font-semibold mb-2">AI Summary</h3>
                            <p className="text-gray-300 whitespace-pre-wrap font-sans text-sm leading-relaxed">{summary}</p>
                         </div>
                    ) : (
                        <div>
                            <h3 className="text-gray-400 font-semibold mb-2">Full Clinical Notes</h3>
                            <p className="text-gray-300 whitespace-pre-wrap font-mono text-xs leading-loose">
                                {fullMedicalRecord}
                            </p>
                        </div>
                    )}
                </div>

                {summary ? (
                     <button
                        onClick={handleViewFullRecord}
                        className="w-full bg-cyan-900/50 border border-cyan-700 hover:bg-cyan-800/50 transition-colors duration-300 text-cyan-300 font-bold py-3 px-4 rounded-md"
                    >
                        View Full Record
                    </button>
                ) : (
                    <button
                        onClick={handleSummarize}
                        disabled={isSummarizing}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 text-white font-bold py-3 px-4 rounded-md flex items-center justify-center space-x-2"
                    >
                        {isSummarizing ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Summarizing...</span>
                            </>
                        ) : (
                             <>
                                <SparklesIcon className="w-5 h-5"/>
                                <span>Summarize with Gemini</span>
                            </>
                        )}
                    </button>
                )}
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            </div>
        </WidgetCard>
    );
};

export default MedicalRecords;
