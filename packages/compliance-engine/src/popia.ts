export interface PersonalDataPayload {
  dataSubjectId: string;
  name: string;
  email: string;
  consentGiven: boolean;
  timestamp: string;
}

export interface POPIAAuditRecord {
  auditId: string;
  dataSubjectId: string;
  lawfulBasis: 'CONSENT' | 'CONTRACT' | 'LEGAL_OBLIGATION';
  processedAt: string;
}

export class POPIAComplianceEngine {
  private auditLogs: POPIAAuditRecord[] = [];

  public processPersonalData(payload: PersonalDataPayload): { allowed: boolean; reason: string } {
    if (!payload.consentGiven) {
      return {
        allowed: false,
        reason: 'POPIA Section 11 Violation: Personal data processing requires explicit consent.',
      };
    }

    const log: POPIAAuditRecord = {
      auditId: `POPIA-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      dataSubjectId: payload.dataSubjectId,
      lawfulBasis: 'CONSENT',
      processedAt: new Date().toISOString(),
    };

    this.auditLogs.push(log);
    return { allowed: true, reason: 'Consent validated and audit trail logged successfully.' };
  }

  public handleDataSubjectDeletion(dataSubjectId: string): string {
    this.auditLogs = this.auditLogs.filter((log) => log.dataSubjectId !== dataSubjectId);
    return `Data subject ${dataSubjectId} records purged successfully under POPIA Section 24.`;
  }

  public getAuditTrail(): POPIAAuditRecord[] {
    return this.auditLogs;
  }
}
