
let positics = [
    {id:1, title:'Сільський голова', desc: 'Купи мені машину', src: 'images/1.jpeg'},
    {id:2, title:'Президент', desc: 'Купи мені квартал', src: 'images/2.jpg'},
    {id:3, title:'Колишній президен ', desc: 'Купи ', src: 'images/3.jpg'},
    

]
const toHTML = fruit =>`<div class="card col-2 mx-2" data-id ="${fruit.id}">
   <img src="${fruit.src}" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">${fruit.title}</h5>
     <p class="card-text"> ${fruit.desc}</p>
     <button class="btn-p" data-btn="price">Виправдати</button>
     <a href="#" class="btn-d" data-btn="prison">Посадити</a>
   </div>
 </div>`

function render(){
    const html  = positics.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html;
}
render();

const myModal = $.modal({
    title: 'Vladilen Modal',
    closeble : true,
    content: ` <div class="header-navs__list">
    <li class="header-navs__li">Rooms1</li>
    <li class="header-navs__li">Rooms2</li>
    <li class="header-navs__li">Rooms3</li>
    <li class="header-navs__li">Rooms4</li>
</div>`,
   width : 400,
   intializator : '.btn2',
   footerButtons: [
       {text: 'ok', type : 'btn3', handler(){
           console.log('btn clicked');
           modal.close();   
       }},
       {text: 'okidoki mazafaka', type : 'btn3', handler(){
        console.log('btn clicked')
    }}
   ]
});
const priceModal = $.modal({
    title : 'Любимець народу',
    closeble : true,

    footerButtons: [
        {text: 'ok', type : 'btn-d', handler(){
            console.log('btn clicked');
            priceModal.close();   
        }},    
    ]
})
const prisonModal = $.modal({
    title : 'Засадити',
    closeble : true,
    footerButtons: [
        {text: 'Ні', type : 'btn-p', handler(){
            console.log('btn clicked');
            prprisonModal.close();   
        }},  
        {text: 'Так', type : 'btn-d', handler(){
            console.log('btn clicked');
            prisonModal.close();
          let ise = document.querySelector(`[data-id="${id2}"]`);
          console.log(ise)
          ise.remove();
        }},    
    ]
})
const genModal = $.modal({
    title : 'Create a person',
    closeble : true,
    content:`<section class="section">
    <input type="file" class="input" data-input="1" placeholder="Enter your Image Here">
    <input type="text" class="input" name ="0ne" data-input ="2" placeholder="Title">
    <input type="text" class="input" name ="two" data-input ="3" placeholder="subTitle">
</section>`,
    width : 600,
    footerButtons: [
        {text: 'exit', type : 'btn-d', handler(){
            console.log('btn clicked');
            genModal.close();   
        }},
        {text: 'create', type : 'btn-p', handler(){
         console.log('btn clicked');
         const cWindow = this.closest('.modal-window');
         generateListItem(cWindow);
        genModal.close(); 
        
     }}
    ]
})
let caid = 3;

function generateListItem(el){
const inp1 = el.querySelector('[data-input = "1"]').files[0].name;
const inp2 = el.querySelector('[data-input = "2"]').value;
const inp3 = el.querySelector('[data-input = "3"]').value;
console.log(inp1, inp3);
let template =`<div class="card col-2 mx-2" data-id ="${caid++}">
   <img src="images/${inp1}" class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">${inp2}</h5>
     <p class="card-text"> ${inp3}</p>
     <button class="btn-p" data-btn="price">Виправдати</button>
     <a href="#" class="btn-d" data-btn="prison">Посадити</a>
   </div>
 </div>`
 document.querySelector('#fruits').insertAdjacentHTML("afterbegin", template);


}
document.querySelector('#fruits').addEventListener('click', event =>{
    event.preventDefault();
    const btnType =event.target.dataset.btn;
    id2 = +event.target.closest('.card').dataset.id
    img = event.target.closest('.card').querySelector('img').getAttribute('src');
    console.log(img)
    const id = +event.target.dataset.id;
    const fruit = positics.find(f => f.id === id2);
    if(btnType == 'price'){
        console.log('price');
        priceModal.open();
    
    elhtml =`<div class="w-50">
    <img src="${img}" alt="fg">
</div>`
    
    priceModal.setContent(elhtml)}
    if(btnType == 'prison'){
        console.log('priіщт');
        prisonModal.open();
        elhtml =`<div class="w-50">
        <img src="${img}" alt="fg">
    </div>`
        
    prisonModal.setContent(elhtml)}
    
   

})

document.querySelector('.generator').addEventListener('click', ()=>{
    genModal.open();
})