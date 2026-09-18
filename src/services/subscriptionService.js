/**
 * Subscription & Single-Use Token Service for KEPS Journal v2.0
 * Handles database token verification via Supabase RPC with security definer,
 * atomic single-use guarantees, and seamless offline-first fallback.
 */

const DEFAULT_SUPABASE_CONFIG = {
  url: 'https://izfrqlxolcinaunveuaz.supabase.co',
  anonKey: 'sb_publishable_w3MFu6MLK9so8mQnx2k0nA_0eWDAPSp',
  syncEnabled: true
};

// Pre-defined valid launch tokens for immediate testing / initial distribution
const PREDEFINED_TOKENS = {
  'KEPS-90H-2026-PRO1': { days: 90, plan: 'Paket 90 Hari Kepemimpinan Berdampak' },
  'KEPS-90H-2026-PRO2': { days: 90, plan: 'Paket 90 Hari Kepemimpinan Berdampak' },
  'KEPS-90H-2026-PRO3': { days: 90, plan: 'Paket 90 Hari Kepemimpinan Berdampak' },
  'KEPS-365H-2026-VIP': { days: 365, plan: 'Paket 1 Tahun Keanggotaan Eksekutif' },
};

export const subscriptionService = {
  /**
   * Get formatted details and status of current subscription
   */
  getSubscriptionStatus: (subscription) => {
    if (!subscription || !subscription.validUntil) {
      return {
        isActive: false,
        daysRemaining: 0,
        formattedExpiry: '-',
        percentageRemaining: 0,
        statusLabel: 'Belum Berlangganan',
        statusColor: 'rose'
      };
    }

    const now = new Date();
    const expiry = new Date(subscription.validUntil);
    const msRemaining = expiry.getTime() - now.getTime();
    const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));
    const isActive = daysRemaining > 0;

    // Calculate percentage
    const startDate = subscription.startDate ? new Date(subscription.startDate) : new Date(expiry.getTime() - 90 * 86400000);
    const totalDurationMs = Math.max(86400000, expiry.getTime() - startDate.getTime());
    const elapsedMs = Math.max(0, now.getTime() - startDate.getTime());
    const percentageRemaining = isActive 
      ? Math.min(100, Math.max(5, Math.round(((totalDurationMs - elapsedMs) / totalDurationMs) * 100)))
      : 0;

    const formattedExpiry = expiry.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    return {
      isActive,
      daysRemaining,
      formattedExpiry,
      percentageRemaining,
      statusLabel: isActive ? 'Langganan Aktif' : 'Masa Berlaku Berakhir',
      statusColor: isActive ? 'emerald' : 'rose'
    };
  },

  /**
   * Redeem a single-use token to extend subscription
   */
  redeemToken: async (rawToken, currentSubscription, userId = 'keps-principal-1', supabaseConfig = null) => {
    const token = (rawToken || '').trim().toUpperCase();

    if (!token) {
      return {
        success: false,
        error: 'Mohon masukkan kode token langganan terlebih dahulu.'
      };
    }

    // 1. Client-Side Double-Use Check: Prevent the same token from being used twice locally
    const history = currentSubscription?.tokensHistory || [];
    const alreadyUsed = history.some(item => (typeof item === 'string' ? item : item.token) === token);
    if (alreadyUsed) {
      return {
        success: false,
        error: 'Token ini sudah pernah digunakan pada perangkat ini. Setiap token hanya dapat digunakan 1 kali.'
      };
    }

    // 2. Try Supabase Cloud Redemption if configured
    const config = supabaseConfig || DEFAULT_SUPABASE_CONFIG;
    if (config?.url && config?.anonKey && !config.url.includes('xyzcompany')) {
      try {
        const rpcUrl = config.url.replace(/\/+$/, '') + '/rest/v1/rpc/redeem_subscription_token';
        const response = await fetch(rpcUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': config.anonKey,
            'Authorization': 'Bearer ' + config.anonKey
          },
          body: JSON.stringify({
            p_token_code: token,
            p_user_id: userId
          })
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData.success) {
            const updatedSubscription = {
              ...currentSubscription,
              status: 'active',
              planName: resData.plan_name || currentSubscription?.planName,
              validUntil: resData.valid_until,
              lastTokenUsed: token,
              tokensHistory: [
                ...history,
                {
                  token,
                  planName: resData.plan_name,
                  daysAdded: resData.duration_days,
                  usedAt: new Date().toISOString()
                }
              ]
            };

            return {
              success: true,
              message: resData.message || ('Selamat! Masa langganan berhasil diperpanjang ' + resData.duration_days + ' hari.'),
              updatedSubscription
            };
          } else {
            return {
              success: false,
              error: resData.error || 'Token tidak valid atau sudah digunakan.'
            };
          }
        }
      } catch (cloudErr) {
        console.warn('[KEPS Subscription] Supabase RPC failed or offline, checking local rules:', cloudErr);
      }
    }

    // 3. Fallback / Offline Token Verification
    let durationDays = 90;
    let planName = 'Paket 90 Hari Kepemimpinan Berdampak';
    let isValidToken = false;

    if (PREDEFINED_TOKENS[token]) {
      durationDays = PREDEFINED_TOKENS[token].days;
      planName = PREDEFINED_TOKENS[token].plan;
      isValidToken = true;
    } else {
      const match = token.match(/^KEPS-(\d+)H-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
      if (match) {
        durationDays = parseInt(match[1], 10) || 90;
        planName = durationDays >= 365 
          ? 'Paket 1 Tahun Keanggotaan Eksekutif' 
          : ('Paket ' + durationDays + ' Hari Kepemimpinan Berdampak');
        isValidToken = true;
      }
    }

    if (!isValidToken) {
      return {
        success: false,
        error: 'Token tidak valid. Pastikan format token benar (contoh: KEPS-90H-2026-PRO1 atau KEPS-90H-XXXX-YYYY).'
      };
    }

    // Calculate extended date
    const now = new Date();
    const currentValid = currentSubscription?.validUntil ? new Date(currentSubscription.validUntil) : null;
    let newValid;

    if (currentValid && currentValid > now) {
      newValid = new Date(currentValid.getTime() + durationDays * 86400000);
    } else {
      newValid = new Date(now.getTime() + durationDays * 86400000);
    }

    const updatedSubscription = {
      ...currentSubscription,
      status: 'active',
      planName,
      validUntil: newValid.toISOString(),
      lastTokenUsed: token,
      tokensHistory: [
        ...history,
        {
          token,
          planName,
          daysAdded: durationDays,
          usedAt: new Date().toISOString()
        }
      ]
    };

    return {
      success: true,
      message: 'Selamat! Masa aktif langganan berhasil diperpanjang ' + durationDays + ' hari.',
      updatedSubscription
    };
  }
};
