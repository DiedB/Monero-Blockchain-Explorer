const ONION_HOST = "http://onion.bct.diederik.it:8081/api"

const getRequest = (url) => {
    return fetch(url);
}

const OnionApi = {
    getTransaction: (id) => getRequest(`${ONION_HOST}/transaction/${id}`),
    getBlock: (id) => getRequest(`${ONION_HOST}/block/${id}`),
}

export { OnionApi };