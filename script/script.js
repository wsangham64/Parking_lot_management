 
var park_it=document.getElementById('part-it');
var alert1=document.getElementById('alert1');
var alert2=document.getElementById('alert2');
var tableCars=document.getElementById('addCar');
var count=0;



// this is the database of the parking lot with each diffetent cars 
class newCar{
    constructor(ownerName,carName,plateNumber,entryDate,exitDate){
        this.ownerName=ownerName;
        this.carName=carName;
        this.plateNumber=plateNumber;
        this.entryDate=entryDate;
        this.exitDate=exitDate;
    }
}





// this method clears the all input values when called
var clearInputs=()=>{
    document.getElementById('owner-name').value='';
  document.getElementById('car-name').value='';
  document.getElementById('plate-number').value='';
  document.getElementById('entry-date').value='';
  document.getElementById('exit-date').value='';
 }
 


// this methos grabs the all availabe cars data from the local storage and returns it converting it in the JSON boject
var getAllCars=()=>{
    let entries;

    if(localStorage.getItem('cars')===null){
        entries=[];
    }else{
        entries=JSON.parse(localStorage.getItem('cars'));
    }

    return entries;


}


// this is IIFE it shows all the cars available in the parking lot and displays on in the table
(function () {
    var allCars=getAllCars();

    allCars.forEach((car,i) => {
        let newRow=document.createElement('tr');
        
        newRow.innerHTML=` <td>${i+1}</td>
        <td>${car.ownerName}</td>
        <td>${car.carName}</td>
        <td>${car.plateNumber}</td>
        <td>${car.entryDate}</td>
        <td>${car.exitDate}</td>
        <td><button id="delete-btn" ><i class="fas fa-times delete"></i></button></td>`;
    
        tableCars.append(newRow);
        count=i+1;
    
    });
  })();


// this methos is used to show every type of elert used in the project
var alert=(message,className,place)=>{
    place.innerHTML=`
    <div class="alert alert-${className} text-center"  >${message}</div>`;
    setTimeout(() => {
        place.innerHTML='';
    }, 5000);
}














// this methos makes sure that the input fiels and the date is not empty
  var validate=(car)=>{
      if(car.ownerName=="" || car.carName=="" || car.plateNumber=="" || car.entryDate=="" || car.exitDate==""){

          alert("fiels must not be empty",'danger',alert1)
          return false
      }

      if(car.exitDate < car.entryDate){
        alert("Exit date must be greater than the Entry date..","warning",alert1)
          return false;
      }

      return true;
  }



//   this methos is adds the car details as an object in in the locat storage
  var addCar=(carToAdd)=>{
   
            if(!validate(carToAdd)){
                clearInputs()
                return false ;
            }
        let entries=getAllCars();
        entries.push(carToAdd);
        localStorage.setItem('cars',JSON.stringify(entries));
        
        return true;

  }


// this methos shoows the current added car in the lot on the screen
var showTable=(car)=>{
    var cars=getAllCars();
        count++
        let tableBody=document.createElement('tr');
        tableBody.innerHTML=`<th scope="row">${ count}</th>
                            <td>${car.ownerName}</td>
                            <td>${car.carName}</td>
                            <td>${car.plateNumber}</td>
                            <td>${car.entryDate}</td>
                            <td>${car.exitDate}</td>
                            <td><button id="delete-btn" ><i class="fas fa-times delete"></i></button></td>`;

        tableCars.appendChild(tableBody);

  
}




// this methos removes the clicked table row from the screen 
var removeFromTable=(target)=>{
    if(target.classList.contains('delete')){
        target.parentElement.parentElement.parentElement.remove();
    }
}


// this methos removes the clicked row from the local storage and saves the updated list in the storage
var removeCar=(plate)=>{
    let cars=getAllCars();

    cars.forEach((car,index)=>{
        if(car.plateNumber===plate){
            cars.splice(index,1);
        }
    })
    localStorage.setItem('cars',JSON.stringify(cars))
}











// this is the event to add the car in storage
  park_it.addEventListener('click',(e)=>{
    e.preventDefault();


    var ownerName=document.getElementById('owner-name').value;
    var carName=document.getElementById('car-name').value;
    var plateNum=document.getElementById('plate-number').value;
    var entryDate=document.getElementById('entry-date').value;
    var exitDate=document.getElementById('exit-date').value;
    let car= new newCar(ownerName,carName,plateNum,entryDate,exitDate);
        if(addCar(car)){
            alert("Car is successfully added to the parking lot",'success',alert2)
        }else{
            return;
        }
        
    showTable(car);
    clearInputs();
    
    
    
});

// this is the event for removing the car from the parking lot
tableCars.addEventListener('click',(e)=>{
   try {
    e.target.parentElement.parentElement.previousElementSibling
    var a=e.target.parentElement.parentElement.previousElementSibling;
    let plate=a.previousElementSibling.previousElementSibling.textContent ;
    removeFromTable(e.target);
    removeCar(plate)
    alert("your parked car is removed Sussfully" ,'primary',alert2)
    setTimeout(()=>{
        location.reload();
    },3000)
   } catch (error) {
       console.log(error);
   }

});













