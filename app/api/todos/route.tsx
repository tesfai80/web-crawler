

import { NextResponse } from "next/server";
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

//const API_KEY:string=process.env.
export async function GET() {

    const res = await fetch(API_URL);
    const todos: Todo[] = await res.json();
    return NextResponse.json(todos);
}
export async function DELETE(request:Request){
 const{id}:Partial<Todo>=await request.json();
 if(!id) return NextResponse.json({"message" :"message id is required"});
 await fetch(`${API_URL}/${id}`,{
    method:'DELETE',
    headers:{
        'Content-Type':'Application/json',
//'API_-EY':API_KEY
    }
 });

 return NextResponse.json({"message":`Todo ${id} is Deleted!`});
}

export async function POST(request:Request){
    const{userId,title}:Partial<Todo>=await request.json();
    if(!userId||!title) return NextResponse.json({"message" :"user data is required"});
    const res=await fetch(API_URL,{
       method:'POST',
       headers:{
           'Content-Type':'Application/json',
   //'API_-EY':API_KEY
       },
       body:JSON.stringify({
        userId,title,completed:false
       })
    });
   
    const newTodo:Todo=await res.json();
    return NextResponse.json(newTodo);
   }
   export async function PUT(request:Request){
    const{userId,id,title,completed}:Todo=await request.json();
    if(!userId||!id||!title || typeof(completed)!=='boolean') return NextResponse.json({"message" :"user data is required"});

    const res=await fetch(`${API_URL}/${id}`,{
       method:'PUT',
       headers:{
           'Content-Type':'Application/json',
       },
       body:JSON.stringify({
        userId,id,title,completed
       })
    });
   
    const updatedTodo:Todo=await res.json();
    return NextResponse.json(updatedTodo);
   }