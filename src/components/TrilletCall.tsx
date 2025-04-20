import React, { useEffect, useState, useRef } from "react";
import { TrilletAgent } from "@trillet-ai/web-sdk";
import { TRILLET_CONFIG } from "../config";
import "./TrilletCall.css";

interface Transcript {
  role: "user" | "assistant";
  text: string;
  isFinal: boolean;
  timestamp: Date;
  participantId?: string;
  toolUsed?: {
    name: string;
    args?: any;
    status?: "pending" | "success" | "error";
  };
}

// Voice Call Component
const VoiceCall: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState<{
    [key: string]: string;
  }>({});
  const [audioStatus, setAudioStatus] = useState<string>("");
  const agentRef = useRef<TrilletAgent | null>(null);

  useEffect(() => {
    // Check if we have required configuration
    if (!TRILLET_CONFIG.WORKSPACE_ID || !TRILLET_CONFIG.AGENT_ID) {
      setError(
        "Workspace ID or Agent ID is missing. Please check your .env file"
      );
      return;
    }

    agentRef.current = new TrilletAgent({
      workspaceId: TRILLET_CONFIG.WORKSPACE_ID,
      agentId: TRILLET_CONFIG.AGENT_ID,
      mode: "voice", // Explicitly set voice mode
    });

    agentRef.current.on("connected", () => {
      console.log("Call connected successfully");
      setIsConnected(true);
      setError(null);
      setAudioStatus("Connected, initializing audio...");
    });

    agentRef.current.on("disconnected", () => {
      console.log("Call disconnected");
      setIsConnected(false);
      setAudioStatus("");
    });

    agentRef.current.on("error", (err) => {
      console.error("Call error:", err);
      setError(err.message || "An error occurred");
      setAudioStatus("Error with audio setup");
    });

    agentRef.current.on("assistantStartedSpeaking", () => {
      console.log("Assistant started speaking");
      setIsAssistantSpeaking(true);
      setAudioStatus("Ammi is speaking");
    });

    agentRef.current.on("assistantStoppedSpeaking", () => {
      console.log("Assistant stopped speaking");
      setIsAssistantSpeaking(false);
      setAudioStatus("Connected and ready");
    });

    // Add transcription handling
    agentRef.current.on("transcriptionReceived", (segments, participant) => {
      console.log("Transcription received:", segments, participant);
      if (agentRef.current) {
        setTranscripts(agentRef.current.getTranscripts());
        setCurrentTranscript(agentRef.current.getCurrentTranscript());
      }
    });

    // Add audio data logging
    agentRef.current.on("audioData", (data: Float32Array) => {
      const volume = Math.max(...Array.from(data).map(Math.abs));
      if (volume > 0.01) {
        // Only log when there's significant audio
        console.log("Audio data received, volume:", volume);
      }
    });

    return () => {
      if (agentRef.current) {
        console.log("Cleaning up call");
        agentRef.current.endCall();
      }
    };
  }, []);

  const handleConnect = async () => {
    try {
      setError(null);
      setAudioStatus("Checking audio permissions...");
      console.log("Starting call...");

      // Check audio permissions before starting call
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });

        // Log audio tracks info
        stream.getAudioTracks().forEach((track) => {
          console.log("Audio track:", {
            label: track.label,
            enabled: track.enabled,
            muted: track.muted,
            readyState: track.readyState,
            constraints: track.getConstraints(),
          });
        });

        stream.getTracks().forEach((track) => track.stop()); // Clean up the test stream
        setAudioStatus("Audio permissions granted, connecting...");
      } catch (err) {
        console.error("Audio permission error:", err);
        throw new Error(
          "Microphone access is required. Please enable it in your browser settings."
        );
      }

      setAudioStatus("Starting call...");
      await agentRef.current?.startPublicCall();
    } catch (error) {
      console.error("Failed to connect call:", error);
      setError(error instanceof Error ? error.message : "Failed to connect");
      setAudioStatus("Failed to initialize audio");
    }
  };

  const handleDisconnect = () => {
    console.log("Ending call...");
    agentRef.current?.endCall();
    setAudioStatus("");
  };

  const toggleMute = () => {
    const newMuteState = !isMuted;
    console.log(`${newMuteState ? "Muting" : "Unmuting"} microphone`);
    agentRef.current?.toggleMicrophone(!newMuteState);
    setIsMuted(newMuteState);
    setAudioStatus(newMuteState ? "Microphone muted" : "Microphone active");
  };

  return (
    <div className="call-container">
      <div className="transcripts-container">
        {transcripts.map((transcript, index) => (
          <div key={index} className={`transcript ${transcript.role}`}>
            <div className="transcript-header">
              <span className="role">
                {transcript.role === "assistant" ? "👵 Ammi" : "👤 You"}
              </span>
              <span className="time">
                {new Date(transcript.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <div className="message">{transcript.text}</div>
            {transcript.toolUsed && (
              <div className="tool-used">
                <span className="tool-name">🔧 {transcript.toolUsed.name}</span>
                {transcript.toolUsed.args && (
                  <span className="tool-args">{transcript.toolUsed.args}</span>
                )}
              </div>
            )}
          </div>
        ))}
        {Object.entries(currentTranscript).map(([participantId, text]) => (
          <div key={participantId} className="transcript interim">
            <div className="message">{text}</div>
          </div>
        ))}
      </div>

      <div className="call-controls">
        {!isConnected ? (
          <button
            onClick={handleConnect}
            className="start-call-btn"
            disabled={!!error}
          >
            <span>📞</span> Start Call with Ammi
          </button>
        ) : (
          <>
            <button
              onClick={toggleMute}
              className={`mute-btn ${isMuted ? "muted" : ""}`}
            >
              <span>{isMuted ? "🔇" : "🎙️"}</span>
              {isMuted ? "Unmute" : "Mute"}
            </button>
            <button onClick={handleDisconnect} className="end-call-btn">
              <span>📴</span> End Call
            </button>
          </>
        )}
      </div>

      {audioStatus && (
        <div className="audio-status">
          <span>🎤 {audioStatus}</span>
        </div>
      )}

      {isAssistantSpeaking && (
        <div className="status-indicators">
          <div className="assistant-speaking">
            <span>🎙️ Ammi is speaking...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Main component with updated heading and postpartum description
const TrilletCall: React.FC = () => {
  return (
    <div className="trillet-call">
      <div className="ammi-header">
        <div className="logo-container">
          <span className="logo-icon">💗</span>
        </div>
        <h1 className="ammi-title">Ammi's Voice</h1>
        <h2 className="ammi-subtitle">Postpartum Support Companion</h2>
        <p className="ammi-description">
          Your trusted companion during the challenging postpartum journey. Ammi
          provides emotional support, practical advice, and a listening ear when
          you need it most. Whether you're feeling overwhelmed, have questions
          about baby care, or just need someone to talk to about your postpartum
          experience - Ammi is here for you 24/7, with warmth and without
          judgment.
        </p>
        <div className="ammi-features">
          <div className="feature">
            <span className="feature-icon">🌙</span>
            <span>Emotional Support</span>
          </div>
          <div className="feature">
            <span className="feature-icon">👶</span>
            <span>Parenting Tips</span>
          </div>
          <div className="feature">
            <span className="feature-icon">💭</span>
            <span>Mindfulness Guidance</span>
          </div>
        </div>
      </div>
      <div className="call-status-indicator">
        <div className="status-dot"></div>
        <span>Ready to support you on your postpartum journey</span>
      </div>
      <VoiceCall />
    </div>
  );
};

export default TrilletCall;
