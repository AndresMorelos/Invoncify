import * as Sentry from '@sentry/react';

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  actionTransformer: (action) => {
    if (
      action.payload &&
      action.payload.secretKey &&
      ![null, undefined].includes(action.payload.secretKey)
    ) {
      return {
        ...action,
        payload: {
          ...action.payload,
          secretKey: null,
        },
      };
    }

    if (action.payload && action.payload.current) {
      return {
        ...action,
        payload: {
          ...action.payload,
          current: {
            ...action.payload.current,
            invoice: {
              ...action.payload.current.invoice,
              payment: 'private',
              exportDir: 'private',
              tax: 'private',
            },
            profile: {
              ...action.payload.current.profile,
              address: 'private',
              email: 'private',
              fullname: 'private',
            },
          },
        },
      };
    }

    return action;
  },
  stateTransformer: (state) => {
    let transformedState = {
      ...state,
    };

    if (state.form) {
      transformedState = {
        ...transformedState,
        payment: 'private',
      };

      if (state.form.savedSettings) {
        transformedState = {
          ...transformedState,
          savedSettings: {
            ...state.form.savedSettings,
            payment: {
              ...state.form.savedSettings.payment,
              details: 'private',
            },
          },
        };
      }
    }

    if (state.payment) {
      transformedState = {
        ...transformedState,
        payment: {
          ...state.payment,
          details: 'private',
        },
      };
    }

    if (state.savedSettings) {
      transformedState = {
        ...transformedState,
        savedSettings: {
          ...state.savedSettings,
          payment: {
            ...state.savedSettings.payment,
            details: 'private',
          },
        },
      };
    }

    if (state.login) {
      transformedState = {
        ...transformedState,
        login: {
          ...state.login,
          secretKey: 'private',
        },
      };
    }

    if (state.settings && state.settings.current) {
      transformedState = {
        ...transformedState,
        settings: {
          ...state.settings,
          current: {
            ...state.settings.current,
            invoice: {
              ...state.settings.current.invoice,
              payment: {
                ...state.settings.current.invoice.payment,
                details: 'private',
              },
              exportDir: 'private',
              tax: {
                ...state.settings.current.invoice.tax,
                tin: 'private',
              },
            },
            profile: {
              ...state.settings.current.profile,
              address: 'private',
              email: 'private',
              fullname: 'private',
            },
          },
        },
      };
    }

    return transformedState;
  },
});

export default sentryReduxEnhancer;
