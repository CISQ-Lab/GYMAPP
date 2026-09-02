import { useContext } from "react";
import { GymContext } from "../context/GymContext";

export default function useGym(){
    return useContext(GymContext);
}