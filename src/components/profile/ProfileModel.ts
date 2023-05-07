import { Control } from "react-hook-form";

export interface ProfileModel {
    user: {
      name: string;
      email: string;
      avatar: string;
    };
    skill: [];
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
    education: [
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
  
  
  export interface ProfileStepProps {
     control: Control<ProfileModel>;
  }