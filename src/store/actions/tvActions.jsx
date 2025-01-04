export {removeTv} from "../reducers/tvSlice";
import axios from "../../utils/axios"
import {loadTv} from "../reducers/tvSlice"

export const asyncloadtv = (id)=>async(dispatch, getState)=>{
    try {
        const detail =await axios.get(`/tv/${id}`);
        const externalid =await axios.get(`/tv/${id}/external_ids`);
        const recommendations =await axios.get(`/tv/${id}/recommendations`);
        const similar =await axios.get(`/tv/${id}/similar`);
        const videos =await axios.get(`/tv/${id}/videos`);
        const watchproviders =await axios.get(`/tv/${id}/watch/providers`);

        let val = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data,
            similar:similar.data,
            videos: videos.data.results.find((m) => m.type === "Trailer"),
            watchproviders: watchproviders.data,
        }
        dispatch(loadTv(val))

    } catch (error) {
        console.log("Error- ",error);
    }
}
