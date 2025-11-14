
import React, { useState, useCallback, useRef } from 'react';
import WidgetCard from './WidgetCard';
import { UploadIcon } from './icons/UploadIcon';
import { ShieldExclamationIcon } from './icons/ShieldExclamationIcon';
import { analyzeIpAsset } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface AnalysisResult {
    verdict: string;
    piScore: number;
    hash: string;
    reasoning: string;
}

const KindraaiGuardian: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleScan = useCallback(async () => {
    if (!file) {
      setError("Please select a file to scan.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const content = e.target?.result as string;
            const responseText = await analyzeIpAsset(file.name, content);
            const parsedResult = JSON.parse(responseText);
            setResult(parsedResult);
        } catch (err) {
            setError("Failed to parse analysis result. The response might not be valid JSON.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    reader.onerror = () => {
        setError("Failed to read the selected file.");
        setIsLoading(false);
    };
    reader.readAsText(file);

  }, [file]);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <WidgetCard title="Kindraai Guardian" icon={<ShieldExclamationIcon className="w-6 h-6" />}>
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        
        <button
          onClick={triggerFileSelect}
          className="w-full bg-cyan-900/50 border border-cyan-700 hover:bg-cyan-800/50 transition-colors duration-300 text-cyan-300 font-bold py-3 px-4 rounded-md flex items-center justify-center space-x-2"
        >
          <UploadIcon className="w-5 h-5" />
          <span>{file ? `Selected: ${file.name}` : 'Select IP Asset File'}</span>
        </button>

        <button
          onClick={handleScan}
          disabled={!file || isLoading}
          className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 text-black font-bold py-3 px-4 rounded-md flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Scanning...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5"/>
              <span>Scan with Kindraai</span>
            </>
          )}
        </button>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {result && (
          <div className={`w-full p-4 rounded-lg border ${result.verdict === 'SOVEREIGN' ? 'bg-green-900/30 border-green-500' : 'bg-yellow-900/30 border-yellow-500'}`}>
            <h3 className={`text-lg font-bold ${result.verdict === 'SOVEREIGN' ? 'text-green-300' : 'text-yellow-300'}`}>Verdict: {result.verdict}</h3>
            <p className="text-sm"><strong>PI Score:</strong> {result.piScore.toFixed(1)}%</p>
            <p className="text-sm font-mono truncate"><strong>Hash:</strong> {result.hash}...</p>
            <p className="mt-2 text-sm italic text-gray-300">"{result.reasoning}"</p>
          </div>
        )}
      </div>
    </WidgetCard>
  );
};

export default KindraaiGuardian;
