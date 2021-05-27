import { Request } from 'express';

interface Dictionary {
  [Key: string]: any;
}

export const serverGraphql = async (req: Request, query: string, vars?: Dictionary) => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Firebase-Uid': req.headers['X-Firebase-Uid'],
      'X-Firebase-Admin': req.headers['X-Firebase-Admin'],
    };

    const response = await fetch('http://graphql/graphql', {
        method: 'POST',
        headers: headers as HeadersInit,
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

export const clientGraphql = async (query: string, vars?: Dictionary) => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: headers as HeadersInit,
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
