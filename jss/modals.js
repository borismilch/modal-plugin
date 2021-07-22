Element.prototype.appendAfter = function (element){
element.parentNode.insertBefore(this, element.nextSibling)
}

function noop(){

}



function _createModalFooter(buttons = []){
    let template = ``;
if (buttons.length === 0 ){
    return document.createElement('div')
}
const wrap = document.createElement('div');
wrap.classList.add('modal-footer');

buttons.forEach(btn =>{
    const $btn = document.createElement('button');
    $btn.textContent = btn.text;
    $btn.classList.add(`${btn.type || ('btn-p')}`)
   $btn.onclick = btn.handler || noop;
   wrap.appendChild($btn);
})

return wrap
}
function _createModal(options){
    const modal = document.createElement('div')
    modal.classList.add('modal');
    const title =  options.title;
    const content = options.content;
    const closeble = options.closeble;
    const width = options.width + 'px';
    const animation = options.animation;
    
    
    modal.insertAdjacentHTML('afterbegin', ` <div class="modal-overlay" data-close>
    <div class="modal-window ${animation || ''}" style = "width : ${width || 500 + 'px'}">
        <div class="modal-header">
            <div class="modal-title">${title || 'Window'}</div>
           ${options.closeble  ? `<span class="modal-close" data-close>&times;</span>` : ''} 
        </div>
        <div class="modal-body" data-content>
        ${content || ''}
        </div>
        
    </div>
</div>` )
const footer = _createModalFooter(options.footerButtons);
footer.appendAfter(modal.querySelector('[data-content]'))
document.body.appendChild(modal)
    return modal

}


// function dinamicAppear(arr){
//     const row =document.querySelector('.row')
// // const row = document.createElement('div');
// // row.classList.add('row');
// arr.forEach(el=>{
//    let component = `<div class="card col-2 mx-2" data-id ="${el.id}">
//    <img src="${el.src}" class="card-img-top" alt="...">
//    <div class="card-body">
//      <h5 class="card-title">${el.title}</h5>
//      <p class="card-text"> ${el.desc}</p>
//      <button class=" btn-p" data-btn="price">Виправдати</button>
//      <a href="#" class="btn-d"data-btn="delete">Посадити</a>
//    </div>
//  </div>`

// row.insertAdjacentHTML("beforeend", component);
// })
// const buttonsW = document.querySelectorAll('.btn-p');
// Justification(buttonsW);
// // console.log(row);
//  return row;

// }
// window.onload = setTimeout(()=>{document.body.insertAdjacentHTML("beforeend", dinamicAppear(positics))}, 1500)

// // 


// function Justification(array){

//     for (let i = 0; i < array.length; i++) {
//         const element = array[i];
//         element.addEventListener('click', ()=>{
//         const parent = element.closest('.card');
//         const pimg =  parent.querySelector('img').getAttribute('src');
//         const titlep = parent.querySelector('.card-title').textContent;
//         console.log(parent, element, pimg, titlep);
//         addModale(pimg, element, titlep );

//     })
//     }
// }


// function addModale(pimg, element, titlep ){
// let ec = element.className.trim();
// console.log(ec);
   
    
//     // const modale = $.modal({
//     //     title: `${titlep}`,
//     //     closeble : true,
//     //     content: `<div class="card-img">
//     //     <img src="${pimg}" alt="">
//     //     <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, sed.</p>
//     //   </div>`,
//     //   intializator : `.${ec}`, 
//     //   footerButtons: [
//     //     {text: 'Згоден', type : 'btn-p', handler(){
//     //         console.log('btn clicked');
//     //         modale.close();   
//     //     }},
//     //     {text: 'Незгоден', type : 'btn-d', handler(){
//     //         console.log('btn clicked');
//     //         modale.close();   
//     //     }},
//     // ]
//     // })
// }



$.modal = function(options){
   
    
   

    const $modal =  _createModal(options);
    $modal.addEventListener('click', listener)
    console.log(this);
    let destroyed = false;
    function listener(e){
        if(e.target.hasAttribute('data-close')  && options.closeble == true){
            modal.close();
        }}
   
   const animation_speed = 400; 
   let closing = false;
    const modal = {
        open(){
            if(destroyed){
                return console.log('destroyed');
            }
            !closing && $modal.classList.add('open'); 
          },
          close(){
              closing = true;
             $modal.classList.remove('open');
             $modal.classList.add('hide');
             setTimeout(()=>{
                 $modal.classList.remove('hide');
                 closing = false;
             }, animation_speed)
          },
        //   destroy(){
        //      closing = true;
        //      $modal.classList.remove('open');
        //      $modal.classList.add('hide');
        //      setTimeout(()=>{
        //          $modal.classList.remove('hide');
        //          closing = false;
        //          $modal.remove();
        //      }, animation_speed)
             
        //   },
    }
    //document.querySelector(`${options.intializator}`).addEventListener('click', modal.open)
 return Object.assign(modal , {
     destroy(){
         $modal.parentNode.removeChild($modal);
        destroyed = true;
     },
     setContent(html){
        
        $modal.querySelector('[data-content]').innerHTML = html;
     }
 });
}

