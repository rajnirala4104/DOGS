import { ENDPOINTS } from "../constants";
import { http } from "../http";


export const getDogBreeds = ()=>{
    return http.get(ENDPOINTS.DOOGS_BREED_LIST)
}

export const getDogImageByBreedName = (breedName:string)=>{
    return http.get(`/breed/${breedName}/images`)
}

export const getSubBreedImageBreed = (breedName:string, subBreed:string) => {
    return http.get(`/breed/${breedName}/${subBreed}/images`)
}   
