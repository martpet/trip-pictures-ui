const ua = window.navigator.userAgent;
const iOS = ua.includes('iPad') || ua.includes('iPhone');
const webkit = ua.includes('WebKit');

export const isSafari = ua.includes('Safari') && !ua.includes('Chrome');
export const isMobileSafari = iOS && webkit && !ua.includes('CriOS');
