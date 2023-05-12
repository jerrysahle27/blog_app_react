import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProfileModel } from "./ProfileModel";
import axios from "axios";
import { baseUrl } from "../posts/postsSlice";
import { RootState } from "../../app/store";

type initialState = {
  profile: ProfileModel;
  status: string;
  error: string | null | undefined;
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(`${baseUrl}/api/profile`, {
        headers: {
          authorization: `${token}`,
        },
      });
      return response.data;
    }
  }
);
export const addNewProfile = createAsyncThunk(
  "profile/addNewProfile",
  async (values: ProfileModel) => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.post(
        `${baseUrl}/api/profile`,
        {
          bio: values.bio,
          githubusername: values.githubusername,
          youtube: values.Socialmedia.Youtube,
          twitter: values.Socialmedia.Twitter,
          instagram: values.Socialmedia.Instagram,
          linkedin: values.Socialmedia.LinkedIn,
          skills: values.skill,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      return data;
    }
  }
);
export const addNewExperience = createAsyncThunk(
  "profile/addNewExperience",
  async (values: ProfileModel) => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.post(
        `${baseUrl}/api/profile/experience`,
        {
          title: values.experience[0].title,
          company: values.experience[0].company,
          location: values.experience[0].location,
          from: values.experience[0].from,
          to: values.experience[0].to,
          current: values.experience[0].current,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      return data;
    }
  }
);
export const addNewEducation = createAsyncThunk(
  "profile/addNewEducation",
  async (values: ProfileModel) => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.post(
        `${baseUrl}/api/profile/education`,
        {
          school: values.Education[0].school,
          degree: values.Education[0].degree,
          fieldofstudy: values.Education[0].fieldofstudy,
          from: values.Education[0].from,
          to: values.Education[0].to,
          current: values.Education[0].current,
        },
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      return data;
    }
  }
);
export const deleteEducation = createAsyncThunk(
  "profile/deleteEducation/id",
  async (id: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.delete(
        `${baseUrl}/api/profile/education/` + id,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      return data;
    }
  }
);
export const deleteExperience = createAsyncThunk(
  "profile/deleteExperience/id",
  async (id: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      const { data } = await axios.delete(
        `${baseUrl}/api/profile/experience/` + id,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      return data;
    }
  }
);
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    status: "idle",
    error: null,
  } as initialState,

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(addNewExperience.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(addNewEducation.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.profile = action.payload;
      });
  },
});
export const selectProfile = (state: RootState) => state.profile.profile;
export default profileSlice.reducer;
