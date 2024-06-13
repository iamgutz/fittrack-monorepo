import { type AnyAction } from 'redux';
import { AppDispatch } from '../app/store';

interface Config<T> {
    onStart: () => AnyAction;
    onSuccess: (data: T) => AnyAction;
    onError: (error: string) => AnyAction;
}

export const callApi = async <T>(
    apiFunction: () => Promise<T>,
    config: Config<T>,
    dispatch: AppDispatch,
) => {
    const { onStart, onSuccess, onError } = config;
    try {
        if (typeof onStart === 'function') {
            dispatch(onStart());
        }

        const response = await apiFunction();

        if (typeof onSuccess === 'function') {
            dispatch(onSuccess(response));
        }
    } catch (error: unknown) {
        if (typeof onError === 'function') {
            dispatch(onError(error as string));
        }
    }
};

export const callAsyncApi = async <T>(apiFunction: () => Promise<T>) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await apiFunction();
        return response;
    } catch (error: unknown) {
        throw error;
    }
};
