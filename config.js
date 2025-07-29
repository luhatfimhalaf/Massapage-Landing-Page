/**
 * Massapage.id Configuration
 * This file contains configuration for the website
 */

window.MASSAPAGE_CONFIG = {
    // Booklet configuration
    booklet: {
        url: 'https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/view'
    }
};

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MASSAPAGE_CONFIG;
}