import { EMemberType } from "./project.types";

export enum ETypeUser {
  Staff,
  InternShip,
  Collaborator,
  All,
}
export enum EBranchUser {
  HaNoi,
  DaNang,
  HoChiMinh,
  All,
}
export interface ISelectedUser {
  userId?: number;
  type?: EMemberType;
  id?: number;
}
export enum ELevelUser {
  Intern0,
  Intern1,
  Intern2,
  Prefresher,
  Fresher0,
  Fresher1,
  Fresher2,
  Junior0,
  Junior1,
  Junior2,
  Middle0,
  Middle1,
  Middle2,
  Senior0,
  Senior1,
  Senior2,
  All,
}
