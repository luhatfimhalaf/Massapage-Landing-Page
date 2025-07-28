// Massapage.id Configuration
// Update these values with your actual contact information

const MASSAPAGE_CONFIG = {
    // WhatsApp Configuration
    whatsapp: {
        // Replace with your actual WhatsApp number (format: country code + number without + sign)
        number: '62895804328400', // Massapage WhatsApp number
        
        // Default messages for different scenarios
        messages: {
            general: 'Halo Massapage.id! Saya tertarik untuk konsultasi mengenai layanan digital transformation. Mohon informasi lebih lanjut.',
            service: 'Halo Massapage.id! Saya tertarik dengan layanan yang Anda tawarkan. Saya ingin mengetahui lebih detail mengenai paket dan harga yang dapat disesuaikan dengan kebutuhan saya. Bisakah kita diskusikan?',
            consultation: 'Halo Massapage.id! Saya ingin konsultasi gratis mengenai kebutuhan digital transformation untuk bisnis saya. Kapan waktu yang tepat untuk berdiskusi?'
        }
    },
    
    // Booklet/Company Profile Configuration
    booklet: {
        // Replace with your actual Google Drive booklet URL
        // Format: https://drive.google.com/file/d/YOUR_FILE_ID/view
        url: 'https://drive.google.com/file/d/YOUR_BOOKLET_FILE_ID/view',
        
        // Alternative: You can also use direct download link
        // Format: https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
        // downloadUrl: 'https://drive.google.com/uc?export=download&id=YOUR_BOOKLET_FILE_ID'
    },
    
    // Analytics Configuration (optional)
    analytics: {
        // Set to true to enable tracking
        enabled: true,
        
        // Google Analytics ID (if you have one)
        googleAnalyticsId: '', // Example: 'GA_MEASUREMENT_ID'
        
        // Facebook Pixel ID (if you have one)
        facebookPixelId: '' // Example: 'YOUR_PIXEL_ID'
    }
};

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MASSAPAGE_CONFIG;
}