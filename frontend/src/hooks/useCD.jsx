import { CashDrawerContext } from "../context/CashDrawerContext";
import { useContext } from "react";

export default function useCD(){
    return useContext(CashDrawerContext);
}