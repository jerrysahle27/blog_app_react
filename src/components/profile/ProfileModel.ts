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
      _id: string;
      title: string;
      company: string;
      location: string;
      from: Date;
      to: Date;
      current: boolean;
    }
  ];
  Education: [
    {
      _id: string;
      school: string;
      degree: string;
      fieldofstudy: string;
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
