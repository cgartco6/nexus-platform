import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default function App() {
  const [isOwnerMode, setIsOwnerMode] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agents' | 'payments'>('dashboard');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nexus Platform AI</Text>
        <View style={styles.ownerBadge}>
          <Text style={styles.ownerText}>{isOwnerMode ? '👑 OWNER BYPASS ACTIVE' : 'Standard Tier'}</Text>
          <Switch value={isOwnerMode} onValueChange={setIsOwnerMode} trackColor={{ false: '#767577', true: '#10b981' }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {isOwnerMode && (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>Superuser Mode Enabled: All AI rate limits, subscriptions, and payment gates are bypassed.</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>System Status</Text>
          <Text style={styles.cardDetail}>• CyberGuard WAF: <Text style={{ color: '#10b981' }}>Active</Text></Text>
          <Text style={styles.cardDetail}>• POPIA Compliance Engine: <Text style={{ color: '#10b981' }}>Verified</Text></Text>
          <Text style={styles.cardDetail}>• WhatsApp AI Webhook: <Text style={{ color: '#10b981' }}>Listening</Text></Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Active AI Swarm Agents</Text>
          <Text style={styles.cardDetail}>1. Impulse Conversion Optimizer</Text>
          <Text style={styles.cardDetail}>2. Subscriber Growth Agent (58 today)</Text>
          <Text style={styles.cardDetail}>3. Roxy Dual-LLM Sales Assistant</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  headerTitle: { color: '#ffffff', fontSize: 20, fontWeight: 'bold' },
  ownerBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ownerText: { color: '#10b981', fontSize: 11, fontWeight: '600' },
  content: { padding: 16 },
  banner: { backgroundColor: '#065f46', padding: 12, borderRadius: 8, marginBottom: 16 },
  bannerText: { color: '#d1fae5', fontSize: 13, textAlign: 'center', fontWeight: '500' },
  card: { backgroundColor: '#1e293b', borderRadius: 12, padding: 16, marginBottom: 16 },
  cardTitle: { color: '#f8fafc', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  cardDetail: { color: '#94a3b8', fontSize: 14, marginBottom: 4 },
});
