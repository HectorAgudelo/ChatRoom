const users: number | string[] = [];

//user that joins to the chat
export const newUser = (id: string, name: string, room: string): any => {
  const user: any = { id, name, room };
  users.push(user);
  return user;
};
//current user
export const getUser = (id: string): any => {
  return users.find((user: any) => user.id === id);
};

//user that leaves the chat

export const userLeave = (id:string): any => {
const index = users.findIndex((user:any)=> user.id === id)
  if(index !== -1){
    return users.splice(index, 1)[0];
  }
}

// get users in a room
export const usersInRoom = (room:any): any => {
return users.filter((user:any)=>{user.room === room})
}

// this function sets up the display chat messages format
export const messageFormat = (name: any, text: string | string[]): any => {
  return {
    name,
    text,
  };
}

