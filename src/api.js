export function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/spairparts')) {
        return '/spairparts';
    } else if (path.split('/').length > 2 && !path.includes('.html')) {
        return '/' + path.split('/')[1];
    }
    return '';
}

export const basePath = getBasePath();

export function api(path) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    
    // Normalize path to avoid double slashes
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    
    if (basePath) {
        return basePath + '/' + cleanPath;
    }
    return '/' + cleanPath;
}
