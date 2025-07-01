import type { DropdownOption } from '~/components/Dropdown';

// Common IANA timezone identifiers grouped by region
export const TIMEZONE_OPTIONS: DropdownOption[] = [
  // UTC
  { value: 'UTC', label: '(UTC+00:00) Coordinated Universal Time' },
  
  // Africa
  { value: 'Africa/Abidjan', label: '(UTC+00:00) Abidjan' },
  { value: 'Africa/Accra', label: '(UTC+00:00) Accra' },
  { value: 'Africa/Addis_Ababa', label: '(UTC+03:00) Addis Ababa' },
  { value: 'Africa/Algiers', label: '(UTC+01:00) Algiers' },
  { value: 'Africa/Cairo', label: '(UTC+02:00) Cairo' },
  { value: 'Africa/Casablanca', label: '(UTC+01:00) Casablanca' },
  { value: 'Africa/Johannesburg', label: '(UTC+02:00) Johannesburg' },
  { value: 'Africa/Lagos', label: '(UTC+01:00) Lagos' },
  { value: 'Africa/Nairobi', label: '(UTC+03:00) Nairobi' },
  
  // America - North America
  { value: 'America/New_York', label: '(UTC-05:00) New York (Eastern Time)' },
  { value: 'America/Chicago', label: '(UTC-06:00) Chicago (Central Time)' },
  { value: 'America/Denver', label: '(UTC-07:00) Denver (Mountain Time)' },
  { value: 'America/Los_Angeles', label: '(UTC-08:00) Los Angeles (Pacific Time)' },
  { value: 'America/Anchorage', label: '(UTC-09:00) Anchorage (Alaska Time)' },
  { value: 'America/Adak', label: '(UTC-10:00) Adak (Hawaii-Aleutian Time)' },
  { value: 'Pacific/Honolulu', label: '(UTC-10:00) Honolulu (Hawaii Time)' },
  
  // America - Canada
  { value: 'America/Toronto', label: '(UTC-05:00) Toronto (Eastern Time)' },
  { value: 'America/Winnipeg', label: '(UTC-06:00) Winnipeg (Central Time)' },
  { value: 'America/Edmonton', label: '(UTC-07:00) Edmonton (Mountain Time)' },
  { value: 'America/Vancouver', label: '(UTC-08:00) Vancouver (Pacific Time)' },
  { value: 'America/Halifax', label: '(UTC-04:00) Halifax (Atlantic Time)' },
  { value: 'America/St_Johns', label: '(UTC-03:30) St. Johns (Newfoundland Time)' },
  
  // America - Mexico
  { value: 'America/Mexico_City', label: '(UTC-06:00) Mexico City' },
  { value: 'America/Cancun', label: '(UTC-05:00) Cancun' },
  { value: 'America/Tijuana', label: '(UTC-08:00) Tijuana' },
  
  // America - Central/South America
  { value: 'America/Guatemala', label: '(UTC-06:00) Guatemala' },
  { value: 'America/Costa_Rica', label: '(UTC-06:00) Costa Rica' },
  { value: 'America/Panama', label: '(UTC-05:00) Panama' },
  { value: 'America/Bogota', label: '(UTC-05:00) Bogotá' },
  { value: 'America/Lima', label: '(UTC-05:00) Lima' },
  { value: 'America/Caracas', label: '(UTC-04:00) Caracas' },
  { value: 'America/Guyana', label: '(UTC-04:00) Georgetown' },
  { value: 'America/La_Paz', label: '(UTC-04:00) La Paz' },
  { value: 'America/Santiago', label: '(UTC-03:00) Santiago' },
  { value: 'America/Argentina/Buenos_Aires', label: '(UTC-03:00) Buenos Aires' },
  { value: 'America/Montevideo', label: '(UTC-03:00) Montevideo' },
  { value: 'America/Sao_Paulo', label: '(UTC-03:00) São Paulo' },
  { value: 'America/Fortaleza', label: '(UTC-03:00) Fortaleza' },
  { value: 'America/Manaus', label: '(UTC-04:00) Manaus' },
  
  // Asia - East Asia
  { value: 'Asia/Tokyo', label: '(UTC+09:00) Tokyo' },
  { value: 'Asia/Seoul', label: '(UTC+09:00) Seoul' },
  { value: 'Asia/Shanghai', label: '(UTC+08:00) Shanghai' },
  { value: 'Asia/Hong_Kong', label: '(UTC+08:00) Hong Kong' },
  { value: 'Asia/Taipei', label: '(UTC+08:00) Taipei' },
  { value: 'Asia/Singapore', label: '(UTC+08:00) Singapore' },
  { value: 'Asia/Kuala_Lumpur', label: '(UTC+08:00) Kuala Lumpur' },
  { value: 'Asia/Jakarta', label: '(UTC+07:00) Jakarta' },
  { value: 'Asia/Bangkok', label: '(UTC+07:00) Bangkok' },
  { value: 'Asia/Ho_Chi_Minh', label: '(UTC+07:00) Ho Chi Minh City' },
  { value: 'Asia/Manila', label: '(UTC+08:00) Manila' },
  
  // Asia - South Asia
  { value: 'Asia/Kolkata', label: '(UTC+05:30) Kolkata (India)' },
  { value: 'Asia/Colombo', label: '(UTC+05:30) Colombo' },
  { value: 'Asia/Dhaka', label: '(UTC+06:00) Dhaka' },
  { value: 'Asia/Kathmandu', label: '(UTC+05:45) Kathmandu' },
  { value: 'Asia/Karachi', label: '(UTC+05:00) Karachi' },
  
  // Asia - Central/West Asia
  { value: 'Asia/Dubai', label: '(UTC+04:00) Dubai' },
  { value: 'Asia/Qatar', label: '(UTC+03:00) Doha' },
  { value: 'Asia/Kuwait', label: '(UTC+03:00) Kuwait' },
  { value: 'Asia/Riyadh', label: '(UTC+03:00) Riyadh' },
  { value: 'Asia/Baghdad', label: '(UTC+03:00) Baghdad' },
  { value: 'Asia/Tehran', label: '(UTC+03:30) Tehran' },
  { value: 'Asia/Kabul', label: '(UTC+04:30) Kabul' },
  { value: 'Asia/Tashkent', label: '(UTC+05:00) Tashkent' },
  { value: 'Asia/Almaty', label: '(UTC+06:00) Almaty' },
  
  // Europe
  { value: 'Europe/London', label: '(UTC+00:00) London (GMT)' },
  { value: 'Europe/Dublin', label: '(UTC+00:00) Dublin' },
  { value: 'Europe/Lisbon', label: '(UTC+00:00) Lisbon' },
  { value: 'Europe/Madrid', label: '(UTC+01:00) Madrid' },
  { value: 'Europe/Paris', label: '(UTC+01:00) Paris' },
  { value: 'Europe/Brussels', label: '(UTC+01:00) Brussels' },
  { value: 'Europe/Amsterdam', label: '(UTC+01:00) Amsterdam' },
  { value: 'Europe/Berlin', label: '(UTC+01:00) Berlin' },
  { value: 'Europe/Zurich', label: '(UTC+01:00) Zurich' },
  { value: 'Europe/Rome', label: '(UTC+01:00) Rome' },
  { value: 'Europe/Vienna', label: '(UTC+01:00) Vienna' },
  { value: 'Europe/Prague', label: '(UTC+01:00) Prague' },
  { value: 'Europe/Warsaw', label: '(UTC+01:00) Warsaw' },
  { value: 'Europe/Budapest', label: '(UTC+01:00) Budapest' },
  { value: 'Europe/Stockholm', label: '(UTC+01:00) Stockholm' },
  { value: 'Europe/Oslo', label: '(UTC+01:00) Oslo' },
  { value: 'Europe/Copenhagen', label: '(UTC+01:00) Copenhagen' },
  { value: 'Europe/Helsinki', label: '(UTC+02:00) Helsinki' },
  { value: 'Europe/Athens', label: '(UTC+02:00) Athens' },
  { value: 'Europe/Istanbul', label: '(UTC+03:00) Istanbul' },
  { value: 'Europe/Kiev', label: '(UTC+02:00) Kiev' },
  { value: 'Europe/Moscow', label: '(UTC+03:00) Moscow' },
  
  // Australia/Oceania
  { value: 'Australia/Sydney', label: '(UTC+10:00) Sydney (AEST)' },
  { value: 'Australia/Melbourne', label: '(UTC+10:00) Melbourne' },
  { value: 'Australia/Brisbane', label: '(UTC+10:00) Brisbane' },
  { value: 'Australia/Perth', label: '(UTC+08:00) Perth' },
  { value: 'Australia/Adelaide', label: '(UTC+09:30) Adelaide' },
  { value: 'Australia/Darwin', label: '(UTC+09:30) Darwin' },
  { value: 'Australia/Hobart', label: '(UTC+10:00) Hobart' },
  { value: 'Pacific/Auckland', label: '(UTC+12:00) Auckland' },
  { value: 'Pacific/Fiji', label: '(UTC+12:00) Fiji' },
  { value: 'Pacific/Guam', label: '(UTC+10:00) Guam' },
  
  // Pacific Islands
  { value: 'Pacific/Tahiti', label: '(UTC-10:00) Tahiti' },
  { value: 'Pacific/Marquesas', label: '(UTC-09:30) Marquesas' },
  { value: 'Pacific/Gambier', label: '(UTC-09:00) Gambier' },
  { value: 'Pacific/Pitcairn', label: '(UTC-08:00) Pitcairn' },
  { value: 'Pacific/Easter', label: '(UTC-06:00) Easter Island' },
  { value: 'Pacific/Galapagos', label: '(UTC-06:00) Galápagos' },
].sort((a, b) => {
  // Extract UTC offset for sorting
  const getOffset = (label: string) => {
    const match = label.match(/UTC([+-]\d{2}:\d{2})/);
    if (!match) return 0;
    const [, offset] = match;
    const [hours, minutes] = offset.split(':');
    return parseInt(hours) * 60 + parseInt(minutes) * (hours.startsWith('-') ? -1 : 1);
  };
  
  return getOffset(a.label) - getOffset(b.label);
});

// Helper function to get user's current timezone
export function getCurrentTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}

// Helper function to find timezone option by value
export function findTimezoneOption(value: string): DropdownOption | undefined {
  return TIMEZONE_OPTIONS.find(option => option.value === value);
}
