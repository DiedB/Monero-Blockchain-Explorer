const ONION_HOST = "http://onion.bct.diederik.it:8081/api"
const BCT_HOST = "http://api.bct.diederik.it:3001"

const getRequest = (url) => {
    return fetch(url);
}

const OnionApi = {
    getTransaction: (id) => getRequest(`${ONION_HOST}/transaction/${id}`),
    getBlock: (id) => getRequest(`${ONION_HOST}/block/${id}`),
}

const BctApi = {
    getOutput: (pk) => getRequest(`${BCT_HOST}/output/${pk}`),
    getGraph: (id) => getRequest(`${BCT_HOST}/graph/${id}/4`),
    getTransaction: (blockNumber, publicKey) => getRequest(`${BCT_HOST}/transaction/${blockNumber}/${publicKey}`)
}

export { BctApi, OnionApi };