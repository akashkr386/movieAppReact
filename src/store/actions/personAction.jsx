export { removeperson } from "../reducers/personSlice";
import axios from "../../utils/axios";
import { loadperson } from "../reducers/personSlice";

export const asyncloadperson = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const combineCredits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredit = await axios.get(`/person/${id}/movie_credits`);

    let val = {
      detail: detail.data,
      externalid: externalid.data,
      combineCredits: combineCredits.data,
      tvCredits: tvCredits.data,
      movieCredit: movieCredit.data,
    };
    dispatch(loadperson(val));
  } catch (error) {
    console.log("Error- ", error);
  }
};

export default asyncloadperson;
