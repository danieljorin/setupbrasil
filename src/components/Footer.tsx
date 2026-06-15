import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #e5e7eb', background: '#f9fafb', marginTop: 'auto' }} className="dark:bg-gray-900 dark:border-gray-800">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: '#ff5722', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: 12 }}>SB</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 15 }}>SetupBrasil</span>
        </div>
        <p style={{ fontSize: 13, color: '#6b7280', textAlign: 'center' }}>
          Reviews e guias de setup gamer. Alguns links são de afiliados — sem custo extra pra você.
        </p>
        <Link href="/admin" style={{ fontSize: 12, color: '#9ca3af', textDecoration: 'none' }} className="hover:text-orange-500">
          Admin
        </Link>
      </div>
    </footer>
  )
}
