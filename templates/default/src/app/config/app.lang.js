//Language
import english_us from '../../i18n/lang/en-us';

/**
 * Language Configuration
 * @param $translateProvider
 */
export default function langConfig ($translateProvider, DEFAULT_LANG) {
    
    $translateProvider.translations('en_us', english_us)
        .fallbackLanguage(['en_us']);
    
    $translateProvider.preferredLanguage(DEFAULT_LANG);
    $translateProvider.useSanitizeValueStrategy('escape');
}

langConfig.$inject = ['$translateProvider', 'DEFAULT_LANG'];