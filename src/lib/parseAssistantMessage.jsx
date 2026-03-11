// utils/parseAssistantMessage.jsx
import React from 'react';
import { Typography } from '@/components/Typography';

/**
 * Parses assistant message text with markdown-like syntax into styled JSX.
 * Supports: **bold**, line breaks (\n), and numbered/bulleted lists.
 */
export const parseAssistantMessage = (text) => {
  if (!text) return null;

  // Split into lines first
  const lines = text.split('\n');

  return (
    <div className="flex flex-col gap-1">
      {lines.map((line, lineIndex) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={lineIndex} className="h-1" />;

        return (
          <Typography key={lineIndex} variant="body-sm" as="p" className="text-text-on-white-primary">
            {parseBold(trimmed)}
          </Typography>
        );
      })}
    </div>
  );
};

/**
 * Parses **bold** markers within a line of text into <strong> elements.
 */
const parseBold = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const content = part.slice(2, -2);
      return <strong key={i} className="font-semibold">{content}</strong>;
    }
    return part || null;
  });
};