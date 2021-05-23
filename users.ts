const users: number | string[] = [];

//user that joins to the chat
export const newUser = (id: string, name: string, room: string): any => {
  const user: any = { id, name, room };
  users.push(user);
  console.log('newUser fun', user);
  return user;
};
//current user
export const getUser = (id: string): any => {
  return users.find((user: any) => user.id === id);
};

console.log(users);
console.log(getUser.name);
