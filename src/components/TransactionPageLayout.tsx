import React, { useState } from 'react';
import type { Transaction } from '../types/finance';

interface PageLayoutProps {
  title: string;
  transactions: Transaction[];
  onAdd: (name: string, amount: number) => void;
  onDelete: (id: string) => void;
  themeColor: 'green' | 'red';
}

export const TransactionPageLayout: React.FC<PageLayoutProps> = ({
  title, transactions, onAdd, onDelete, themeColor
}) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount || parseFloat(amount) <= 0) return;
    
    onAdd(name, parseFloat(amount));
    setName('');
    setAmount('');
  };

  const isGreen = themeColor === 'green';

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>{title}</h1>

      {/* Formulaire d'ajout simplifié */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', color: '#4b5563' }}>Description</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Salaire, Transport..."
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            required
          />
        </div>
        <div style={{ flex: '1', minWidth: '150px' }}>
          <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px', color: '#4b5563' }}>Montant</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Montant"
            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ padding: '9px 16px', backgroundColor: isGreen ? '#10b981' : '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Ajouter
        </button>
      </form>

      {/* Liste de l'historique */}
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '12px 20px', backgroundColor: '#f9fafb', borderBottom: '1px solid #f3f4f6', fontWeight: '600' }}>
          Historique des transactions
        </div>
        
        {transactions.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>Aucune transaction enregistrée.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
            {transactions.map((item) => (
              <li key={item.id} style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6' }}>
                <div>
                  <p style={{ margin: '0', fontWeight: '500' }}>{item.name}</p>
                  <small style={{ color: '#9ca3af' }}>{item.date}</small>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontWeight: 'bold', color: isGreen ? '#10b981' : '#ef4444' }}>
                    {isGreen ? '+' : '-'} {item.amount.toLocaleString()} FCFA
                  </span>
                  <button
                    onClick={() => onDelete(item.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};