export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';

export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key;

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

export const enqueueSnackbarSimple = (message, variant) =>
    enqueueSnackbar({
        message: message,
        options: {
            variant: variant,
        },
    });

export const enqueueSnackbarSuccess = (message) => enqueueSnackbarSimple(message, 'success');
export const enqueueSnackbarWarning = (message) => enqueueSnackbarSimple(message, 'warning');
export const enqueueSnackbarError = (message) => enqueueSnackbarSimple(message, 'error');
export const enqueueSnackbarInfo = (message) => enqueueSnackbarSimple(message, 'info');


    export const closeSnackbar = key => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: REMOVE_SNACKBAR,
    key,
});
