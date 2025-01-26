import React, { useEffect, useState, useRef } from 'react';
import { TrilletAgent } from '@trillet-ai/web-sdk';
import { TRILLET_CONFIG } from '../config';
import './TrilletCall.css';

const TrilletCall: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const agentRef = useRef<TrilletAgent | null>(null);

  useEffect(() => {
    agentRef.current = new TrilletAgent({
      apiKey: TRILLET_CONFIG.API_KEY,
      workspaceId: TRILLET_CONFIG.WORKSPACE_ID,
      agentId: TRILLET_CONFIG.AGENT_ID
    });
    
    agentRef.current.on('connected', () => setIsConnected(true));
    agentRef.current.on('disconnected', () => setIsConnected(false));
    agentRef.current.on('assistantStartedSpeaking', () => setIsAssistantSpeaking(true));
    agentRef.current.on('assistantStoppedSpeaking', () => setIsAssistantSpeaking(false));

    return () => {
      agentRef.current?.endCall();
    };
  }, []);

  const handleConnect = async () => {
    try {
      await agentRef.current?.startCall();
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDisconnect = () => {
    agentRef.current?.endCall();
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    agentRef.current?.toggleMicrophone(!newMuteState);
    setIsMuted(newMuteState);
  };

  return (
    <div className="trillet-call">
      <div className="call-container">
        <div className="example-title">Trillet AI Web Agent Example</div>
        <div className="call-status">
          <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`} />
          {isConnected ? 'Connected to Agent' : 'Ready to Connect'}
        </div>
        
        {isAssistantSpeaking && (
          <div className="status-indicators">
            <div className="assistant-speaking">
              <span>🎙️ Agent is speaking...</span>
            </div>
          </div>
        )}

        <div className="controls">
          {!isConnected ? (
            <button onClick={handleConnect} className="connect-btn">
              <span>📞</span> Start Call
            </button>
          ) : (
            <>
              <button onClick={toggleMute} className={`mute-btn ${isMuted ? 'muted' : ''}`}>
                <span>{isMuted ? '🔇' : '🎙️'}</span>
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
              <button onClick={handleDisconnect} className="disconnect-btn">
                <span>📴</span> End Call
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrilletCall; 