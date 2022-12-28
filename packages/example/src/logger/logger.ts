import { withScope } from '@sentry/react';
import { getAppStore } from '../mobx';

type LoggerParam = {
  enableReport: boolean;
  infoConfig?: {
    report: (message: string) => void;
    enableInfoReport?: boolean;
  };
  warnConfig?: {
    report: (message: string) => void;
    enableWarnReport?: boolean;
  };
  errorConfig?: {
    report: (e: Error | string) => void;
    enableErrorReport?: boolean;
  };
};

export const generateLogger = ({
  enableReport,
  infoConfig,
  warnConfig,
  errorConfig
}: LoggerParam) => {
  return {
    info: (infoError: any) => {
      console.info(`**********  ${infoError}  **********`);
      const { report, enableInfoReport = false } = infoConfig || {};
      if (enableReport && enableInfoReport) {
        const message =
          infoError instanceof Error ? infoError.message : infoError;
        report && report(message);
      }
    },

    warn: (warnError: any) => {
      console.warn(`**********  ${warnError}  **********`);
      const { report, enableWarnReport = false } = warnConfig || {};
      if (enableReport && enableWarnReport) {
        const message =
          warnError instanceof Error ? warnError.message : warnError;
        report && report(message);
      }
    },

    error: (e: any) => {
      withScope((scope) => {
        console.info('[Error]: ', e);
        scope.setUser({ id: getAppStore().current?.mfp });
        const { report, enableErrorReport = true } = errorConfig || {};

        if (enableReport && enableErrorReport && !!report) {
          if (e instanceof Error) {
            report(e);
          } else if (e.error_message) {
            report(new Error(e.error_message));
          } else {
            report(new Error(e));
          }
        }
      });
    },
  };
};
