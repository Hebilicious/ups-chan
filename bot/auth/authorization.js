import * as DB from "../database/database.js"

//Mom&Dad,WeebOverlords,Lider,Test

// export const authorizedRolesIds = [
//   "312317944417878016",
//   "341182224139419650",
//   "316283334768459777",
//   "248702697610412032"
// ]

export function checkMemberForRolesIds(member, rolesIds) {
  return member.roles.some(r => rolesIds.includes(r.id)) ? true : false
}

export async function isPrivileged(member) {
  const conf = await DB.Connect(message.guild)
    .table("configuration")
    .get(0)
    .run()
  return (
    member.permissions.has("ADMINISTRATOR") ||
    checkMemberForRolesIds(member, conf.adminRolesIds)
  )
}
