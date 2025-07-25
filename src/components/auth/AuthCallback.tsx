import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

interface AuthCallbackProps {
  onSuccess: () => void
  onError: (error: string) => void
}

export const AuthCallback = ({ onSuccess, onError }: AuthCallbackProps) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          onError(error.message)
          return
        }

        if (data.session) {
          console.log('✅ OAuth login successful')
          onSuccess()
        } else {
          onError('No session found')
        }
      } catch (err) {
        console.error('Unexpected error in auth callback:', err)
        onError('Authentication failed')
      } finally {
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [onSuccess, onError])

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px auto'
          }}></div>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Completing authentication...
          </p>
        </div>
      </div>
    )
  }

  return null
}

export default AuthCallback
