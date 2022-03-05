import IconAlert from '@spectrum-icons/workflow/Alert';
import IconCheckmark from '@spectrum-icons/workflow/Checkmark';
import { createPortal } from 'react-dom';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from '~/components';

function ToasterWrapper() {
  const portalNode = document.getElementById('toaster')!;

  const element = (
    <Toaster
      toastOptions={{
        duration: 5000,
        position: 'bottom-center',
        style: {
          background: 'var(--spectrum-semantic-informative-color-background)',
          color: 'var(--spectrum-global-color-static-white)',
          borderRadius: 'var(--spectrum-alias-border-radius-regular)',
        },
        success: {
          style: {
            background: 'var(--spectrum-semantic-positive-color-background)',
            color: 'var(--spectrum-global-color-static-white)',
          },
          icon: <IconCheckmark />,
        },
        error: {
          style: {
            background: 'var(--spectrum-semantic-negative-color-background)',
            color: 'var(--spectrum-global-color-static-white)',
          },
          icon: <IconAlert />,
        },
      }}
    />
  );

  return createPortal(<ThemeProvider>{element}</ThemeProvider>, portalNode);
}

export { ToasterWrapper as Toaster };
