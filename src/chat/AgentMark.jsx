import { useSyncExternalStore } from 'react';
import { createMemoryPreference } from '../browser/memoryPreference.js';
import { AgentOrb } from './AgentOrb.jsx';

import { RobotGlyph } from './RobotGlyph.jsx';
import './AgentMark.css';

const idle = () => 'breathing';
const preference = createMemoryPreference(idle());

export function useAgentMark() {
  const shape = useSyncExternalStore(preference.subscribe, preference.get, idle);
  return { shape, choose: preference.set };
}

export function AgentMark({ size, color, selected }) {
  return (
    <span className="agent-robot-mark" data-selected={selected} aria-hidden="true">
      <RobotGlyph size={size} color={color} />
    </span>
  );
}

export function WelcomeOrb({ size }) {
  const shape = useSyncExternalStore(preference.subscribe, preference.get, idle);
  return (
    <span className="agent-orb-mark">
      <AgentOrb size={size} state={shape} label="Agent" animate />
    </span>
  );
}
