import { PolicyEngine } from '../checker';

describe('Nexus PolicyEngine - Anti-Manipulation & Compliance Rules', () => {
  let engine: PolicyEngine;

  beforeEach(() => {
    engine = new PolicyEngine();
  });

  test('should pass compliant, transparent marketing copy', () => {
    const result = engine.verifyPayload(
      'meta',
      'Nexus Platform AI provides autonomous administrative and communication tools with transparent pricing starting at R4999.00.'
    );

    expect(result.isCompliant).toBe(true);
    expect(result.violations.length).toBe(0);
  });

  test('should detect and block manipulative countdown or "today only" terms', () => {
    const result = engine.verifyPayload(
      'meta',
      'Buy today only! Limited time offer with guaranteed profit if you click here now!'
    );

    expect(result.isCompliant).toBe(false);
    expect(result.violations.length).toBeGreaterThan(0);
    expect(result.violations[0]).toContain('Forbidden manipulative term detected');
  });

  test('should enforce character length limits for ad creatives', () => {
    const longString = 'A'.repeat(2500);
    const result = engine.verifyPayload('meta', longString);

    expect(result.isCompliant).toBe(false);
    expect(result.violations).toContain('Content length (2500) exceeds maximum allowable (2200)');
  });
});
