import setText , {appendText} from './results.mjs';

export async function get(){
    //step 1
    // add below code but do not add async keyword above
    //make sure you run npm run dev
    
    const {data} = await axios.get("http://localhost:3000/orders/1");
    // above line we are destructuring the data in the above call
    setText(JSON.stringify(data));
    //step 2
    //add async keyword to the function definition
    
}

export async function getCatch(){
    //step 1
    // copy  code from get function
    // add async keyword
    // change order number to 123 , to see the error
    //add try catch block
    try{ 
        const {data} = await axios.get("http://localhost:3000/orders/123");
        // above line we are destructuring the data in the above call
        setText(JSON.stringify(data));
    }
    catch(error){
        setText(error);
    }
}

export async function chain(){
    const {data} = await axios.get("http://localhost:3000/orders/1");
    const {data: address} = await axios.get(`http://localhost:3000/addresses/${data.shippingAddress}`);
    // destructuring adta and assigning the value to a variable named address

    setText(`City: ${JSON.stringify(address.city)}`);

}

export async function concurrent(){
    const orderStatus = axios.get("http://localhost:3000/orders/1");//takes 1.5 seconds
    const orders = axios.get("http://localhost:3000/orders");

    setText("");

    const {data:statuses} = await orderStatus;
    const {data: order} = await orders;

    appendText(JSON.stringify(statuses));
    appendText(JSON.stringify(order[0]));
    //you will see orders api resolved first and orderstatuses resolved second
    //by not placing an await on our axios calls we allowed both calls to go at the same time.
    //even though we had await on orderStatus (slower reques) first , both occurred at the same time
}

export async function parallel(){
    setText('');
    await Promise.all([ 
            (async() => {
                const {data} = await axios.get('http://localhost:3000/orderStatuses');
                appendText(JSON.stringify(data))
            })  (),
            (async() => {
                const {data} = await axios.get('http://localhost:3000/orders');
                appendText(JSON.stringify(data))
            })  ()
        ]);       

}