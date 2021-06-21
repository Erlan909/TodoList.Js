let arrTask=[]
const createTask=(e)=>{
    e.preventDefault()
    let message = document.getElementById('input')
    let def= {
        id:arrTask.length== 0 ? 1 : arrTask[arrTask.length-1].id+1,
        status:false,
        message: message.value,
        date: new Date(),
        final:null,
        messageDate:null
    }
    message.value.length != 0 && arrTask.push(def) && addToLocalstorage(arrTask)


    console.log(arrTask)
      message.value = ''
      renderTask()
} 
    const addToLocalstorage=(arr)=>{
    localStorage.setItem('arrTask', JSON.stringify(arr))
    console.log(localStorage.getItem('arrTask'))
}

document.addEventListener('DOMContentLoaded', ()=>getArrOnlocalStorage())

const renderTask =()=>{
    let output = document.getElementById('output')
    output.innerHTML=''
    arrTask.map((el, index)=>{
        let div = document.createElement('div')
        div.className='tasks'
        let p = document.createElement('b')
        p.style.fontSize='30px'
        p.style.marginLeft='119px'
        let del = document.createElement('button')
        del.style.marginTop='60px'
        del.style.marginLeft='-253px'
        del.style.position='absolute'
        let done = document.createElement('button')
        done.style.marginTop='50px'
        let span = document.createElement('span')
        let fine=document.createElement('span')
        let messagee = document.createElement('span')
        let date= new Date(el.date)
        let mesDate = el.mesDate ? new Date(el,mesDate): null
        let final = el.final ? new Date(el.final):null
        let edit=document.createElement('button')

        span.innerHTML=` Sozdana: ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}//${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        fine.innerHTML = el.final ?` Vypolnena: ${final.getDate()}.${final.getMonth()+1}.${final.getFullYear()}//${final.getHours()}:${final.getMinutes()}:${final.getSeconds()}` :'task ne zavershen'
        messagee.innerHTML=mesDate ? `Changen date: ${mesDate.getDate()}.${mesDate.getMonth()+1}.${mesDate.getFullYear()}//${mesDate.getHours()}:${mesDate.getMinutes()}:${mesDate.getSeconds()}`: null
         p.innerHTML=el.message

        div.style.backgroundColor= el.status ? 'green' : 'red'  
        del.innerHTML = 'delete'
        del.addEventListener('click', ()=>{el.status ? deleteTask(el.id): alert('asd')})
        done.innerHTML ='done'
        done.style.display=el.status? 'none' : 'block'
        done.addEventListener('click', ()=> doneTask(el.id))
        edit.innerHTML='edit'
        edit.addEventListener('click', ()=>editTask(el.id, index, el.message))

        div.appendChild(p)
        div.appendChild(del)
        div.appendChild(done)
        div.appendChild(edit)
         div.appendChild(span)
        div.appendChild(fine)
        output.appendChild(div)
        })

}

const editTask=(id, index, message)=>{
    let div = document.getElementsByClassName('tasks')[index]
    let tooge=document.createElement('input')   
    let button = document.createElement('button')
    button.innerHTML='save'
    tooge.value = message 
    div.append(tooge)
    div.append(button)


    button.addEventListener('click', ()=>{
        arrTask.map(el=>{
            if(el.id==id){
                el.message = tooge.value
                addToLocalstorage(arrTask)
                renderTask()
            }
    })
    
    })
}

const deleteTask =(id)=>{
    arrTask.forEach((el, index)=>{
        if(el.id==id){
            arrTask.splice(index,1)
            addToLocalstorage(arrTask)
             renderTask()
        }
       
     })
}
 
const doneTask =(id)=>{
    arrTask.map(el=>{
        if(el.id==id){
            el.status= !el.status
            el.final= new Date()

            addToLocalstorage(arrTask)
            renderTask()
        }
        
    })
}

const getArrOnlocalStorage= ()=>{
    let json =JSON.parse( localStorage.getItem('arrTask'))
    arrTask=json
    renderTask()
}
