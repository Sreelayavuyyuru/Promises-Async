import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";

export function get() {
    axios.get('http://localhost:3000/orders/1')
    .then( ({data}) => {
        setText(JSON.stringify(data));
    });

}

export function getCatch() {
    axios.get('http://localhost:3000/orders/123')
    .then( ({data}) => {
            setText(JSON.stringify(data));
        })
    .catch( err => setText(err));    
}

export function chain() { //chaining of promises
    axios.get('http://localhost:3000/orders/1')
    .then( ({data}) => {
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    })
    .then( ({data}) => {
        setText(`city : ${data.city}`);
    });
}

export function chainCatch() {
    axios.get('http://localhost:3000/orders/1')
    .then( ({data}) => {        
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
       // throw new Error(" Error");
    })
    .catch(err => {
        setText(err);
        throw new Error('error at 37');
    })    
    .then( ({data}) => {
        setText(`city : ${data.city}`);
        throw new Error('error at 41');
    })
    .catch(err => setText(err) );
}

export function final() {
    showWaiting();
    axios.get('http://localhost:3000/orders/1')
    .then( ({data}) => {        
        return axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
       // throw new Error(" Error");
    })
    .catch(err => {
        setText(err);
        throw new Error('first');
    })    
    .then( ({data}) => {
        setText(`city : ${data.my.city}`);
        throw new Error(err);
    })
    .catch(err => setText('Second'))
    .finally( () => {
        console.log('hey from finally');
        setTimeout( () => {
            hideWaiting();}, 1500);
            appendText(" --completely done");
        });
      
}