
/**
 * Execute a document command in the content editable area
 */
export const execCommand = (command: string, value: string | boolean = false) => {
  document.execCommand(command, false, value ? value.toString() : '');
};

/**
 * Strip HTML tags from content and return plain text
 */
export const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};
