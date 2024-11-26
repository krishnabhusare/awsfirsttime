function expense(event){
    event.preventDefault();
    const expenseDetails = {
        amount:event.target.amount.value,
        description:event.target.description.value,
        category:event.target.category.value

    };

    axios.post('http://localhost:3000/expense/add-expense',expenseDetails);
    showOnScreen(expenseDetails);
}

window.addEventListener('DOMContentLoaded',()=>{
    axios.get('http://localhost:3000/expense/get-expense')
    .then(result=>{
      
        for(let i=0;i<result.data.allexpenses.length;i++){
            
             showOnScreen(result.data.allexpenses[i])
        }
      
    })
})

function showOnScreen(obj){
    const parentEl = document.getElementById('allexpenses');
    parentEl.innerHTML += `<li>amount--${obj.amount}--decription--${obj.description}--category--${obj.category}</li>`

}


