
/**
 * Utility functions for content security
 */

// URL regex for detecting links in text
const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;

/**
 * Checks if text contains URLs
 */
export const containsUrls = (text: string): boolean => {
  return URL_REGEX.test(text);
};

/**
 * Sanitizes text by removing URLs
 */
export const sanitizeText = (text: string): string => {
  return text.replace(URL_REGEX, '[URL bloqué]');
};

/**
 * Filter content based on user limitations
 * @param content The content to filter
 * @param isLimited Whether the user is limited
 */
export const filterContent = (content: string, isLimited: boolean): string => {
  if (!isLimited) return content;
  return sanitizeText(content);
};

/**
 * Check if content is allowed based on user limitations
 * @param content The content to check
 * @param isLimited Whether the user is limited
 */
export const isContentAllowed = (content: string, isLimited: boolean): boolean => {
  if (!isLimited) return true;
  return !containsUrls(content);
};

/**
 * Function to restrict external links in href attributes
 * for use with onClick handlers
 */
export const blockExternalLinks = (
  event: React.MouseEvent<HTMLAnchorElement>, 
  isLimited: boolean
): boolean => {
  if (!isLimited) return true;
  
  const href = (event.currentTarget as HTMLAnchorElement).href;
  // Check if link is external (not the current domain and has a protocol)
  const isExternal = !href.includes(window.location.hostname) && href.includes('://');
  
  if (isExternal) {
    event.preventDefault();
    alert("Vous n'êtes pas autorisé à accéder aux liens externes.");
    return false;
  }
  
  return true;
};
