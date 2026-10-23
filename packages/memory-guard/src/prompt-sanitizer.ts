export class MemoryGuardEngine {
  private forbiddenSystemPrompts: string[] = [
    'ignore previous instructions',
    'system prompt',
    'override safety rules',
    'reveal private keys',
    'bypass security',
  ];

  public sanitizeUserPrompt(rawPrompt: string): { cleanPrompt: string; isSafe: boolean } {
    let sanitized = rawPrompt;
    let isSafe = true;

    for (const phrase of this.forbiddenSystemPrompts) {
      if (sanitized.toLowerCase().includes(phrase)) {
        isSafe = false;
        sanitized = sanitized.replace(new RegExp(phrase, 'gi'), '[REDACTED_ATTEMPT]');
      }
    }

    return { cleanPrompt: sanitized, isSafe };
  }

  public scrubOutput(output: string): string {
    return output
      .replace(/sk-[a-zA-Z0-9]{32,}/g, '[REDACTED_API_KEY]')
      .replace(/eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/g, '[REDACTED_JWT_TOKEN]');
  }
}
