// frontend/src/app/admin/profile/data.ts

export interface Profile {
    studentId: string;
    name: string;
    email: string;
    major: string;
  }
  
  const profiles: Profile[] = [
    {
      studentId: "123456",
      name: "Alice Johnson",
      email: "alice@example.com",
      major: "Computer Science"
    },
    {
      studentId: "789012",
      name: "Bob Smith",
      email: "bob@example.com",
      major: "Mathematics"
    }
  ];
  
export default profiles;
  