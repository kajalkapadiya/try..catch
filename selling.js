document.querySelector('.btn').addEventListener('click', add);

window.addEventListener('DOMContentLoaded', async () => {
    await show();
})

async function show() {
    try {
        const res = await axios.get('https://crudcrud.com/api/8cd946b6c4334d95938d33a677886554/sellingDetails')
        console.log(res);

        var count = 0;
        for (let i = 0; i < res.data.length; i++) {

            //show data from the crud crud on screen
            const parentNode = document.querySelector('#details');
            const childHtml = `<li id=${res.data[i].price}> ${res.data[i].price} ${res.data[i].product}
                <button onclick = "removeInfo('${res.data[i].price}'); deleteInfo('${res.data[i]._id}')">delete</button>
                </li>`
            parentNode.innerHTML = parentNode.innerHTML + childHtml;

            // count total value
            count += parseInt(res.data[i].price);
        }
        const parentNode1 = document.querySelector('#total');
        parentNode1.innerHTML += count
    }
    catch (err) { console.log(err + "error but script is running.") }

}

async function deleteInfo(detailId) {
    try {
        await axios.delete(`https://crudcrud.com/api/8cd946b6c4334d95938d33a677886554/sellingDetails/${detailId}`)
    }
    catch (err) {
        console.log(err + "in deleteInfo")
    }
}

async function removeInfo(detailId) {
    const parentNode = document.querySelector('#details');
    const childNode = document.getElementById(detailId);
    if (childNode) {
        try {
            parentNode.removeChild(childNode);
        }
        catch {
            console.log("during removing")
        }
    }
    const parentNode1 = document.querySelector('#total');
    parentNode1.innerHTML = parseInt(parentNode1.innerHTML) - parseInt(detailId);
}

async function add(e) {
    e.preventDefault();

    try {
        const price = document.querySelector('#sellPrice').value;
        const product = document.querySelector('#product').value;

        const obj = {
            price,
            product
        }

        await axios.post('https://crudcrud.com/api/8cd946b6c4334d95938d33a677886554/sellingDetails', obj)

        const parentNode = document.querySelector('#details');
        const childHtml = `<li id=${obj.price}> ${obj.price} ${obj.product}
        <button onclick = "removeInfo('${obj.price}'); deleteInfo('${obj._id}')">delete</button>
        </li>`
        parentNode.innerHTML = parentNode.innerHTML + childHtml;

        const parentNode1 = document.querySelector('#total');
        parentNode1.innerHTML = parseInt(parentNode1.innerHTML) + parseInt(obj.price);
    }
    catch (err) {
        console.log(err + "in add function");
    }
}