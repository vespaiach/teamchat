export function cx(...name: unknown[]): string | undefined {
  return (
    name
      .filter(Boolean)
      .map((s) =>
        String(s)
          .trim()
          .replace(/\s+|\n/g, ' ')
      )
      .join(' ') || undefined
  );
}

export function generateRandomId() {
  return 'id-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36);
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return 'Email is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }

  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Password is required';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  // Check for at least one number and one letter
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);

  if (!hasNumber || !hasLetter) {
    return 'Password must contain both numbers and letters';
  }

  return null;
}

export function validateName(name: string, fieldName: string): string | null {
  if (!name.trim()) {
    return `${fieldName} is required`;
  }

  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }

  return null;
}

export function validateChannelName(name: string): string | null {
  const nameRef = /^[a-z0-9-]{1,30}$/;
  if (!name.trim()) {
    return 'Channel name is required';
  }

  if (!nameRef.test(name)) {
    return 'Channel name must be lowercase, without spaces or periods, and shorter than 30 characters';
  }

  return null;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
export function dateToMDY(date: Date): string {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}