import { Incomes } from './pages/Incomes'
import { useFinance } from './context/FinanceContext'

function App() {
  const { balance, totalIncome, totalExpense } = useFinance();

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ maxWidth: '800px', margin: '0 auto 30px auto', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        <div>
          <h3 style={{ margin: '0', color: '#4b5563', fontSize: '14px' }}>Total Revenus</h3>
          <p style={{ margin: '5px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>{totalIncome.toLocaleString()} FCFA</p>
        </div>
        <div style={{ borderLeft: '1px solid #e5e7eb', paddingLeft: '20px' }}>
          <h3 style={{ margin: '0', color: '#4b5563', fontSize: '14px' }}>Total Dépenses</h3>
          <p style={{ margin: '5px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#ef4444' }}>{totalExpense.toLocaleString()} FCFA</p>
        </div>
        <div style={{ borderLeft: '1px solid #e5e7eb', paddingLeft: '20px' }}>
          <h3 style={{ margin: '0', color: '#4b5563', fontSize: '14px' }}>Solde Global</h3>
          <p style={{ margin: '5px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: balance >= 0 ? '#10b981' : '#ef4444' }}>{balance.toLocaleString()} FCFA</p>
        </div>
      </div>

      <Incomes />
      
    </div>
  )
}

export default App