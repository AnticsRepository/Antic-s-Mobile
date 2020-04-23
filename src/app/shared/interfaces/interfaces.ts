export interface User {
 _id?: string;
 name: string;
 email: string;
 password: string;
 account: string;
 profile?: UserProfile;
}

interface UserProfile {
 avatar?: string;
 rol?: string;
 bio?: string;
 facebook?: string;
 twitter?: string;
 github?: string;
 portfolio?: string;
 language?: string;
}

export class CustomError {
 name: string;
 message: string;
 status?: number;
 text: string;
 url?: string;
 author?: string;
 date?: string;
 platform?: string;

 constructor(name: string,
             message: string = 'Error',
             text: string = 'Error',
             author: string,
             status: number = null,
             url: string = '',
             platform: string = '') {
   this.name = name;
   this.message = message;
   this.status = status;
   this.text = text;
   this.url = url;
   this.author = author;
   this.platform = platform;
 }
}