export enum EViews {
    notFound = 0,
    generalCollection = 10,
    famousCollection = 11,
    likesCollection = 13,
    viewPalette = 20,
    editPalette = 21,
    createPalette = 22,
    about = 99,
}

export enum EPaletteActions {
    delete = 0,
    create = 1,
    update = 2,
}

export enum ToastTypeClass {
    default = '',
    info = 'info',
    success = 'success',
    warning = 'warning',
    error = 'error',
    critical = 'critical'
}