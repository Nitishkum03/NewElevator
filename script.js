let btn = document.getElementById('btn');
let Floorcontainer = document.getElementById('Floor');
Floorcontainer.style.position="relative"

btn.addEventListener("click" ,()=>{
  let Floorinput = document.getElementById('inputsFloors')
  
//   console.log("floors",Floorinput.value);
      for(let i =0; i<Floorinput.value;i++){
        let Floors = document.createElement('div');
        Floors.className = "Floors"
        Floors.innerHTML=`
        <div class = "btn">
        <button id="up">up</button>
        <button id="Down_button">Down</button>
        </div>
        <div class = "l_component"></div>
        <div class = "f_component" > floor ${i} </div>
      `;
      Floorcontainer.prepend(Floors)
      }

    
    // console.log("lifts",Liftinput.value) 
    let up_button = document.querySelectorAll('#up'); 
    let Down_button = document.querySelectorAll('#Down_button');
    // console.log(up_button);     
    

    //lifts making 
    let l_component = document.querySelectorAll(".l_component")
    let bottomlifts = l_component[l_component.length -1]
    let Liftinput = document.getElementById('inputsLifts')
    let Lifts = []
    // let lift = document.querySelectorAll('.lifts')

for (let i = 0; i < Liftinput.value; i++) {
    let lift = document.createElement("div")
    lift.className="lifts"
    lift.innerHTML=`
    <div class="rightdoor"></div>
    <div class="leftdoor"></div>
    `
    lift.style.position="absolute"
    lift.style.left=`${200+(i*100)}px`
    lift.style.transition="top 7s ease"
    lift.style.top=`${up_button[Floorinput.value-1].offsetTop-50}px`
    lift.dataset.status = "free";
    Lifts.push(lift)
    bottomlifts.append(lift) 
    }


    let lift1 = document.querySelectorAll(".lifts")
    let elevator = lift1[1]
    // elevator.classList.add('open')
   
    function movinglift(target){
        let freelift = Lifts.filter(lift => lift.dataset.status === 'free') ;

        if(freelift.length === 0){
            alert("all lifts are busy. try again later");
            return;
        }
        let closedlift = freelift.reduce((prev , curr)=>{
            let prevDistance = prev.style.top - target;
            let currDistance =  curr.style.top - target;
            // console.log(prevDistance)
            // console.log(currDistance)
            // console.log(prev)
              return prevDistance < currDistance ?   curr : prev;
        })
        closedlift.dataset.status="moving"
        closedlift.style.top = `${target - 50}px`
        // closedlift.classList.add('open');
        setTimeout(()=>{
            setTimeout(()=>{
                closedlift.classList.remove('open')
            },5000)
            closedlift.classList.add('open');
        },6000)
        setTimeout(()=>{
            closedlift.dataset.status = "free"
        },10000)

    }
       for(let i = 0; i<Floorinput.value; i++){
        let targetfloor = up_button[i].offsetTop ;
        up_button[i].addEventListener("click",()=>{
            // console.log(up_button[i].offsetTop)
           
        // lifts[0].style.top=`${up_button[i].offsetTop-50}px`
        movinglift(targetfloor);
    })
    Down_button[i].addEventListener("click",()=>{
        let targetfloor = Down_button[i].offsetTop;
        // console.log(Down_button[i].offsetTop);

        // lifts[0].style.top=`${Down_button[i].offsetTop-50}px`
        movinglift(targetfloor);
    })
    }
   
})


    
