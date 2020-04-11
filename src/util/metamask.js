
export const assignEthereum = () => {
    if (typeof window.ethereum !== 'undefined') {
        return window.ethereum
    }
    return false
}
