import { useReducer, useState } from 'react';
import Box from '~/components/Box';
import { Button } from '~/components/Button';
import { TextBox } from '~/components/TextBox';
import Dropdown from '~/components/Dropdown';
import { showSuccess } from '~/global-contexts/toast';
import { put } from '~/utils/remote';
import { transformUser } from '~/utils/transformer';
import { TIMEZONE_OPTIONS } from '~/utils/timezones';
import { useProfilesStore } from '~/views/profiles/store';

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  timezone: string;
  origin: string;
  errors: {
    firstName?: string;
    lastName?: string;
  };
}

type FormAction = { type: 'SET_FIELD'; field: keyof FormState; value: string } | { type: 'RESET'; value: User };

function validateField(field: 'firstName' | 'lastName', value: string): string | undefined {
  if (!value || value.trim() === '') {
    return `${field === 'firstName' ? 'First name' : 'Last name'} is required`;
  }
  return undefined;
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      if (action.field === 'firstName' || action.field === 'lastName') {
        const error = validateField(action.field, action.value);
        return {
          ...state,
          [action.field]: action.value,
          errors: {
            ...state.errors,
            [action.field]: error,
          },
        };
      }
      return {
        ...state,
        [action.field]: action.value,
      };

    case 'RESET':
      return initFormData(action.value);

    default:
      return state;
  }
}

export default function Bio() {
  const [isSaving, setIsSaving] = useState(false);
  const { loggedInUser, setLoggedInUser } = useProfilesStore();
  const [state, dispatch] = useReducer(formReducer, initFormData(loggedInUser));

  const changed = `${state.firstName}${state.lastName}${state.role ?? ''}${state.department || ''}${state.timezone}` !== state.origin;

  const handleFieldChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_FIELD', field, value: e.target.value });
  };

  const handleReset = () => dispatch({ type: 'RESET', value: loggedInUser });

  const handleSave = async () => {
    if (state.errors.firstName || state.errors.lastName || isSaving) {
      return;
    }

    setIsSaving(true);
    const response = await put<UserResponse>('/profile', {
      user: {
        first_name: state.firstName,
        last_name: state.lastName,
        role: state.role,
        department: state.department,
        time_zone: state.timezone,
      },
    });
    setIsSaving(false);

    if (response.success) {
      const user = transformUser(response.data);
      dispatch({ type: 'RESET', value: user });
      setLoggedInUser(user);
      showSuccess('Profile updated successfully');
    }
  };

  return (
    <Box className="flex-1">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h2>
      <div className="space-y-4">
        <TextBox
          label="First name"
          value={state.firstName}
          onChange={handleFieldChange('firstName')}
          error={state.errors.firstName}
          required
          disabled={isSaving}
        />
        <TextBox
          label="Last name"
          value={state.lastName}
          onChange={handleFieldChange('lastName')}
          error={state.errors.lastName}
          disabled={isSaving}
          required
        />
        <TextBox label="Email" value={state.email} required disabled />
        <TextBox label="Role" value={state.role} onChange={handleFieldChange('role')} disabled={isSaving} />
        <TextBox
          label="Department"
          value={state.department}
          onChange={handleFieldChange('department')}
          disabled={isSaving}
        />
        <Dropdown
          label="Timezone"
          value={state.timezone}
          required
          onChange={(value) => dispatch({ type: 'SET_FIELD', field: 'timezone', value })}
          options={TIMEZONE_OPTIONS}
          disabled={isSaving}
        />

        <div className="flex items-center gap-4 mt-6">
          <Button
            variant="primary"
            className="w-20"
            disabled={!changed || isSaving}
            onClick={handleSave}
            loading={isSaving}>
            Save
          </Button>
          {changed && (
            <Button variant="outline" className="w-20" disabled={isSaving} loading={isSaving} onClick={handleReset}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
}

function initFormData(user: User): FormState {
  console.log('initFormData', user);
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role || '',
    department: user.department || '',
    origin: `${user.firstName}${user.lastName}${user.role ?? ''}${user.department || ''}${user.timezone}`,
    timezone: user.timezone,
    errors: {},
  };
}
