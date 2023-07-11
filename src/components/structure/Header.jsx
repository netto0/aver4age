import React from "react";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <NavLink to="/" exact="true">
        <h1>
          AVER<span>4</span>AGE
        </h1>
      </NavLink>
      <NavLink
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "600" : "",
            color: isPending ? "red" : "black",
          };
        }}
        to="/home"
      >
        INÍCIO
      </NavLink>
      <NavLink
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "600" : "",
            color: isPending ? "red" : "black",
          };
        }}
        to="/averages"
      >
        MÉDIAS
      </NavLink>
      <NavLink
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "600" : "",
            color: isPending ? "red" : "black",
          };
        }}
        to="/settings"
      >
        CONFIGURAÇÕES
      </NavLink>
      <NavLink
        style={({ isActive, isPending }) => {
          return {
            fontWeight: isActive ? "600" : "",
            color: isPending ? "red" : "black",
          };
        }}
        to="/profile"
      >
        PERFIL
      </NavLink>
    </header>
  );
}
