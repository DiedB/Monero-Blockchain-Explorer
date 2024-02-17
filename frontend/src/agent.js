const ONION_EXPLORER_HOST = process.env.REACT_APP_ONION_EXPLORER_HOST
const BCT_API_HOST = process.env.REACT_APP_PUBLIC_API_URL + ":" + process.env.REACT_APP_API_PORT

const getRequest = (url) => {
    return fetch(url);
}

const OnionApi = {
    getTransaction: (id) => getRequest(`${ONION_EXPLORER_HOST}/transaction/${id}`),
    getBlock: (id) => getRequest(`${ONION_EXPLORER_HOST}/block/${id}`),
}

const BctApi = {
    getOutput: (pk) => getRequest(`${BCT_API_HOST}/output/${pk}`),
    getGraph: (id) => getRequest(`${BCT_API_HOST}/graph/${id}/2`),
    getTransaction: (blockNumber, publicKey) => getRequest(`${BCT_API_HOST}/transaction/${blockNumber}/${publicKey}`)
}

export { BctApi, OnionApi };