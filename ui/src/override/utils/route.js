
let _root = null
const root = () => {
    if(_root === null) {
        _root = (import.meta.env.VITE_APP_API_URL || "") + window.KESTRA_BASE_PATH;
        if (_root.endsWith("/")) {
            _root = root.substring(0, root.length - 1);
        }
    }
    return _root
}


export const baseUrl = root();

export const basePath = () => "/api/v1"

export const apiUrl = () => `${baseUrl}${basePath()}`

export const apiUrlWithoutTenants = () => `${baseUrl}/api/v1`