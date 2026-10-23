'use client';

import React, { useState } from 'react';

type UserRole = 'CLIENT' | 'ADMIN' | 'OWNER';

export default function SecureDashboard() {
  const [currentUserEmail, setCurrentUserEmail] = useState('owner@nexus-platform.co.za');
  const [currentRole, setCurrentRole] = useState<UserRole>('OWNER');

  const [gateways, setGateways] = useState([
    { id: 'direct_eft', name: 'Direct Bank EFT (FNB / African Bank)', enabled: true },
    { id: 'ozow', name: 'Ozow Instant EFT', enabled: true },
    { id: 'stitch', name: 'Stitch Open Banking', enabled: true },
    { id: 'stripe', name: 'Stripe Global', enabled: true },
  ]);

  const toggleGateway = (id: string) => {
    if (currentRole !== 'OWNER' && currentRole !== 'ADMIN') return;
    setGateways(prev => prev.map(g => g.id === id ? { ...g, enabled: !g.enabled } : g));
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b', padding: '1rem 1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.25rem', margin: 0 }}>Nexus Platform Control Center</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Active View Role:</span>
          {(['CLIENT', 'ADMIN', 'OWNER'] as UserRole[]).map(role => (
            <button
              key={role}
              onClick={() => {
                setCurrentRole(role);
                if (role === 'OWNER') setCurrentUserEmail('owner@nexus-platform.co.za');
                if (role === 'ADMIN') setCurrentUserEmail('admin@nexus-platform.co.za');
                if (role === 'CLIENT') setCurrentUserEmail('client@business.co.za');
              }}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                background: currentRole === role ? '#2563eb' : '#334155',
                color: '#fff',
              }}
            >
              {role}
            </button>
          ))}
        </div>
      </nav>

      {currentRole === 'CLIENT' && (
        <section>
          <h2>Client Portal</h2>
          <p style={{ color: '#94a3b8' }}>Welcome back, {currentUserEmail}. Manage your active subscriptions and support requests.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px' }}>
              <h3>My Active Products</h3>
              <p>• Nexus Platform AI Core (Enterprise SA Edition)</p>
              <p>• Roxy Sales Assistant Integration</p>
            </div>
            <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px' }}>
              <h3>Support & WhatsApp AI</h3>
              <p>Status: <span style={{ color: '#10b981' }}>Connected (24/7 Active)</span></p>
              <button style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Open Roxy Chat</button>
            </div>
          </div>
        </section>
      )}

      {currentRole === 'ADMIN' && (
        <section>
          <h2>Administrative Dashboard</h2>
          <p style={{ color: '#94a3b8' }}>Monitoring system health, agent swarms, and human-in-the-loop queues.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px' }}>
              <h3>CyberGuard WAF</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>14 Threats Blocked</p>
            </div>
            <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px' }}>
              <h3>Subscriber Growth</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8' }}>58 New Today</p>
            </div>
            <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px' }}>
              <h3>POPIA Audit Logs</h3>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>100% Compliant</p>
            </div>
          </div>
        </section>
      )}

      {currentRole === 'OWNER' && (
        <section>
          <div style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 100%)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <h2 style={{ margin: 0, color: '#d1fae5' }}>👑 Owner Superuser Control Panel</h2>
            <p style={{ margin: '0.5rem 0 0 0', color: '#a7f3d0' }}>Unconditional bypass active for {currentUserEmail}. All tier limits, paywalls, and rate restrictions are disabled.</p>
          </div>

          <h2>Payment Gateway Master Switchboard</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Enable, disable, or reconfigure South African and global payment processors in real time.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
            {gateways.map(gw => (
              <div key={gw.id} style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{gw.name}</h4>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: gw.enabled ? '#10b981' : '#ef4444' }}>
                    {gw.enabled ? 'Active & Processing' : 'Gateway Disabled'}
                  </p>
                </div>
                <button
                  onClick={() => toggleGateway(gw.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: gw.enabled ? '#dc2626' : '#16a34a',
                    color: '#fff',
                  }}
                >
                  {gw.enabled ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
