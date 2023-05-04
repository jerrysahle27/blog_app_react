export interface ProfileModel {
    user: {
      name: string;
      email: string;
      avatar: string;
    };
    company: string;
    location: string;
    skill: [];
    website: string;
    bio: string;
    githubusername: string;
    experience: [
      {
        title: string;
        company: string;
        location: string;
        from: Date;
        to: Date;
        current: boolean;
      }
    ];
    eduucation: [
      {
        title: string;
        school: string;
        degree: string;
        fieldofstudy: string;
        location: string;
        from: Date;
        to: Date;
        current: boolean;
      }
    ];
    Socialmedia: {
      Youtube: string;
      Facebook: string;
      Twitter: string;
      LinkedIn: string;
      Instagram: string;
    };
    date: Date;
  }
  
  
  