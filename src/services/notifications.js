/**
 * Web Notification & Daily Reminder Service for KEPS Journal v2.0
 */

export const notificationService = {
  /**
   * Check if Notification API is supported
   */
  isSupported: () => {
    return 'Notification' in window;
  },

  /**
   * Get current permission state: 'default' | 'granted' | 'denied'
   */
  getPermission: () => {
    if (!notificationService.isSupported()) return 'denied';
    return Notification.permission;
  },

  /**
   * Request user permission for notifications
   */
  requestPermission: async () => {
    if (!notificationService.isSupported()) {
      return { success: false, reason: 'unsupported' };
    }

    try {
      const permission = await Notification.requestPermission();
      return { success: permission === 'granted', permission };
    } catch (err) {
      console.error('[KEPS Notification] Error requesting permission:', err);
      return { success: false, error: err };
    }
  },

  /**
   * Send an immediate test notification
   */
  sendTestNotification: () => {
    if (!notificationService.isSupported()) {
      alert('Browser Anda tidak mendukung Web Notification API.');
      return false;
    }

    if (Notification.permission !== 'granted') {
      notificationService.requestPermission().then(res => {
        if (res.success) {
          notificationService.triggerLocalNotification(
            '🔔 Uji Notifikasi KEPS Journal v2.0',
            'Pengingat harian aktif! Anda akan diingatkan jam 07:00 (Aksi Pagi) & 13:30 (Refleksi Siang).'
          );
        } else {
          alert('Izin notifikasi tidak diaktifkan.');
        }
      });
      return;
    }

    return notificationService.triggerLocalNotification(
      '🔔 Uji Notifikasi KEPS Journal v2.0',
      'Pengingat harian aktif! Anda akan diingatkan jam 07:00 (Aksi Pagi) & 13:30 (Refleksi Siang).'
    );
  },

  /**
   * Trigger local notification via Service Worker if available, or direct Notification
   */
  triggerLocalNotification: (title, body) => {
    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title, {
            body,
            icon: '/favicon.svg',
            badge: '/favicon.svg',
            vibrate: [100, 50, 100],
            data: { url: '/' }
          });
        });
        return true;
      }

      // Fallback to standard window Notification
      new Notification(title, {
        body,
        icon: '/favicon.svg'
      });
      return true;
    } catch (err) {
      console.error('[KEPS Notification] Trigger error:', err);
      return false;
    }
  },

  /**
   * Setup daily in-app reminder intervals
   */
  initDailyScheduler: () => {
    // Check every minute if current time matches 07:00 or 13:30
    setInterval(() => {
      if (Notification.permission !== 'granted') return;

      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const currentTime = `${hours}:${minutes}`;

      // Morning reminder: 07:00
      if (currentTime === '07:00' && now.getSeconds() < 10) {
        notificationService.triggerLocalNotification(
          '🌅 Pagi Pemimpin Berdampak!',
          'Cek Situasi Kepemimpinan & Aksi Nyata Hari Ini di KEPS Journal.'
        );
      }

      // Afternoon reflection reminder: 13:30
      if (currentTime === '13:30' && now.getSeconds() < 10) {
        notificationService.triggerLocalNotification(
          '📝 Waktunya Refleksi Kepemimpinan',
          'Tuliskan Keputusan, Aksi Nyata, dan Pelajaran Berharga Hari Ini di KEPS Journal.'
        );
      }
    }, 60000);
  }
};
