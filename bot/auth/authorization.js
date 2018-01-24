import * as DB from "../database/database.js"

//Mom&Dad,WeebOverlords,Lider,Test

export const authorizedRolesIds = [
  "312317944417878016",
  "341182224139419650",
  "316283334768459777",
  "248702697610412032"
]

export function setAdminRolesIds(guild, roles) {
  console.log(DB.r.db(guild.id))
  let conf = DB.Connect(guild).table("configuration")
  if (conf.adminRoleIds) {
    console.log("Syncing roles")
  } else {
    console.log("Adding roles")
  }
  console.log("Updating DB")
}
export function getAdminRolesIds(guild) {
  // console.log(DB.r.db(guild.id))
  console.log("Getting admin roles")
  if (conf.adminRoleIds) return conf.adminRolesIds
}
export function checkMemberForRolesIds(member, rolesIds) {
  return member.roles.some(r => rolesIds.includes(r.id)) ? true : false
}
