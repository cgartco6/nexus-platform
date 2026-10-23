export interface PaymentMethodConfig {
  id: string;
  name: string;
  category: 'ZAR_LOCAL' | 'GLOBAL';
  supportedBanks?: string[];
  isEnabled: boolean;
  credentials: Record<string, string>;
}

export interface PaymentRequest {
  amountZAR: number;
  currency: 'ZAR' | 'USD' | 'EUR';
  reference: string;
  customerEmail: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  redirectUrl?: string;
  instructions?: string;
}

export interface IPaymentGateway {
  config: PaymentMethodConfig;
  initialize(request: PaymentRequest): Promise<PaymentResponse>;
}

export class DirectEFTGateway implements IPaymentGateway {
  constructor(public config: PaymentMethodConfig) {}

  public async initialize(request: PaymentRequest): Promise<PaymentResponse> {
    if (!this.config.isEnabled) {
      throw new Error('Direct EFT payment method is currently disabled.');
    }

    return {
      success: true,
      instructions: `Please transfer R${request.amountZAR.toFixed(2)} to:\nBank: ${this.config.credentials.bankName || 'FNB'}\nAccount Number: ${this.config.credentials.accountNumber}\nBranch Code: ${this.config.credentials.branchCode}\nReference: ${request.reference}`,
      transactionId: `EFT-${Date.now()}-${request.reference}`,
    };
  }
}

export class OzowGateway implements IPaymentGateway {
  constructor(public config: PaymentMethodConfig) {}

  public async initialize(request: PaymentRequest): Promise<PaymentResponse> {
    if (!this.config.isEnabled) {
      throw new Error('Ozow gateway is currently disabled.');
    }

    return {
      success: true,
      redirectUrl: `https://pay.ozow.com/?siteCode=${this.config.credentials.siteCode}&amount=${request.amountZAR}&transactionReference=${request.reference}`,
      transactionId: `OZOW-${Date.now()}`,
    };
  }
}

export class GatewayRegistry {
  private gateways: Map<string, IPaymentGateway> = new Map();

  constructor() {
    this.registerDefaults();
  }

  private registerDefaults() {
    this.gateways.set('direct_eft', new DirectEFTGateway({
      id: 'direct_eft',
      name: 'Direct Bank EFT',
      category: 'ZAR_LOCAL',
      supportedBanks: ['FNB', 'African Bank', 'Standard Bank', 'ABSA', 'Nedbank'],
      isEnabled: true,
      credentials: { bankName: 'FNB', accountNumber: '62000000000', branchCode: '250655' }
    }));

    this.gateways.set('ozow', new OzowGateway({
      id: 'ozow',
      name: 'Ozow Instant EFT',
      category: 'ZAR_LOCAL',
      isEnabled: true,
      credentials: { apiKey: 'sample_ozow_key', siteCode: 'ZA-NEXUS-01' }
    }));
  }

  public toggleGateway(id: string, isEnabled: boolean): void {
    const gateway = this.gateways.get(id);
    if (gateway) {
      gateway.config.isEnabled = isEnabled;
    }
  }

  public async processPayment(gatewayId: string, request: PaymentRequest): Promise<PaymentResponse> {
    const gateway = this.gateways.get(gatewayId);
    if (!gateway) {
      throw new Error(`Gateway '${gatewayId}' is not registered.`);
    }
    if (!gateway.config.isEnabled) {
      throw new Error(`Gateway '${gatewayId}' is currently inactive.`);
    }
    return await gateway.initialize(request);
  }
}
