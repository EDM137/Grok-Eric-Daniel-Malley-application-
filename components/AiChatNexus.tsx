
import React, { useState, useRef, useEffect } from 'react';
import WidgetCard from './WidgetCard';
import { ChatBubbleLeftRightIcon } from './icons/ChatBubbleLeftRightIcon';
import { PaperAirplaneIcon } from './icons/PaperAirplaneIcon';
import { getMultiAiResponse } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

type Sender = 'User' | 'Gemini' | 'Copilot' | 'Grok' | 'ChatGPT';
interface Message {
    sender: Sender;
    text: string;
}

const AiChatNexus: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'Gemini', text: 'Welcome to the AI Nexus, Eric. All systems are online. How can we collaborate to advance your sovereign objectives today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'User', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const responseText = await getMultiAiResponse(input);
            const parsedResult = JSON.parse(responseText);
            
            if (parsedResult.responses && Array.isArray(parsedResult.responses)) {
                for (let i = 0; i < parsedResult.responses.length; i++) {
                    const res = parsedResult.responses[i];
                    // Add a delay for each AI response to make it feel more like a conversation
                    await new Promise(resolve => setTimeout(resolve, 700));
                    setMessages(prev => [...prev, { sender: res.sender, text: res.text }]);
                }
            } else {
                 throw new Error("Invalid response structure from AI.");
            }
        } catch (error) {
            console.error("Failed to get AI response:", error);
            const errorMessage: Message = { sender: 'Gemini', text: 'There was an error communicating with the AI collective. Please check the API connection.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const getSenderStyles = (sender: Sender): { bubble: string; label: string; iconColor: string } => {
        switch (sender) {
            case 'User': return { bubble: 'bg-indigo-600 self-end', label: 'You', iconColor: 'text-indigo-300' };
            case 'Gemini': return { bubble: 'bg-cyan-800/70 self-start', label: 'Gemini', iconColor: 'text-cyan-300' };
            case 'Copilot': return { bubble: 'bg-gray-700/70 self-start', label: 'Copilot', iconColor: 'text-gray-300' };
            case 'Grok': return { bubble: 'bg-purple-800/70 self-start', label: 'Grok', iconColor: 'text-purple-300' };
            case 'ChatGPT': return { bubble: 'bg-green-800/70 self-start', label: 'ChatGPT', iconColor: 'text-green-300' };
            default: return { bubble: 'bg-gray-800 self-start', label: 'System', iconColor: 'text-gray-400' };
        }
    };


    return (
        <WidgetCard title="AI Chat Nexus" icon={<ChatBubbleLeftRightIcon className="w-6 h-6" />}>
            <div className="flex flex-col h-[60vh] max-h-[700px]">
                <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-black/30 rounded-t-md border border-b-0 border-gray-700">
                    {messages.map((msg, index) => {
                        const styles = getSenderStyles(msg.sender);
                        const isUser = msg.sender === 'User';
                        return (
                             <div key={index} className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                                <div className="flex items-center gap-2">
                                     {!isUser && <SparklesIcon className={`w-4 h-4 ${styles.iconColor}`} />}
                                     <span className={`text-xs font-semibold ${styles.iconColor}`}>{styles.label}</span>
                                </div>
                                <div className={`mt-1 p-3 rounded-lg max-w-lg text-white ${styles.bubble}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                             </div>
                        );
                    })}
                     {isLoading && (
                        <div className="flex items-start">
                             <div className="flex items-center gap-2">
                                <SparklesIcon className="w-4 h-4 text-gray-400" />
                                <span className="text-xs font-semibold text-gray-400">AI Collective is thinking...</span>
                            </div>
                            <div className="mt-1 p-3 rounded-lg max-w-lg bg-gray-700/50 animate-pulse">
                               <div className="h-2 bg-gray-600 rounded-full w-24"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border border-t-0 border-gray-700 rounded-b-md bg-gray-800/50">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Message the AI Collective..."
                            disabled={isLoading}
                            className="flex-grow bg-gray-900 border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-white font-bold p-2 rounded-md"
                            aria-label="Send message"
                        >
                           <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </div>
                </form>
            </div>
        </WidgetCard>
    );
};

export default AiChatNexus;
