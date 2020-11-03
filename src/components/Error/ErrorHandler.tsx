import React, { useEffect } from 'react';
import Toaster from 'components/Toaster/Toaster';

interface ErrorHandlerProps {
  error: string | undefined;
}

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error }) => {

  useEffect(() => {
    if (error !== undefined) {
      Toaster.alert({
        title: 'Error', message: error, hideAfter: 7000
      })
    }
  }, [error])

  return null
}

export default ErrorHandler;