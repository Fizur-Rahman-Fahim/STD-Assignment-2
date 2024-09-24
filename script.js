document.addEventListener("DOMContentLoaded", () => {
    fetchData("j");
  });

function searchPlayer(){
    const input = document.querySelector('#searchInput')
    const val = input.value.trim();
    // console.log(val);
    fetchData(val);
    input.value = '';
};

const fetchData= (val)=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`)
   .then(response=> response.json())
   .then(data => {
        // console.log(data);
        displayPlayers(data.meals);
    })
}


const displayPlayers=(meals)=>{
    const container = document.querySelector('.defaultCardContainer');
    container.innerHTML = '';
    meals.forEach(meal => {
        // console.log(player);
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="card col-3" >
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Name:</strong> ${meal.strMeal}</li>
                            <li class="list-group-item"><strong>City:</strong> ${meal.strArea}</li>
                            <li class="list-group-item"><strong>Catagory:</strong> ${meal.strCategory}</li>
                        </ul>
                    </div>
                    <button class="btn btn-primary" onclick="addToGroup(this,'${meal.strMeal}')">Add To Group</button>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#details">Details</button>
                    
                 
                    <div class="modal fade" id="details" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                
                                <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">${meal.strMeal}</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                
                                <div class="modal-body">
                                    <ul>
                                        <li><strong>Name:</strong> ${meal.strMeal}</li>
                                        <li><strong>Area:</strong> ${meal.strArea}</li>
                                        <li><strong>Category:</strong> ${meal.strCategory}</li>
                                    </ul>
                                    <img src="${meal.strMealThumb}" style="margin: auto" width="100%"/>
                                    
                                    <h2>Instruction:</h2>
                                    <p>${meal.strInstructions}</p>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>


                            </div>
                        </div>
                    </div>            


                </div>
                
        `;
        container.appendChild(div);
    });
}






let memberList = [];
function addToGroup(e,name){

    memberList.push(name);
    let groupMember = document.getElementsByClassName("groupMember")[0];
    let Number = memberList.length;
    // console.log(Number);
    if(Number >= 12){
        alert("order limit is Over.");
    }else{
        groupMember.innerText = `${Number}`;
        e.setAttribute("disabled","true");

        let playersName = document.getElementById("OrderList");
        playersName.insertAdjacentHTML('beforeend',`
            <li>${name}</li>
        `);
    }
   
}






