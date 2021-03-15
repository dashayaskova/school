
export const serverGraphql = async (req, query, vars) => {
    const response = await fetch('http://graphql/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Firebase-Uid': req.headers['X-Firebase-Uid'],
            'X-Firebase-Admin': req.headers['X-Firebase-Admin'],
        },
        body: JSON.stringify({
            query: query,
            variables: vars
        })
    })
    const json = await response.json();
    if (json.errors) {
        console.log('Errors in request', json.errors);
    }

    return json.data;
}

export const clientGraphql = async (query, vars) => {
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            query: query,
            variables: vars
        })
    })
    
    const json = await response.json();

    if (json.errors) {
        console.log('Errors in request', json.errors);
    }

    return json.data;
}
