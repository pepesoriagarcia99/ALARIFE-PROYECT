export enum alertType {
    success = 'success',
    warning = 'warning',
    danger = 'danger',
    info = 'info',
};

export interface Alert {
    id: string;
    type: alertType;
    message: string;
}